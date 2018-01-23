import Alert from './Alert';
import Textarea from './Textarea';
import Select from './Select';
import File from './File';

if (!NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}
if (!HTMLCollection.prototype.forEach) {
  HTMLCollection.prototype.forEach = Array.prototype.forEach;
}

const luma = Object.create(null);

luma.alert = (selector) => {
  if (typeof selector === 'object') {
    const close = selector.querySelector('.alert__close');
    if (close) new Alert(close);
  } else {
    Array.prototype.forEach.call(document.querySelectorAll(selector), (element) => {
      const close = element.querySelector('.alert__close');
      if (close) new Alert(close);
    });
  }
};

luma.textarea = (selector) => {
  if (typeof selector === 'object') {
    Textarea.addInputListener(selector);
  } else {
    Array.prototype.forEach.call(document.querySelectorAll(selector), (element) => {
      Textarea.addInputListener(element);
    });
  }
};

luma.select = (selector) => {
  if (typeof selector === 'object') {
    Select.style(selector);
  } else {
    Array.prototype.forEach.call(document.querySelectorAll(selector), (element) => {
      Select.style(element);
    });
  }
};

luma.file = (selector) => {
  if (typeof selector === 'object') {
    File.addChangeListener(selector);
  } else {
    Array.prototype.forEach.call(document.querySelectorAll(selector), (element) => {
      File.addChangeListener(element);
    });
  }
};

Array.prototype.forEach.call(document.querySelectorAll('[data-dismiss="alert"]'), (element) => { new Alert(element); });
Array.prototype.forEach.call(document.querySelectorAll('[data-resize="textarea"]'), (element) => { Textarea.addInputListener(element); });
Array.prototype.forEach.call(document.querySelectorAll('[data-style="select"]'), (element) => { Select.style(element); });
Array.prototype.forEach.call(document.querySelectorAll('[data-display="file"]'), (element) => { File.addChangeListener(element); });

/**
 * Mobile burger menu button and gesture for toggling sidebar
 */

const closeNav = (sidebar, toggleButton) => {
  toggleButton.classList.remove('is-active');
  sidebar.classList.remove('is-open');
};

const openNav = (sidebar, toggleButton) => {
  toggleButton.classList.add('is-active');
  sidebar.classList.add('is-open');
};

const initMobileMenu = () => {
  const mobileBar = document.querySelector('.nav.is-toggle');
  const toggleButton = mobileBar.querySelector('.hamburger');
  const sidebar = document.querySelector('.nav.is-responsive');

  if (mobileBar && toggleButton && sidebar) {
    toggleButton.addEventListener('click', () => {
      toggleButton.classList.toggle('is-active');
      sidebar.classList.toggle('is-open');
    });

    document.body.addEventListener('click', (e) => {
      if (!mobileBar.contains(e.target) && !sidebar.contains(e.target)) {
        closeNav(sidebar, toggleButton);
      }
    });

    // Toggle sidebar on swipe
    const start = {};
    const end = {};

    document.body.addEventListener('touchstart', function (e) {
      start.x = e.changedTouches[0].clientX;
      start.y = e.changedTouches[0].clientY;
    });

    document.body.addEventListener('touchend', function (e) {
      end.y = e.changedTouches[0].clientY;
      end.x = e.changedTouches[0].clientX;

      const xDiff = end.x - start.x;
      const yDiff = end.y - start.y;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0 && start.x <= 80) openNav(sidebar, toggleButton);
        else closeNav(sidebar, toggleButton);
      }
    });
  }
};

initMobileMenu();

module.exports = luma;
