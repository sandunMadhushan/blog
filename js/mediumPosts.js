async function displayMediumPosts() {
  // Use a proxy server to bypass CORS restrictions
  const mediumRSS =
    "https://cors-anywhere.herokuapp.com/https://medium.com/feed/@sandunmadhushan";

  try {
    const response = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${mediumRSS}`
    );
    const data = await response.json();
    const postsContainer = document.getElementById("medium-posts");

    // Check if there are items in the response
    if (data.items && data.items.length > 0) {
      data.items.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.className = "medium-post";

        // Handle missing thumbnails
        const thumbnail = post.thumbnail || "images/default-thumbnail.png";

        postElement.innerHTML = `
                  <img src="${thumbnail}" alt="${post.title}" />
                  <h3><a href="${post.link}" target="_blank">${
          post.title
        }</a></h3>
                  <p>Published on ${new Date(
                    post.pubDate
                  ).toLocaleDateString()}</p>
                  <a href="${post.link}" target="_blank">Read More</a>
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
