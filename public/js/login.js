document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const response = await fetch("api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        });

        const data = await response.json();
        console.log("Login response:", data);

        if (response.ok) {
          window.location.href = data.redirect;
        } else {
          document.getElementById("error-message").textContent = data.message;
        }
      } catch (error) {
        document.getElementById("error-message").textContent =
          "Login failed. Try again.";
      }
    });
  }
  const params = new URLSearchParams(window.location.search);
  const verified = params.get("verified");
  const msg = params.get("msg");
  const msgContainer = document.getElementById("verify-message");

  if (verified || msg) {
    let message = "";
    let alertClass = "info";

    if (verified === "1") {
      message = "Your email has been verified. Please log in.";
      alertClass = "success";
    } else if (verified === "0") {
      message = "Verification link is invalid or expired.";
      alertClass = "error";
    } else if (verified === "already") {
      message = "Your email is already verified.";
      alertClass = "info";
    } else if (msg === "verify") {
      message =
        "Please check your email to verify your account before logging in.";
      alertClass = "info";
    }

    msgContainer.innerHTML = `<div class="alert ${alertClass}">${message}</div>`;
  }
});
