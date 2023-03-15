document.addEventListener('DOMContentLoaded', (event) => {
  let alertButton = document.getElementById('alert');
  let confirmButton = document.getElementById('confirm');
  let promptButton = document.getElementById('prompt');

  // buttons inside of the dialogs
  let alertDialogButton = document.getElementById('alertDialogButton');
  let confirmCancel = document.getElementById('confirmCancel');
  let confirmOk = document.getElementById('confirmOk');
  let promptOk = document.getElementById('promptOk');
  let promptCancel = document.getElementById('promptCancel');

  alertButton.addEventListener('click', (e) => {
    window.alertDialog.show();
  });

  alertDialogButton.addEventListener('click', (e) => {
    window.alertDialog.close();
  });

  confirmButton.addEventListener('click', (e) => {
    window.confirmDialog.show();
  });

  confirmOk.addEventListener('click', (e) => {
    window.confirmDialog.close();
    let temp = document.getElementById('confirmed');
    let clon = temp.content.cloneNode(true);
    document.body.appendChild(clon);
  });

  confirmCancel.addEventListener('click', (e) => {
    window.confirmDialog.close();
  });

  promptButton.addEventListener('click', (e) => {
    window.promptDialog.show();

    promptOk.addEventListener('click', (e) => {
      let cleanName = DOMPurify.sanitize(document.getElementById('name').value);
      window.promptDialog.close();

      let promptText = document.createElement('h2');
      promptText.innerHTML = `prompt name: ${cleanName}`;
      document.body.appendChild(promptText);
    });
    promptCancel.addEventListener('click', (e) => {
      window.promptDialog.close();
    });
  });
});
