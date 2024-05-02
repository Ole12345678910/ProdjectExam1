async function fetchApi(apiKey) {
    const options = {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    };
  
    try {
      const response = await fetch("https://v2.api.noroff.dev/blog/posts/ole123", options);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching API data:", error);
      throw error;
    }
  }
  const myApiKey = "5794466a-ac21-441f-8a55-385e2fda14c7"; // Define your API key

fetchApi(myApiKey)
  .then((response) => {
    console.log("Fetched data:", response);
    const postsContainer = document.getElementById('posts');

    // Check if response contains data
    if (response && response.data && Array.isArray(response.data) && response.data.length > 0) {
      // Iterate through each post object
      response.data.forEach(post => {
        const tags = post.tags;
        const id = post.id;
        const title = post.title;
        const body = post.body;
        const media = post.media.url;
        const authorName = post.author.name;
        const createdDate = new Date(post.created).toLocaleString();

        // Create HTML elements for each post
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
          <div class="blog-card">
            <img src="${media}" alt="${media.alt}" class="post-image">
            <p class="tags">${tags}</p>
            <h2>${title}</h2>
          </div>
        `;
        
        // Add click event listener to post element
        postElement.addEventListener('click', () => {
          // Call function to handle post click and pass post ID
          handlePostClick(id);
        });

        // Append the post element to the posts container
        postsContainer.appendChild(postElement);
      });
    } else {
      // Display a message if no data is received
      postsContainer.innerHTML = "<p>No posts found.</p>";
    }
  })
  .catch((error) => {
    console.error("Fetch operation failed:", error);
  });

// Function to handle click event on post
function handlePostClick(postId) {
  // Navigate to a new page with the post ID in the URL
  window.location.href = `/details.html?id=${postId}`;
}


