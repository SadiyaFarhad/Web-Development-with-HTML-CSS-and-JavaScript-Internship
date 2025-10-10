document.addEventListener("DOMContentLoaded", () => {
  const blogList = document.getElementById("blogList");
  const searchInput = document.getElementById("searchInput");
  const themeToggle = document.getElementById("themeToggle");

  function renderPosts(filter = "") {
    blogList.innerHTML = "";
    const filtered = posts.filter(p => 
      p.title.toLowerCase().includes(filter.toLowerCase()) ||
      p.category.toLowerCase().includes(filter.toLowerCase())
    );

    if (filtered.length === 0) {
      blogList.innerHTML = "<p>No posts found.</p>";
      return;
    }

    filtered.forEach(post => {
      const card = document.createElement("article");
      card.className = "blog-card";
      card.innerHTML = `
        <img src="${post.image}" alt="${post.title}" loading="lazy">
        <div class="card-content">
          <h2>${post.title}</h2>
          <p class="meta">${post.category} | ${new Date(post.date).toDateString()}</p>
          <p>${post.content.substring(0, 100)}...</p>
          <a href="post.html?id=${post.id}" class="read-more">Read More →</a>
        </div>
      `;
      blogList.appendChild(card);
    });
  }

  searchInput.addEventListener("input", e => renderPosts(e.target.value));
  renderPosts();

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
      themeToggle.textContent = "☀️";
    } else {
      localStorage.setItem("theme", "light");
      themeToggle.textContent = "🌙";
    }
  });
});
