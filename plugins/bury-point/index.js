import { EventEmitter } from 'events';
export default class Logness extends EventEmitter {
  constructor(url) {
    super();
    this.logUrl = url;
  }

  send(data) {
    this.emit('request', data);
    if (typeof data !== 'string') data = JSON.stringify(data);
    if (navigator.sendBeacon) return navigator.sendBeacon(this.logUrl, data);
    const client = new XMLHttpRequest();
    client.open("POST", this.logUrl, false);
    client.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    client.send(data);
  }
}