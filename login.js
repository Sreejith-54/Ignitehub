const firebaseConfig={

    apiKey: "AIzaSyDQzFi1Eex7Gsgkx-U5E4PEhe08iYLFbjo",
    authDomain: "ignitehub-faa47.firebaseapp.com",
    projectId: "ignitehub-faa47",
    storageBucket: "ignitehub-faa47.appspot.com",
    messagingSenderId: "1043313605645",
    appId: "1:1043313605645:web:433a9ba27f3f53f2942944"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const auth = firebase.auth();

async function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById('password').value;

  try {
    let credential = await auth.signInWithEmailAndPassword(email, password);
    let user = credential.user;
    const doc = await db.collection("users").doc(user.uid).get();
    if (doc.exists) {
      const userData = doc.data();
      localStorage.setItem('uid', user.uid);
      localStorage.setItem('email', user.email);
      localStorage.setItem("username", userData.username || "");
    }
    console.log(`email: ${user.email}`);
    window.location.href = "welcome.html";
  } catch (error) {
    alert(error.message);
    console.log(error.message);
  }
}

async function register() {
  let email = document.getElementById("remail").value;
  let password = document.getElementById("rpassword").value;
  let confirm = document.getElementById('cpassword').value;

  if (password === confirm) {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      await db.collection("users").doc(user.uid).set({
        email: user.email,
        createdAt: new Date()
      });
      console.log('Register success:', userCredential.user);
      window.location.href = "index.html";
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  } else {
    alert("Passwords do not match");
    console.log("Passwords do not match");
  }
}

function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(async (result) => {
      const user = result.user;
      const userDoc = await db.collection("users").doc(user.uid).get();
      if (!userDoc.exists) {
        await db.collection("users").doc(user.uid).set({
          email: user.email,
          createdAt: new Date(),
          provider: "google"
        });
      }
      localStorage.setItem('uid', user.uid);
      localStorage.setItem('email', user.email);
      localStorage.setItem('username', user.displayName || "");
      console.log("Signed in as:", user.email);
      window.location.href = "welcome.html";
    })
    .catch((error) => {
      alert(error.message);
      console.error("Google Sign-In Error:", error);
    });
}

function openModal() {
  document.getElementById("popup").style.display = "block";
}

function closeModal() {
  document.getElementById("popup").style.display = "none";
}

function submitDetails() {
  let name = document.getElementById("usernameauth").value;
  let phone = document.getElementById("phone").value;
  console.log("User:", name, "Phone:", phone);
  closeModal();
}

let confirmationResult;

function sendOTP() {
  const phoneNumber = document.getElementById('phone').value;
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible'
    });
    window.recaptchaVerifier.render();
  }
  const appVerifier = window.recaptchaVerifier;

  firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    .then((result) => {
      confirmationResult = result;
      alert("OTP sent!");
    })
    .catch((error) => {
      alert(error.message);
      console.error("SMS not sent", error);
    });
}

function verifyOTP() {
  const code = document.getElementById('otp').value;
  if (!confirmationResult) {
    alert("Please request OTP first.");
    return;
  }
  confirmationResult.confirm(code)
    .then((result) => {
      const user = result.user;
      localStorage.setItem('uid', user.uid);
      localStorage.setItem('phone', user.phoneNumber);
      console.log("Phone Sign-in successful", user.phoneNumber);
      window.location.href = "welcome.html";
    })
    .catch((error) => {
      alert(error.message);
      console.error("OTP verification failed", error);
    });
}

async function logout() {
  try {
    await firebase.auth().signOut();
    console.log("User signed out");
    localStorage.clear();
    window.location.href = "index.html";
  } catch (error) {
    alert(error.message);
    console.error("Logout error:", error);
  }
}

function displayUserProfile() {
  auth.onAuthStateChanged(async function(user) {
    if (user) {
      try {
        const doc = await db.collection("users").doc(user.uid).get();
        if (doc.exists) {
          const data = doc.data();
          if (document.getElementById('usernamedata')) {
            document.getElementById('usernamedata').textContent = data.username || '';
          }
          if (document.getElementById('emaildata')) {
            document.getElementById('emaildata').textContent = data.email || user.email || '';
          }
        } else {
          if (document.getElementById('usernamedata')) {
            document.getElementById('usernamedata').textContent = '';
          }
          if (document.getElementById('emaildata')) {
            document.getElementById('emaildata').textContent = user.email || '';
          }
        }
      } catch (e) {
        if (document.getElementById('usernamedata')) {
          document.getElementById('usernamedata').textContent = '';
        }
        if (document.getElementById('emaildata')) {
          document.getElementById('emaildata').textContent = user.email || '';
        }
      }
    } else {
      if (document.getElementById('usernamedata')) {
        document.getElementById('usernamedata').textContent = '';
      }
      if (document.getElementById('emaildata')) {
        document.getElementById('emaildata').textContent = '';
      }
    }
  });
}
if (document.getElementById('usernamedata') && document.getElementById('emaildata')) {
  displayUserProfile();
}
