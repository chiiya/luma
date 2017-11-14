import Alert from './Alert';
import Textarea from './Textarea';
import Select from './Select';

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

Array.prototype.forEach.call(document.querySelectorAll('[data-dismiss="alert"]'), (element) => { new Alert(element); });
Array.prototype.forEach.call(document.querySelectorAll('[data-resize="textarea"]'), (element) => { Textarea.addInputListener(element); });
Array.prototype.forEach.call(document.querySelectorAll('[data-style="select"]'), (element) => { Select.style(element); });

module.exports = luma;
