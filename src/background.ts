if (process.env.NODE_ENV == "development")
  console.log("ADSM: background process start.....")

const targetUrl = "https://tweetdeck.twitter.com/"

chrome.tabs.onUpdated.addListener(
  (
    tabId: number,
    changeInfo: chrome.tabs.TabChangeInfo,
    tab: chrome.tabs.Tab
  ) => {
    if (
      changeInfo.status === "complete" &&
      tab.url &&
      tab.url.indexOf(targetUrl) > -1
    ) {
      if (process.env.NODE_ENV == "development")
        console.log(`ADSM: loading complete ${tab.url}`)
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["./main.js"]
      })
    }
  }
)
