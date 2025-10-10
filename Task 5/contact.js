// ✅ Initialize EmailJS
(function() {
  emailjs.init("ScuFg8BjwXcLHXA5H"); // <-- Your EmailJS public key
})();

// ✅ Wait until DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const msg = document.getElementById("formMessage");

  // Ensure the form exists
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim(),
    };

    // ✅ Send Email via EmailJS
    emailjs.send("service_8i469rh", "template_6wznunn", data)
      .then(() => {
        msg.textContent = "✅ Message sent successfully!";
        msg.style.color = "green";
        form.reset();
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        msg.textContent = "❌ Failed to send message. Check EmailJS setup.";
        msg.style.color = "red";
      });
  });
});
