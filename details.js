// Define the fetchApi function
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

let postsContainer; // Declare postsContainer variable

fetchApi(myApiKey)
  .then((response) => {
    console.log("Fetched data:", response);
    postsContainer = document.getElementById('posts'); // Assign value to postsContainer

    // Check if response contains data
    if (response && response.data && Array.isArray(response.data) && response.data.length > 0) {
      // Iterate through each post object
      response.data.forEach(post => {
        // Create HTML elements for each post
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
          <div class="blog-card">
            <img src="${post.media.url}" alt="${post.media.alt}" class="post-image-detail">
            <p class="tags">${post.tags}</p>
            <h2>${post.title}</h2>
            <p>${post.body}</p>
            <p>${post.id}</p>
            <p>Author: ${post.author.name}</p>
            <p>Updated: ${post.updated}</p>
            <p>Created: ${new Date(post.created).toLocaleString()}</p>
          </div>
        `;
        
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


  document.addEventListener('DOMContentLoaded', () => {
    // Retrieve token from local storage
    const token = localStorage.getItem('accessToken');
    
    // Get the button elements
    const editPostBtn = document.getElementById('edit-post-btn');
    const deletePostBtn = document.getElementById('delete-post-btn');
    
    // Function to show or hide buttons based on token
    function updateButtonsVisibility() {
        if (token) {
            // Token exists, show buttons
            editPostBtn.style.display = 'block';
            deletePostBtn.style.display = 'block';
        } else {
            // Token does not exist, hide buttons
            editPostBtn.style.display = 'none';
            deletePostBtn.style.display = 'none';
        }
    }
    
    // Initial update of buttons visibility
    updateButtonsVisibility();
});

//delete an post---------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const deletePostBtn = document.getElementById('delete-post-btn');
    deletePostBtn.addEventListener('click', async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error('No access token found in local storage');
            }

            // Extract post ID from URL query parameters
            const urlParams = new URLSearchParams(window.location.search);
            const postId = urlParams.get('id');

            // Call deletePost function with the retrieved post ID
            await deletePost(token, postId);
            
            // Optional: Redirect or update UI to reflect that the post has been deleted
        } catch (error) {
            console.error('Error deleting post:', error);
            // Optional: Handle errors
        }
    });
});

async function deletePost(token, postId) {
    try {
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/ole123/${postId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to delete post. Status: ${response.status}`);
        }

        console.log('Post deleted successfully');
        // Optionally, redirect or update UI to reflect that the post has been deleted
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
}

//edit post---------------------------------------------------------------------------

// Get a reference to the button and the element to show/hide
const editButton = document.getElementById('edit-post-btn');
const editForm = document.getElementById('edit-show');

// Function to toggle the visibility of the element
function toggleElementVisibility(element) {
    if (element.style.display === 'none' || element.style.display === '') {
        element.style.display = 'block'; // Show the element
    } else {
        element.style.display = 'none'; // Hide the element
    }
}

// Event listener for the edit button
editButton.addEventListener('click', () => {
    toggleElementVisibility(editForm); // Toggle the visibility of the edit form
});

document.addEventListener('DOMContentLoaded', () => {
    const saveEditBtn = document.getElementById('save-edit-btn');

    // Event listener for clicking the "Save" button
    saveEditBtn.addEventListener('click', async () => {
        try {
            // Retrieve the token from local storage
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error('Access token not found in local storage');
            }

            // Get the updated post data from the form inputs
            const title = document.getElementById("title").value;
            const body = document.getElementById("body").value;
            const tags = document
              .getElementById("tags")
              .value.split(",")
              .map((tag) => tag.trim());
            const mediaUrl = document.getElementById("media-url").value;
            const mediaAlt = document.getElementById("media-alt").value;
      
            const postData = {
              title,
              body,
              tags,
              media: {
                url: mediaUrl,
                alt: mediaAlt,
              },
            };
            // Get the post ID from the URL
            const postId = getPostIdFromURL();

            // Call the function to send the updated post data
            await updatePost(token, postId);

            // Optionally, update the UI or take other actions after the post is saved
        } catch (error) {
            console.error('Error saving edited post:', error);
            // Handle the error if needed
        }
    });

    // Function to extract the post ID from the URL
    function getPostIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    // Function to update the post on the server
    async function updatePost(token, postId, ) {
        try {
            const response = await fetch(`https://v2.api.noroff.dev/blog/posts/ole123/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to save edited post: ${response.statusText}`);
            }

            console.log('Post edited successfully');
            // Optionally, handle the response or update the UI
        } catch (error) {
            console.error('Error saving edited post:', error);
            // Optionally, handle the error
        }
    }
});
