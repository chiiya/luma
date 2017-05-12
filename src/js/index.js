import styleSelect from './vendor/styleselect';

function resizeTextarea(el) {
  el.style.height = '';
  el.style.height = `${el.scrollHeight}px`;
}

function displayFileName(el) {
  el.nextElementSibling.innerHTML = `File: ${el.value.replace(/^.*?([^\\/]*)$/, '$1')}`;
}

function hasClass(target, className) {
  return new RegExp('(\\s|^)' + className + '(\\s|$)').test(target.className);
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

if (document.getElementsByClassName('lm-modal').length > 0) {

  // Open Modal
  [].forEach.call(document.querySelectorAll('.lm-modal-trigger'), (modal) => {
    modal.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector('.lm-modal').classList.add('is-visible');
    }, false);
  });

  // Close Modal
  [].forEach.call(document.querySelectorAll('.lm-modal'), (modal) => {
    modal.addEventListener('click', (e) => {
      if (hasClass(e.target, 'lm-modal-close') || hasClass(e.target, 'lm-modal')
        || hasClass(e.target, 'lm-close')) {
        e.preventDefault();
        modal.classList.remove('is-visible');
      }
    }, false);
  });

  // Close Modal by ESC with browser fallback
  document.onkeydown = (event) => {
    const e = event || window.event;
    let isEscape = false;
    if ('key' in e) {
      isEscape = (e.key === 'Escape' || e.key === 'Esc');
    } else {
      isEscape = (e.keyCode === 27);
    }
    if (isEscape) {
      document.querySelector('.lm-modal').classList.remove('is-visible');
    }
  };
}


