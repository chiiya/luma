import styleSelect from 'styleselect';

export default class Select {
  static style(select) {
    if (select.children.length > 0) {
      styleSelect(select);
    }
  }
}
