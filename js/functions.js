function shuffleArray(array) {
  var currentIndex = array.length;
  var temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue        = array[currentIndex];
    array[currentIndex]   = array[randomIndex];
    array[randomIndex]    = temporaryValue;
  }

  return array;
}

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
