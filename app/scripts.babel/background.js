'use strict';

(function() {
  var detectType = function detectType(url){
    var url = (!url) ? (document.location.pathname + document.location.search).toLowerCase() : url;
    console.log(url);

    if(url.indexOf('youtube.com') == -1)
      return false;

    var page = 'other';

    if (url.match(/(\&|\?)v=([a-zA-Z0-9\-_]+)/) !== null) {
      page = 'watch';
    } else if (url.match(/(\&|\?)list=([a-zA-Z0-9\-_]+)/)) {
      page = 'playlist';
    }

    return page;
  };

  function messageListener(request, sender, sendResponse) {
    console.log(request, sender);
    switch (request.method) {
      //case 'icon':
      //  if (sender.tab && sender.tab.id && sender.tab.index != -1) {
      //    chrome.pageAction.show(sender.tab.id);
      //  }
      //  break;
      //case 'verify':
      //  verify_message(sendResponse);
      //  return true;
      //  break;
      case 'alltabs':
      break;
    }
  }

  chrome.windows.getAll({populate:true},function(windows){
    windows.forEach(function(window){
      window.tabs.forEach(function(tab){
        //collect all of the urls here, I will just log them instead
        console.log(tab.url);
        console.log(detectType(tab.url));
      });
    });
  });

  function refreshTabInfo(){
    var tabStore = [];

    chrome.tabs.query({},function(tabs){
      console.log("\n/////////////////////\n");
      tabs.forEach(function(tab){
        tabStore.push(tab);
        detectType(tab.url);
      });
    });
  }
  refreshTabInfo();

  chrome.runtime.onMessage.addListener(messageListener);
})();