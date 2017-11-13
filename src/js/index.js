import Alert from './Alert';

if (!NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}
if (!HTMLCollection.prototype.forEach) {
  HTMLCollection.prototype.forEach = Array.prototype.forEach;
}

Array.prototype.forEach.call(document.querySelectorAll('[data-dismiss="alert"]'), (element) => { new Alert(element); });
