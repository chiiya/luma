import styleSelect from './vendor/styleselect';

function resizeTextarea(el) {
  el.style.height = '';
  el.style.height = `${el.scrollHeight}px`;
}

function displayFileName(el) {
  el.nextElementSibling.innerHTML = `File: ${el.value.replace(/^.*?([^\\/]*)$/, '$1')}`;
}

window.onload = () => {
  if (document.getElementsByTagName('select').length > 0) {
    styleSelect('select');
  }

  // Resize Textareas
  document.body.addEventListener('input', (event) => {
    if (event.target.tagName === 'TEXTAREA') {
      resizeTextarea(event.target);
    }
  });

  // Display File Names for File Uploads
  document.body.addEventListener('change', (event) => {
    if (event.target.type === 'file') {
      displayFileName(event.target);
    }
  });
};
