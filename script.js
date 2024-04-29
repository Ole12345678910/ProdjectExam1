/*
async function fetchApi(){
    return fetchData("https://v2.api.noroff.dev/blog/posts/ole");
}
console.log(fetcchData);

const options = {
  headers: {
    Authorization: `Bearer ${
      eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
        .eyJuYW1lIjoib2xlMTIzIiwiZW1haWwiOiJvbGVidWwwMDk5N0BzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTcxMzQzMDQyNX0
        .ao8oajhwTxh52gN5oXqtq_N - q28o0DCQXCYEmXrjip0
    }`,
    MyAPIkey: apiKey.data.key,
  },
};





async function fetchApi() {
  const response = await fetch(`${"/blog/post/ole123/https://v2.api.noroff.dev"}`, options)
  const data = await response.json()
  const options = {
    headers: {
      Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoib2xlMTIzIiwiZW1haWwiOiJvbGVidWwwMDk5N0BzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTcxMzQzMDQyNX0.ao8oajhwTxh52gN5oXqtq_N-q28o0DCQXCYEmXrjip"}`,
      "5794466a-ac21-441f-8a55-385e2fda14c7": apiKey.data.key
    }
  }
}

console.log();

-----------------------------------------------------------------------------------------------------//
async function fetchApi(apiKey) {
  const options = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoib2xlMTIzIiwiZW1haWwiOiJvbGVidWwwMDk5N0BzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTcxMzQzMDQyNX0.ao8oajhwTxh52gN5oXqtq_N-q28o0DCQXCYEmXrjip`,
      "5794466a-ac21-441f-8a55-385e2fda14c7": apiKey
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
---------------------------------------------------------------------------------------------------//
/*
// Call fetchApi with apiKey parameter
const myApiKey = "5794466a-ac21-441f-8a55-385e2fda14c7"; // Define your API key
fetchApi(myApiKey)
  .then((response) => {
    console.log("Fetched data:", response);
    // Extract the data array from the response
    const data = response.data;
    // Check if data is not empty and contains at least one object
    if (Array.isArray(data) && data.length > 0) {
      // Get the first object
      const firstObject = data[0];
      // Extract relevant information
      const title = firstObject.title;
      const body = firstObject.body;
      const authorName = firstObject.author.name;
      const createdDate = new Date(firstObject.created).toLocaleString();
      // Display the information in the HTML document
      const displayContent = `
        <h2>${title}</h2>
        <p>${body}</p>
        <p>Author: ${authorName}</p>
        <p>Created: ${createdDate}</p>
      `;
      document.getElementById('content').innerHTML = displayContent;
    } else {
      console.error("No data received or data is empty:", data);
    }
  })
  .catch((error) => {
    console.error("Fetch operation failed:", error);
  });


const API_BASE_URL = 'https://v2.api.noroff.dev/';

const user = {
  name: 'ole123',
  email: 'olebul00997@stud.noroff.no',
  password: 'passord123',
};

const userLogin = {
  email: 'olebul00997@stud.noroff.no',
  password: 'passord123',
};

async function loginUser(url, data) {
  try {
    const postData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, postData);
    console.log(response);
    const json = await response.json();
    const accessToken = json.accessToken;
    localStorage.setItem('accessToken', accessToken);
    console.log(json);
    // Logs:
    // accessToken: "eyJhbGciOiJIuzI1NiIsInR...
    // avatar: ""
    // email: "test-account-a@noroff.no
    // name: "test_account_a"
    return json;
  } catch (error) {
    console.log(error);
  }
}

loginUser(`${API_BASE_URL}auth/login`, user);

--------------------------------------------------------------
*/

const API_BASE_URL = "https://v2.api.noroff.dev/";

const BlogName = localStorage.getItem("name");

// Function to show buttons based on certain conditions (e.g., after login)
function showButton() {
  // Check if user is logged in (example: check if access token exists in localStorage)
  const accessToken = localStorage.getItem("accessToken");
  const BlogName = localStorage.getItem("name");

  if (accessToken) {
    // User is logged in, show the buttons
    document.getElementById("show-button").style.display = "inline-block";
    document.getElementById("blogName").innerHTML = "Welcome " + BlogName;
  } else {
    // User is not logged in, buttons remain hidden (display: none;)
    // Optionally, you can choose to do something else here (e.g., redirect to login page)
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const showButton = document.getElementById("show-button");
  const createShow = document.getElementById("create-show");

  showButton.addEventListener("click", () => {
    // Toggle the visibility of the create-show element
    createShow.style.display =
      createShow.style.display === "none" ? "block" : "none";
  });
});

// Call the showButtons function when the page loads
showButton();

async function createPost(token, postData) {
  try {
    const response = await fetch(`${API_BASE_URL}blog/posts/ole123`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create post. Status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log("Post created successfully:", responseData);
    return responseData; // Return the created post data if needed
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

function getTokenFromLocalStorage() {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("No access token found in local storage");
  }
  return token;
}

document.addEventListener("DOMContentLoaded", () => {
  const createPostBtn = document.getElementById("create-post-btn");

  createPostBtn.addEventListener("click", async () => {
    try {
      const token = getTokenFromLocalStorage();
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

      await createPost(token, postData);
      alert("Post created successfully!");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    }
  });
});

/*
--------------------------------------------------------------


const isAdmin = true; // Example: Assuming user is an admin

document.addEventListener('DOMContentLoaded', () => {
  const adminOverlay = document.getElementById('adminOverlay');
  
  // Show admin overlay if user is an admin
  if (isAdmin) {
    adminOverlay.style.display = 'block';
  } else {
    adminOverlay.style.display = 'none';
  }
});

// Retrieve the user's name from localStorage
const myName = localStorage.getItem('name');
document.getElementById('hello').innerText = `Welcome, ${myName}!`;

--------------------------------------------------------------
*/

const clearStorage = document.getElementById("clearStorage");

clearStorage.addEventListener("click", () => {
  localStorage.clear();
});
