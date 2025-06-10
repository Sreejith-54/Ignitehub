
const firebaseConfig={

    apiKey: "AIzaSyDQzFi1Eex7Gsgkx-U5E4PEhe08iYLFbjo",
    authDomain: "ignitehub-faa47.firebaseapp.com",
    projectId: "ignitehub-faa47",
    storageBucket: "ignitehub-faa47.firebasestorage.app",
    messagingSenderId: "1043313605645",
    appId: "1:1043313605645:web:433a9ba27f3f53f2942944"
}

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

async function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById('password').value;

  try {
    let credential = await auth.signInWithEmailAndPassword(email, password);
    let user = credential.user;
    console.log(`email: ${user.email}`);
    window.location.href = "welcome.html";
  } catch (error) {
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
      console.log('Register success:', userCredential.user);
      window.location.href = "Index.html";
    } catch (error) {
      console.log(error.message);
    }
  } else {
    console.log("Passwords do not match");
  }
}




function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        console.log("Signed in as:", user.email);
      })
      .catch((error) => {
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
  let name = document.getElementById("username").value;
  let phone = document.getElementById("phone").value;
  console.log("User:", name, "Phone:", phone);
  closeModal();
}
  

  let confirmationResult;

  function sendOTP() {
    const phoneNumber = document.getElementById('phone').value;
    const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible'
    });

    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((result) => {
        confirmationResult = result;
        alert("OTP sent!");
      })
      .catch((error) => {
        console.error("SMS not sent", error);
      });
  }

  function verifyOTP() {
    const code = document.getElementById('otp').value;
    confirmationResult.confirm(code)
      .then((result) => {
        const user = result.user;
        console.log("Phone Sign-in successful", user.phoneNumber);
      })
      .catch((error) => {
        console.error("OTP verification failed", error);
      });
  }
