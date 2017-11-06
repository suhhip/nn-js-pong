function downloadStr(str, filename) {
  function createBlob(str) {
    return new Blob([str], { type: 'text/plain;charset=UTF-8;' });
  }

  var blob = createBlob(str);

  var a        = window.document.createElement('a');
  a.href       = window.URL.createObjectURL(blob);
  a.download   = filename;
  a.click();
}
