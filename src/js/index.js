import Alert from './Alert';

const luma = Object.create(null);
luma.alert = (selector) => {
  if (typeof selector === 'object') {
    new Alert(selector);
  } else {
    Array.prototype.forEach.call(document.querySelectorAll(selector), (element) => { new Alert(element); });
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
