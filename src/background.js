let currentUrl = '';
let tabId;

chrome.webRequest.onCompleted.addListener(
  details => {
    const parsedUrl = new URL(details.url);
    if (currentUrl && currentUrl.indexOf(parsedUrl.pathname) > -1 && tabId) {
      chrome.tabs.sendMessage(tabId, { type: 'page-rendered' })
    }
  },
  { urls: ['https://github.com/*/pull/*'] }
);


chrome.webNavigation.onHistoryStateUpdated.addListener(
  details => {
    tabId = details.tabId;
    currentUrl = details.url;
  },
  { url: [ { hostSuffix: 'github.com' } ] }
);

console.log('🌱 Emoji guide online!')
