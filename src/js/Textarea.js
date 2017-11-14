export default class Textarea {
  static addInputListener(element) {
    element.addEventListener('input', () => {
      Textarea.resizeTextarea(element);
    });
  }

  static resizeTextarea(element) {
    element.style.height = '';
    element.style.height = `${element.scrollHeight}px`;
  }
}
