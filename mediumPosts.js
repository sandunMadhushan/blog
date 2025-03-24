async function displayMediumPosts() {
  const mediumRSS =
    "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@sandunmadhushan";

  try {
    const response = await fetch(mediumRSS);
    const data = await response.json();
    const postsContainer = document.getElementById("medium-posts");

    data.items.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.className = "medium-post";

      postElement.innerHTML = `
                <h3><a href="${post.link}" target="_blank">${
        post.title
      }</a></h3>
                <img src="${post.thumbnail}" alt="${post.title}" />
                <p>Published on ${new Date(
                  post.pubDate
                ).toLocaleDateString()}</p>
            `;

      postsContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error("Error displaying Medium posts:", error);
  }
}

document.addEventListener("DOMContentLoaded", displayMediumPosts);
