// add existing data to array
const post1 = {
  title: 'Genesis',
  date: '10/31/2008',
  summary:
    'It was a dark and cloudy day. The markets have fallen and banks could no longer be trusted',
};

const post2 = {
  title: 'The Chosen One',
  date: '03/31/1999',
  summary:
    'No Neo, Im trying to tell you that when you are ready, you wont have to',
};

const post3 = {
  title: 'Plebs',
  date: '01/01/0001',
  summary: 'ran out of stuff to put so this is just some random post',
};

// store all of the posts in an array
let allPosts = [post1, post2, post3];

// set new data in format to present to user
function postData(givenData) {
  let data = '';
  for (let i = 0; i < givenData.length; i++) {
    data += `<tr class='postRow'>
      <td class='postTitle'> ${givenData[i]['title']}</td>
      <td class='postDate'> ${givenData[i]['date']}</td>
      <td class='postSummary'> ${givenData[i]['summary']}</td>
      <td class='postOptions'>
      <button onclick='editPost(${i})' class='editButton'>edit</button>
      <button onclick='deletePostAns(${i})' class='deleteButton'>delete</button>
      </td>
      </tr>`;
  }
  return data;
}

// save the item to delete to global variable so that we can delete one at a time
var deleteThis = 0;
function deletePostAns(item) {
  window.deleteDialog.show();
  deleteThis = item;

  let cancelDelete = document.getElementById('cancelDelete');
  cancelDelete.addEventListener('click', (rem) => {
    window.deleteDialog.close();
  });
}

// edit a post
function editPost(item) {
  // get the object we want from our array
  let editObject = allPosts[item];

  // get all of the properties from array to edit
  let posts = document.getElementById('Posts');
  let editTitle = document.getElementById('editTitle');
  let editDate = document.getElementById('editDate');
  let editSummary = document.getElementById('editSummary');
  let editSubmitPost = document.getElementById('editSubmitPost');
  let editForm = document.getElementById('editForm');
  editForm.style.display = 'block';

  editSubmitPost.addEventListener('click', (even) => {
    // forms refresh the page, need this to prevent that
    even.preventDefault();

    // edit the post with new data
    editObject['title'] = editTitle.value;
    editObject['date'] = editDate.value;
    editObject['summary'] = editSummary.value;

    // enter edited data to array
    allPosts[item] = editObject;

    // present new data to user
    let ans = postData(allPosts);
    posts.innerHTML = ans;
    editForm.style.display = 'none';
  });
}

// delete a post
function deletePost() {
  // needed elements from DOM
  let posts = document.getElementById('Posts');
  allPosts.splice(deleteThis, 1);
  let ans = postData(allPosts);
  posts.innerHTML = ans;
  window.deleteDialog.close();
}

document.addEventListener('DOMContentLoaded', (event) => {
  // all of the needed elements from the DOM
  let addButton = document.getElementById('addButton');
  let submitNewPost = document.getElementById('submitNewPost');
  let posts = document.getElementById('Posts');
  let cancelNew = document.getElementById('cancelNew');
  let editForm = document.getElementById('editForm');
  editForm.style.display = 'none';

  // add initial data
  let ans = postData(allPosts);
  posts.innerHTML = ans;

  // once add new button is clicked
  addButton.addEventListener('click', (e) => {
    window.addNewPost.show();

    // if the user does not want to add a new post
    cancelNew.addEventListener('click', (en) => {
      en.preventDefault();
      window.addNewPost.close();
    });
  });

  // if the user submits a new post
  submitNewPost.addEventListener('click', (ev) => {
    ev.preventDefault();
    // get the needed information for new post
    let newtitle = document.getElementById('title').value;
    let newdate = document.getElementById('date').value;
    let newsummary = document.getElementById('summary').value;
    // create new post object and add to our array
    let newPostEntry = {
      title: `${newtitle}`,
      date: `${newdate}`,
      summary: `${newsummary}`,
    };
    allPosts.push(newPostEntry);

    // call postData function to add new data to form
    ans = postData(allPosts);
    posts.innerHTML = ans;

    // close dialog window
    window.addNewPost.close();
  });
});
