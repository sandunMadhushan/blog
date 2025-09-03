async function displayMediumPosts() {
  const mediumRSS =
    "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@sandunmadhushan";

  const postsContainer = document.querySelector(".posts-grid");
  
  // Show loading state
  postsContainer.innerHTML = '<div class="loading">Loading articles...</div>';

  try {
    const response = await fetch(mediumRSS);
    const data = await response.json();
    
    // Clear loading state
    postsContainer.innerHTML = '';

    if (data.items && data.items.length > 0) {
      data.items.forEach((post) => {
        // Extract thumbnail from content
        let thumbnail = post.thumbnail;

        // If no thumbnail, extract first image from content
        if (!thumbnail || thumbnail === "") {
          const imgRegex = /<img[^>]+src="([^">]+)"/;
          const match = post.content.match(imgRegex);
          thumbnail = match ? match[1] : "default-thumbnail.jpg";
        }

        // Create short description (remove HTML tags and limit length)
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = post.content;
        const description = tempDiv.textContent || tempDiv.innerText || "";
        const shortDescription = description.substring(0, 120) + "...";
        
        // Format date
        const publishDate = new Date(post.pubDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });

        const postElement = document.createElement("div");
        postElement.className = "medium-post";

        postElement.innerHTML = `
          <img src="${thumbnail}" alt="${post.title}" onerror="this.src='default-thumbnail.jpg';" />
          <div class="post-content">
            <h3><a href="${post.link}" target="_blank">${post.title}</a></h3>
            <p class="description">${shortDescription}</p>
            <div class="post-meta">
              <span>Published ${publishDate}</span>
            </div>
            <a href="${post.link}" target="_blank" class="read-more">Read Article →</a>
          </div>
        `;

        postsContainer.appendChild(postElement);
      });
    } else {
      postsContainer.innerHTML = '<div class="error">No articles available at the moment.</div>';
    }
  } catch (error) {
    console.error("Error displaying Medium posts:", error);
    postsContainer.innerHTML = '<div class="error">Failed to load articles. Please try again later.</div>';
  }
}

document.addEventListener("DOMContentLoaded", displayMediumPosts);
