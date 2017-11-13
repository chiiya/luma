export default class Alert {
  constructor(element) {
    this.element = element;
    this.alert = element.closest('.alert');
    this.attachClickHandler();
  }

  attachClickHandler() {
    const self = this;
    this.element.addEventListener('click', () => {
      self.close();
    });
  }

  close() {
    this.alert.classList.add('is-fading');
    setTimeout(() => { this.alert.remove(); }, 300);
  }
}
