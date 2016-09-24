'use strict';

(function () {
  var storage = {};

  function init(items) {
    console.log(items);

    function changed(e) {
      var target = e.target || e.srcElement;
      var key = target.name;
      var value = target.value;
      var item = {};
      storage[key] = value;
      item[key] = value;
      chrome.storage.local.set(item);

      console.log(item);
      //showSaved(target.previousElementSibling);
    }

    document.body.addEventListener('change', changed, false);
  };

  chrome.storage.local.get(null, init);
})();