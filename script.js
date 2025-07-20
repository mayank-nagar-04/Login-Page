let registeredNumbers = ["9876543210", "9999999999"];
let currentLoginCaptcha = "";
let currentRegCaptcha = "";

function toggleForms() {
  document.getElementById("loginForm").classList.toggle("hidden");
  document.getElementById("registerForm").classList.toggle("hidden");
  document.getElementById("message").innerText = "";
  document.getElementById("registerMessage").innerText = "";
  generateCaptcha('login');
  generateCaptcha('reg');
}

function generateCaptcha(type) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let captcha = "";
  for (let i = 0; i < 5; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  if (type === 'login') {
    currentLoginCaptcha = captcha;
    document.getElementById("loginCaptchaText").innerText = captcha;
  } else {
    currentRegCaptcha = captcha;
    document.getElementById("regCaptchaText").innerText = captcha;
  }
}

function login() {
  const name = document.getElementById("loginName").value;
  const mobile = document.getElementById("loginMobile").value;
  const captchaInput = document.getElementById("loginCaptchaInput").value.trim().toUpperCase();
  const message = document.getElementById("message");

  if (!name || !mobile || !captchaInput) {
    message.style.color = "red";
    message.innerText = "Please fill in all fields including CAPTCHA.";
    return;
  }

  if (!/^\d{10}$/.test(mobile)) {
    message.style.color = "red";
    message.innerText = "Enter a valid 10-digit mobile number.";
    return;
  }

  if (captchaInput !== currentLoginCaptcha) {
    message.style.color = "red";
    message.innerText = "Incorrect CAPTCHA. Try again.";
    generateCaptcha('login');
    return;
  }

  if (registeredNumbers.includes(mobile)) {
    message.style.color = "green";
    message.innerText = "✅ Number already registered. Sending OTP...";
    setTimeout(() => {
      alert("OTP sent to " + mobile + ": 123456 (demo)");
    }, 1000);
  } else {
    message.style.color = "orange";
    message.innerText = "❌ Number not found. Please register.";
  }
}

function register() {
  const name = document.getElementById("regName").value;
  const mobile = document.getElementById("regMobile").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  const captchaInput = document.getElementById("regCaptchaInput").value.trim().toUpperCase();
  const registerMessage = document.getElementById("registerMessage");

  if (!name || !mobile || !email || !password || !captchaInput) {
    registerMessage.style.color = "red";
    registerMessage.innerText = "Please fill in all fields including CAPTCHA.";
    return;
  }

  if (!/^\d{10}$/.test(mobile)) {
    registerMessage.style.color = "red";
    registerMessage.innerText = "Enter a valid 10-digit mobile number.";
    return;
  }

  if (captchaInput !== currentRegCaptcha) {
    registerMessage.style.color = "red";
    registerMessage.innerText = "Incorrect CAPTCHA. Try again.";
    generateCaptcha('reg');
    return;
  }

  if (registeredNumbers.includes(mobile)) {
    registerMessage.style.color = "red";
    registerMessage.innerText = "Mobile number already registered.";
    return;
  }

  registeredNumbers.push(mobile); // Dummy save
  registerMessage.style.color = "green";
  registerMessage.innerText = "🎉 Registered successfully! You can now log in.";

  setTimeout(() => {
    toggleForms();
  }, 1500);
}

// Init CAPTCHAs on load
generateCaptcha('login');
generateCaptcha('reg');
