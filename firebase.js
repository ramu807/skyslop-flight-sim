// ============================================================
// SKYSLOP — Firebase + Google SSO Integration
// ============================================================
// SETUP INSTRUCTIONS:
//   1. Go to https://console.firebase.google.com
//   2. Create a new project (call it "skyslop" or any name)
//   3. In Project Settings → General → "Your apps" → Add Web App (</>)
//   4. Copy the firebaseConfig object below and replace the placeholder
//   5. In Firebase Console → Authentication → Get Started → Google → Enable
//   6. Add pinalytica.com to authorized domains (Authentication → Settings → Authorized domains)
//   7. In Firebase Console → Firestore Database → Create database (start in test mode)
//   8. Done! Deploy and test.
// ============================================================

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged }
  from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { getFirestore, doc, getDoc, setDoc, updateDoc, serverTimestamp }
  from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

// ── YOUR FIREBASE CONFIG ─────────────────────────────────────
// Replace all values below with your actual Firebase project config
const firebaseConfig = {
  apiKey:            "REPLACE_WITH_YOUR_API_KEY",
  authDomain:        "REPLACE_WITH_YOUR_AUTH_DOMAIN",
  projectId:         "REPLACE_WITH_YOUR_PROJECT_ID",
  storageBucket:     "REPLACE_WITH_YOUR_STORAGE_BUCKET",
  messagingSenderId: "REPLACE_WITH_YOUR_MESSAGING_SENDER_ID",
  appId:             "REPLACE_WITH_YOUR_APP_ID",
};
// ─────────────────────────────────────────────────────────────

const IS_CONFIGURED = !firebaseConfig.apiKey.startsWith('REPLACE');

let app, auth, db;

if (IS_CONFIGURED) {
  app  = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db   = getFirestore(app);
  console.log('[SKYSLOP] Firebase initialized');
} else {
  console.warn('[SKYSLOP] Firebase not configured — running in guest mode');
}

// ── Exposed auth state ────────────────────────────────────────
export let currentUser = null;  // Firebase User object or null
export let userProfile = null;  // Firestore document data

// ── Sign In with Google ───────────────────────────────────────
export async function signInWithGoogle() {
  if (!IS_CONFIGURED) {
    console.warn('[SKYSLOP] Firebase not configured');
    return null;
  }
  const provider = new GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (err) {
    console.error('[SKYSLOP] Google sign-in error:', err.code, err.message);
    return null;
  }
}

// ── Sign Out ──────────────────────────────────────────────────
export async function signOutUser() {
  if (!IS_CONFIGURED || !auth) return;
  await signOut(auth);
}

// ── Load user profile from Firestore ─────────────────────────
export async function loadUserProfile(uid) {
  if (!IS_CONFIGURED || !db) return null;
  try {
    const ref  = doc(db, 'users', uid);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      return snap.data();
    }
    return null;
  } catch (err) {
    console.error('[SKYSLOP] Error loading user profile:', err);
    return null;
  }
}

// ── Create new user profile ───────────────────────────────────
export async function createUserProfile(user) {
  if (!IS_CONFIGURED || !db) return;
  try {
    const ref = doc(db, 'users', user.uid);
    await setDoc(ref, {
      uid:       user.uid,
      email:     user.email,
      name:      user.displayName,
      photoURL:  user.photoURL,
      isPro:     false,
      xp:        0,
      coins:     250,
      flights:   0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }, { merge: true });
    console.log('[SKYSLOP] User profile created/merged for', user.email);
  } catch (err) {
    console.error('[SKYSLOP] Error creating user profile:', err);
  }
}

// ── Save PRO status after payment ────────────────────────────
export async function grantProAccess(uid, paymentId, plan) {
  if (!IS_CONFIGURED || !db) return;
  try {
    const ref = doc(db, 'users', uid);
    await updateDoc(ref, {
      isPro:      true,
      paymentId:  paymentId,
      plan:       plan,
      paidAt:     serverTimestamp(),
      updatedAt:  serverTimestamp(),
    });
    // Also record in a separate payments collection for audit
    const payRef = doc(db, 'payments', paymentId);
    await setDoc(payRef, {
      uid:       uid,
      paymentId: paymentId,
      plan:      plan,
      amount:    plan === 'unlock' ? 10 : 0,
      currency:  'INR',
      status:    'success',
      createdAt: serverTimestamp(),
    });
    console.log('[SKYSLOP] PRO granted to', uid, 'paymentId:', paymentId);
  } catch (err) {
    console.error('[SKYSLOP] Error granting PRO:', err);
  }
}

// ── Save player progress ──────────────────────────────────────
export async function saveProgress(uid, data) {
  if (!IS_CONFIGURED || !db || !uid) return;
  try {
    const ref = doc(db, 'users', uid);
    await updateDoc(ref, { ...data, updatedAt: serverTimestamp() });
  } catch (err) {
    console.error('[SKYSLOP] Error saving progress:', err);
  }
}

// ── Auth state listener — bridges Firebase to game.js ────────
export function initAuthListener(callbacks) {
  if (!IS_CONFIGURED || !auth) {
    // Not configured — auto-run guest mode
    callbacks.onGuest?.();
    return;
  }
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      currentUser = user;
      // Load or create profile
      let profile = await loadUserProfile(user.uid);
      if (!profile) {
        await createUserProfile(user);
        profile = await loadUserProfile(user.uid);
      }
      userProfile = profile;
      callbacks.onSignedIn?.(user, profile);
    } else {
      currentUser = null;
      userProfile = null;
      callbacks.onSignedOut?.();
    }
  });
}

export { IS_CONFIGURED };
