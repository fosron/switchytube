var detectType = function detectType(url){
  var url = (!url) ? (document.location.pathname + document.location.search).toLowerCase() : url;
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

  return page;
};

export default detectType;