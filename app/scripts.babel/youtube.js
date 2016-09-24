(function () {
  var DEBUG = false;

  var inline = function (DEBUG, data) {
    DEBUG && console.log('inline loaded');

    function initWatch(){
      console.log('now this is fun!');

    }

    /* Page Functions */
    function page_domload(e) {
      DEBUG && console.log('page_domload');
      document.removeEventListener('DOMContentLoaded', page_domload, false);
      document.documentElement.classList.add('switchytube');

      page_changed(e);
    }

    function page_changed(e) {
      DEBUG && console.log('page_changed');

      var url = (document.location.pathname + document.location.search).toLowerCase();
      var page = null;

      if (url == '/') {
        page = 'index';
      } else if (url == '/feed/subscriptions') {
        page = 'feed';
      } else if (url.match(/(\&|\?)v=([a-zA-Z0-9\-_]+)/) !== null) {
        page = 'watch';
      } else if (url.match(/(\&|\?)list=([a-zA-Z0-9\-_]+)/)) {
        page = 'playlist';
      } else if (url.match(/^\/(channel|user|u|c)\/([a-z0-9\-\_]+)(\/featured)?$/) !== null) {
        page = 'channel';
      }

      console.log('page ' + page);

      switch(page){

      }
    }

    window.addEventListener('spfdone', page_changed, false);
    document.addEventListener('DOMContentLoaded', page_domload, false);

    /* Main Function */
    (function () {
      DEBUG && console.log(data);
    });
  };


  function inject_script(func, args) {
    var script = document.createElement('script');

    if (args instanceof Array) {
      args = JSON.stringify(args);
    } else {
      args = '[]';
    }

    script.innerHTML = '(function() { var f = ' + func + '; var args = ' + args + '; f.apply(this,args); })();';
    console.log(script);
    document.head.appendChild(script);
    document.head.removeChild(script);
  }

  function storage_load(data) {
    if (data.debug == 'true') {
      DEBUG = true;
    }

    //if(settings.other_icon == 'normal') {
    //  chrome.runtime.sendMessage({method: 'icon'});
    //}

    inject_script(inline, [DEBUG, data]);
  }

  chrome.storage.local.get(null, storage_load);
})();