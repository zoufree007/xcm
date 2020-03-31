export default class HeaderBar {
  constructor() {
    this.defaultValue = {
      title: 'Untitled',
      background: '#ffffff',
      color: '#333333',
      back: true,
      border: '#eeeeee',
      hide: false
    };
  }

  reset() {
    this.background = this.defaultValue.background;
    this.color = this.defaultValue.color;
    this.title = this.defaultValue.title;
    this.back = this.defaultValue.back;
    this.border = this.defaultValue.border;
    this.hide = this.defaultValue.hide;
    window.NX.removeAllListeners('WebViewHistoryGoBack');
    window.NX.removeAllListeners('WebViewClose');
    window.NX.removeAllListeners('WebViewExtraFields');
  }

  invoke() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.post(), 0);
  }

  post() {
    if (!this.defaultValue) throw new Error('You should init first.');
    return window.NX.invoke('SetWebViewHeader', {
      background: this.background,
      color: this.color,
      title: this.title,
      border: this.border,
      back: this.back ? 'YES' : 'NO',
      hide: this.hide ? 'YES' : 'NO'
    });
  }

  get background() {
    return this._background;
  }

  set background(value) {
    this._background = value;
    this.invoke();
  }

  get color() {
    return this._color;
  }

  set color(value) {
    this._color = value;
    this.invoke();
  }

  get title() {
    return this._title;
  }

  set title(value) {
    this._title = value;
    this.invoke();
  }

  get back() {
    return this._back;
  }

  set back(value) {
    this._back = value;
    this.invoke();
  }

  get hide() {
    return this._hide;
  }

  set hide(value) {
    this._hide = value;
    this.invoke();
  }

  get border() {
    return this._border;
  }

  set border(value) {
    this._border = value;
    this.invoke();
  }
}