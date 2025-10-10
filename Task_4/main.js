// ✅ Initialize EmailJS (optional)
(function() {
  emailjs.init("ScuFg8BjwXcLHXA5H"); // Replace with your EmailJS public key
})();

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const msg = document.getElementById("formMessage");
  const contactList = document.getElementById("contactList");
  const deleteBtn = document.getElementById("deleteContacts");
  const downloadBtn = document.getElementById("downloadContacts");

  // Load contacts from localStorage
  function loadContacts() {
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contactList.innerHTML = "";

    if (contacts.length === 0) {
      contactList.innerHTML = "<li>No saved contacts yet.</li>";
      return;
    }

    contacts.forEach((c, i) => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${c.name}</strong> (${c.email}) - ${c.message}`;
      contactList.appendChild(li);
    });
  }

  loadContacts();

  // Save contact
  form.addEventListener("submit", e => {
    e.preventDefault();

    const contact = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim()
    };

    // Save to localStorage
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contacts.push(contact);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    loadContacts();

    // Send via EmailJS
    emailjs.send("service_8i469rh", "template_6wznunn", contact)
      .then(() => {
        msg.textContent = "✅ Message sent & saved!";
        msg.style.color = "green";
        form.reset();
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        msg.textContent = "⚠️ Message saved locally (EmailJS failed)";
        msg.style.color = "orange";
      });
  });

  // Delete all contacts
  deleteBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all saved contacts?")) {
      localStorage.removeItem("contacts");
      loadContacts();
      msg.textContent = "🗑 All contacts deleted.";
      msg.style.color = "red";
    }
  });

  // Download contacts as Excel file
  downloadBtn.addEventListener("click", () => {
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    if (contacts.length === 0) {
      alert("No contacts to download!");
      return;
    }

    const ws = XLSX.utils.json_to_sheet(contacts);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Contacts");
    XLSX.writeFile(wb, "contacts.xlsx");
  });
});
