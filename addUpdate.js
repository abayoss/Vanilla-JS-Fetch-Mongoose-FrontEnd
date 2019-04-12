const url = "http://localhost:3000/api/posts/";

function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}
const postId = getUrlParameter("id");
let mood = '';
const populateForm = () => {
  let onePost = {};
  fetch(url + postId)
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(response => {
      onePost = response.post;
      console.log(onePost);
      document.getElementById("title").value = onePost.title;
      document.getElementById("content").value = onePost.content;
      document.getElementById("imageUpdate").src = onePost.image;
      document.getElementById("creator").value = onePost.creator;
      document.getElementById("creator").disabled = true;
    });
};
if (postId) {
  populateForm();
    mood = 'edit';
} else {
    mood = 'add';
}
const updatePost = () => {
  console.log("update");
  
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const image = document.getElementById("image").files[0];

  if (!title || !content ) {
    return alert("please complete the form");
  }
  const post = new FormData();
  post.append("id", postId);
  post.append("title", title);
  post.append("content", content);
  post.append("image", image);

  fetch(url + postId, {
    method: "PUT",
    body: post
  })
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(response => {
      console.log(response.message);
    });

};

const addPost = () => {
  if (postId) {
    updatePost();
    return;
  }
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const image = document.getElementById("image").files[0];
  const creator = document.getElementById("creator").value;

  if (!title || !content || !creator) {
    return alert("please complete the form");
  }

  const post = new FormData();
  post.append("title", title);
  post.append("content", content);
  post.append("image", image);
  post.append("creator", creator);

  // const post = {
  //   title,
  //   content,
  //   image,
  //   creator
  // };
  console.log(post, image);
  fetch(url + "add", {
    method: "POST",
    body: post
  })
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(response => {
      console.log(response.message);
      window.location.href = "./index.html";
    });
};
