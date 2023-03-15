let postSubmit = false;
let deleteCounter = 0;

async function getURL(url, method, data) {
  const ans = await fetch(url, {
    method: `${method}`,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data;
    });
  return JSON.stringify(ans);
}

function setTable(obj) {
  let innerText = '<table border="1">';
  for (const [key, value] of Object.entries(obj)) {
    innerText += `
    <tr><td><b>${key}: </b> ${JSON.stringify(value)} </td></tr>
    `;
  }
  return innerText;
}

document.addEventListener('DOMContentLoaded', (listen) => {
  // add the current date to the date input field
  let today = document.getElementById('today');
  today.style.display = 'none';

  // grab all of the input fields
  let id = document.getElementById('id');
  let articleName = document.getElementById('articleName');
  let articleBody = document.getElementById('articleBody');

  // grab all of the buttons from document
  let postButton = document.getElementById('postButton');
  let getButton = document.getElementById('getButton');
  let putButton = document.getElementById('putButton');
  let deleteButton = document.getElementById('deleteButton');
  let displayText = document.getElementById('displayText');
  let displayHTTP = document.getElementById('response');

  // take care of post action
  postButton.addEventListener('click', async (event) => {
    event.preventDefault();
    displayText.innerHTML = '';
    postSubmit = true;
    deleteCounter++;
    let url = 'https://httpbin.org/post';
    let method = 'POST';
    let data = {
      id: id.value,
      article_name: articleName.value,
      article_body: articleBody.value,
    };

    let ans = await getURL(url, method, data);
    displayText.innerHTML = 'POST Request';

    // loop through json and place into a table
    let obj = JSON.parse(ans);
    let displayAns = setTable(obj);
    displayHTTP.innerHTML = displayAns;

    // show date when post is clicked
    let date = new Date();
    today.innerHTML =
      'post date: ' +
      date.getMonth() +
      '/' +
      date.getDate() +
      '/' +
      date.getFullYear();
    today.style.display = 'block';
  });

  getButton.addEventListener('click', async (event) => {
    event.preventDefault();
    if (postSubmit == false) {
      displayText.innerHTML = 'Post needs to be made first';
      return;
    } else {
      displayText.innerHTML = '';
    }
    let url = 'https://httpbin.org/get';

    // run fetch with GET method
    const ans = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        return JSON.stringify(data);
      });
    displayText.innerHTML = 'GET Request';
    let obj = JSON.parse(ans);
    let displayAns = setTable(obj);
    displayHTTP.innerHTML = displayAns;
  });

  putButton.addEventListener('click', async (event) => {
    event.preventDefault();
    if (postSubmit == false) {
      displayText.innerHTML = 'Post needs to be made first';
      return;
    } else {
      displayText.innerHTML = '';
    }
    let url = 'https://httpbin.org/put';
    let method = 'PUT';
    let data = {
      id: id.value,
      article_name: articleName.value,
      article_body: articleBody.value,
    };
    let ans = await getURL(url, method, data);
    let obj = JSON.parse(ans);
    let displayAns = setTable(obj);
    displayText.innerHTML = 'PUT Request';
    displayHTTP.innerHTML = displayAns;
  });

  deleteButton.addEventListener('click', async (event) => {
    event.preventDefault();
    if (postSubmit == false) {
      displayText.innerHTML = 'Post needs to be made first';
      return;
    } else {
      displayText.innerHTML = '';
    }
    if (deleteCounter <= 0) {
      displayText.innerHTML = 'No more posts to delete';
      displayHTTP.innerHTML = '';
      return;
    } else {
      deleteCounter--;
    }
    let url = 'https://httpbin.org/delete';
    let method = 'DELETE';
    let data = {
      id: id.value,
      article_name: articleName.value,
      article_body: articleBody.value,
    };
    let ans = await getURL(url, method, data);
    let obj = JSON.parse(ans);
    let displayAns = setTable(obj);
    displayText.innerHTML = 'DELETE Request';
    displayHTTP.innerHTML = displayAns;
  });
});
