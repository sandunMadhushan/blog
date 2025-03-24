const { parse } = require("rss-to-json");

async function fetchMediumPosts(username) {
  try {
    const rssUrl = `https://medium.com/feed/@${username}`;
    const rssData = await parse(rssUrl);
    const posts = rssData.items.map((post) => ({
      title: post.title,
      link: post.link,
      pubDate: post.published,
      thumbnail: post.enclosure?.url || "default-thumbnail.jpg", // Optional thumbnail
    }));
    console.log(posts);
    return posts;
  } catch (error) {
    console.error("Error fetching Medium posts:", error);
  }
}

fetchMediumPosts("sandunmadhushan");
