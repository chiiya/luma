import Alert from './Alert';

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

if (!NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}
if (!HTMLCollection.prototype.forEach) {
  HTMLCollection.prototype.forEach = Array.prototype.forEach;
}

Array.prototype.forEach.call(document.querySelectorAll('[data-dismiss="alert"]'), (element) => { new Alert(element); });

module.exports = luma;
