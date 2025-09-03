async function displayMediumPosts() {
  const mediumRSS =
    "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@sandunmadhushan";

  try {
    const response = await fetch(mediumRSS);
    const data = await response.json();
    const postsContainer = document.getElementById("medium-posts");

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
        const shortDescription = description.substring(0, 150) + "...";

        const postElement = document.createElement("div");
        postElement.className = "medium-post";

        postElement.innerHTML = `
                  <h3><a href="${post.link}" target="_blank">${
          post.title
        }</a></h3>
                  <img src="${thumbnail}" alt="${
          post.title
        }" onerror="this.src='default-thumbnail.jpg';" />
                  <p class="description">${shortDescription}</p>
                  <p>Published on ${new Date(
                    post.pubDate
                  ).toLocaleDateString()}</p>
                  <a href="${
                    post.link
                  }" target="_blank" class="read-more">Read More</a>
              `;

        postsContainer.appendChild(postElement);
      });
    } else {
      postsContainer.innerHTML = "<p>No posts available.</p>";
    }
  } catch (error) {
    console.error("Error displaying Medium posts:", error);
    document.getElementById("medium-posts").innerHTML =
      "<p>Failed to load posts.</p>";
  }
}

document.addEventListener("DOMContentLoaded", displayMediumPosts);
