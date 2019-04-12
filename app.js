document
  .querySelector(".json.btn.btn-primary.btn-block.mt-2")
  .addEventListener("click", getJsonFromApi);
const url = "http://localhost:3000/api/posts/";

getJsonFromApi();

function getJsonFromApi() {
  let data = null;
  fetch(url)
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(response => {
      data = response.posts[0].title;
      console.log(response.posts);

      let output = "";
      response.posts.forEach(element => {
        output += `<div class="col-4 mt-2" id="${element._id}">`;
        output += `<div class="card">`;
        output += `<img class="card-img-top" src="${element.image}" alt="${
          element.title
        }">`;
        output += `<div class="card-body">`;
        output += `<h4 class="card-title">${element.title}</h4>`;
        output += `<p class="card-text">${element.content}</p>`;
        output += `<p class="card-text">${element.creator}</p>`;
        // button delete :
        output += `<button onclick="deletePost('${
          element._id
        }')" class="btn btn-danger btn-sm">Delete</button>`;
        // button Edit :
        output += `<button onclick="location.href ='./addpost.html?id=${element._id}';"
        class="btn btn-warning btn-sm mx-2">Edit</button>`;
        // button View :
        output += `<button onclick="getOnePost('${
          element._id
        }')" class="btn btn-primary btn-sm">View</button>`;
        output += `</div>`;
        output += `</div>`;
        output += `</div>`;
      });
      document.getElementById("output").innerHTML += output;
    });
}

const getOnePost = postId => {
  fetch(url + postId)
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(response => {
      console.log(response.post);
    });
};

const deletePost = postId => {
  if (!confirm("you sur about deleting this post ?")) {
    return;
  }
  console.log(url + postId);
  fetch(url + postId, { method: "DELETE" })
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(response => {
      console.log(response.message);
      document.getElementById(`${postId}`).style.display = 'none';
    });
};
