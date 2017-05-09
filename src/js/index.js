import styleSelect from './vendor/styleselect';

function resizeTextarea(el) {
  el.style.height = '';
  el.style.height = `${el.scrollHeight}px`;
}

function displayFileName(el) {
  el.nextElementSibling.innerHTML = `File: ${el.value.replace(/^.*?([^\\/]*)$/, '$1')}`;
}

// Resize textareas on input
if (document.getElementsByTagName('textarea').length > 0) {
  document.body.addEventListener('input', (event) => {
    if (event.target.tagName === 'TEXTAREA') {
      resizeTextarea(event.target);
    }
  });
}

// Display File Names for File Uploads
if (document.getElementsByClassName('file').length > 0) {
  document.body.addEventListener('change', (event) => {
    if (event.target.type === 'file') {
      displayFileName(event.target);
    }
  });
}

// Style selects
if (document.getElementsByClassName('select').length > 0) {
  styleSelect('.select');
}
