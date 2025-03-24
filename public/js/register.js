document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = `${data.redirect}?msg=verify`;
      } else {
        document.getElementById("error-message").textContent = data.message;
      }
    } catch (error) {
      document.getElementById("error-message").textContent =
        "Registration failed. Try again.";
    }
  });
});
