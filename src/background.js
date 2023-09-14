'use strict';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (tab.url.indexOf('https://tweetdeck.twitter.com/') > -1) {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['./main.js'],
    });
  }
});
