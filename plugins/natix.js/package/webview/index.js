export function open(url, options = {}) {
  if (!options.header) options.header = {};
  return window.NX.invoke('OpenWebView', {
    url,
    direction: options.direction || 'right',
    background: options.background || '#ffffff',
    header: {
      background: options.header.background || '#ffffff',
      color: options.header.color || '#000000',
      title: options.header.title || 'Untitled Document',
      back: options.header.back ? 'YES' : 'NO',
      border: options.header.border || '#eeeeee',
      hide: options.header.hide ? 'YES' : 'NO'
    }
  });
}

export function close() {
  return window.NX.invoke('CloseWebView');
}

export function background(color) {
  return window.NX.invoke('SetWebViewBackground', {
    color: color
  });
}

export default {
  open, close, background
}