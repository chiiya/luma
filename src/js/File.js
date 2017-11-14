export default class File {
  static addChangeListener(element) {
    element.addEventListener('change', () => {
      File.displayFileName(element);
    });
  }

  static displayFileName(element) {
    if (element.files.length > 0) {
      const fileNameElement = element.parentNode.querySelector('.file__name');
      fileNameElement.innerHTML = element.files[0].name;
    }
  }
}
