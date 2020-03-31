export default class CustomFooter {
  constructor(store) {
    this.store = store;
  }

  set show(value) {
    this.setShow(value);
  }

  setShow(value = true) {
    this.store.Vix.commit('footer.show', value);
  }

  addField(...name) {
    this.store.Vix.push('footer.fields', ...name);
  }
}