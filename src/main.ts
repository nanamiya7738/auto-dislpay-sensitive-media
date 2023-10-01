if (process.env.NODE_ENV == "development") console.log("ADSM: main strat......")

interface TimelineData {
  timelineNode: HTMLElement
  timelineTitle1: string
  timelineTitle2: string
  timelineType: "tweet" | "notification" | "other"
  setAutoDisplaySensitiveMedia: boolean
  setFilterIncludeMedia: boolean
}
interface TimerData {
  timer: NodeJS.Timeout
  status: "loading" | "complaeted"
}

const quaryDeckButton =
  "div.css-1dbjc4n.r-1habvwh.r-13awgt0.r-19mitxf.r-11yh6sk.r-1rnoaur.r-13qz1uu > div[role='button']"
const quaryTimeline =
  "section[class='css-1dbjc4n r-18u37iz r-2llsf r-1ny4l3l'][role='region']"

const quaryProgressbar = "div[role='progressbar']"
const quarySensitiveMedia =
  "article[data-testid='tweet'] div[role='presentation'] div[role='button'] > div[dir='ltr']"
const quarySensitiveContent =
  "article[data-testid='tweet'] div.css-1dbjc4n.r-1867qdf.r-16y2uox.r-l3hqri.r-1udh08x"
const quaryRowOptionButton = `div[data-testid='root'] > div.css-1dbjc4n.r-obd0qt.r-1777fci > div.css-1dbjc4n.r-18u37iz > div[role='button']`
const quaryRowOptionMenu = "div[data-testid='drawerAnimatedDiv']"
const quaryRowOptionCustomMenuItems =
  "div[data-testid='drawerAnimatedDiv'] div[id='customMenuItems']"

const quaryArticleCell = "div[data-testid='cellInnerDiv']"

const timerData: TimerData[] = []
const timelineDataList: TimelineData[] = []
let timerDisplaySensitiveMedia: NodeJS.Timeout

window.addEventListener("load", () => {
  startProcessAfterCreateElement(
    () => document.querySelectorAll<HTMLElement>(quaryDeckButton),
    () => {
      const buttons = document.querySelectorAll<HTMLElement>(quaryDeckButton)
      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          if (process.env.NODE_ENV == "development")
            console.log("ADSM: main process stop and reload timeline")
          clearInterval(timerDisplaySensitiveMedia)
          startProcessAfterCreateElement(
            () => document.querySelectorAll<HTMLElement>(quaryTimeline),
            () => setTimelineData()
          )
        })
      })
    }
  )
  startProcessAfterCreateElement(
    () => document.querySelectorAll<HTMLElement>(quaryTimeline),
    () => setTimelineData()
  )
})

function startProcessAfterCreateElement(
  querySelectorAll: () => NodeListOf<HTMLElement>,
  callback: () => void,
  timeSpan: number = 1000
) {
  const timer = setInterval(() => {
    let element: null | NodeListOf<HTMLElement> = querySelectorAll()
    if (process.env.NODE_ENV == "development")
      console.log(`ADSM: checking roop until create element ....`)
    if (element.length > 0) {
      if (process.env.NODE_ENV == "development")
        console.log(`ADSM: checking complete.`)
      if (process.env.NODE_ENV == "development") console.log(element)
      clearInterval(timer)
      callback()
    }
  }, timeSpan)
}

function startProcessAfterRemoveElement(
  querySelectorAll: () => NodeListOf<HTMLElement>,
  callback: () => void,
  timeSpan: number = 1000
) {
  const timer = setInterval(() => {
    let element: null | NodeListOf<HTMLElement> = querySelectorAll()
    if (process.env.NODE_ENV == "development")
      console.log(`ADSM: checking roop until remove element ....`)
    if (element.length === 0) {
      if (process.env.NODE_ENV == "development")
        console.log(`ADSM: checking complete.`)
      if (process.env.NODE_ENV == "development") console.log(element)
      clearInterval(timer)
      callback()
    }
  }, timeSpan)
}

function setTimelineData() {
  startProcessAfterRemoveElement(
    () => document.querySelectorAll<HTMLElement>(quaryProgressbar),
    () => {
      document
        .querySelectorAll<HTMLElement>(quaryTimeline)
        ?.forEach((timeline, i) => {
          const timelineDetail = timeline.children.item(0)

          const timelineHeaderTitle1 = timelineDetail?.children
            .item(0)
            ?.querySelector("div[data-testid='root'] h1 > span")
          const timelineHeaderTitle2 = timelineDetail?.children
            .item(0)
            ?.querySelector("div[data-testid='root'] h2 > span > span")
          const title1 = timelineHeaderTitle1?.textContent
          const title2 = timelineHeaderTitle2?.textContent

          const setAutoDisplaySensitiveMedia =
            window.localStorage.getItem(
              `ADSM_${title1}_${title2}_setAutoDisplaySensitiveMedia`
            ) ?? "true"

          if (process.env.NODE_ENV == "development")
            console.log(
              `ADSM_${title1}_${title2}_setAutoDisplaySensitiveMedia  ${setAutoDisplaySensitiveMedia}`
            )
          const setFilterIncludeMedia =
            window.localStorage.getItem(
              `ADSM_${title1}_${title2}_setFilterIncludeMedia`
            ) ?? "false"

          if (process.env.NODE_ENV == "development")
            console.log(
              `ADSM_${title1}_${title2}_setFilterIncludeMedia  ${setFilterIncludeMedia}`
            )
          if (title1 && title2) {
            const listNotificationArticle = timeline.querySelectorAll(
              `${quaryArticleCell}  article[role='article'][data-testid='notification']`
            )
            const listTweetArticle = timeline.querySelectorAll(
              `${quaryArticleCell} article[role='article'][data-testid='tweet']`
            )

            if (listNotificationArticle.length > 0) {
              timelineDataList.push({
                timelineTitle1: title1,
                timelineTitle2: title2,
                timelineNode: timeline,
                timelineType: "notification",
                setAutoDisplaySensitiveMedia:
                  setAutoDisplaySensitiveMedia === "true",
                setFilterIncludeMedia: setFilterIncludeMedia === "true"
              })
            } else if (listTweetArticle.length > 0) {
              timelineDataList.push({
                timelineTitle1: title1,
                timelineTitle2: title2,
                timelineNode: timeline,
                timelineType: "tweet",
                setAutoDisplaySensitiveMedia:
                  setAutoDisplaySensitiveMedia === "true",
                setFilterIncludeMedia: setFilterIncludeMedia === "true"
              })
            } else {
              timelineDataList.push({
                timelineTitle1: title1,
                timelineTitle2: title2,
                timelineNode: timeline,
                timelineType: "other",
                setAutoDisplaySensitiveMedia:
                  setAutoDisplaySensitiveMedia === "true",
                setFilterIncludeMedia: setFilterIncludeMedia === "true"
              })
            }
          }
        })

      if (process.env.NODE_ENV == "development")
        console.log("ADSM: Set timelines:")
      if (process.env.NODE_ENV == "development") console.log(timelineDataList)

      main()
    }
  )
}

function main() {
  if (process.env.NODE_ENV == "development")
    console.log("ADSM: main process strat......")

  timerDisplaySensitiveMedia = setInterval(() => {
    timelineDataList.forEach((timelineData) => {
      addFunctionToRowOptionButton(timelineData)
      filterTinelineNode(timelineData)
      displaySensitiveMedia(timelineData)
    }, 1000)
  })
}

function addFunctionToRowOptionButton(timelineData: TimelineData) {
  let listRowOptionMenu: null | NodeListOf<HTMLElement> =
    timelineData.timelineNode.querySelectorAll<HTMLElement>(quaryRowOptionMenu)

  if (listRowOptionMenu.length > 0) {
    if (timelineData.timelineType === "tweet") {
      let rowOptionCustomMenuItems = timelineData.timelineNode.querySelector(
        quaryRowOptionCustomMenuItems
      )

      if (!rowOptionCustomMenuItems) {
        if (process.env.NODE_ENV == "development")
          console.log("ADSM: Menu not exists.")
        addItemToRowOptionMenu(listRowOptionMenu, timelineData)
      }
    }
  }
}

function addItemToRowOptionMenu(
  listRowOptionMenu: null | NodeListOf<HTMLElement>,
  timelineData: TimelineData
) {
  listRowOptionMenu =
    timelineData.timelineNode.querySelectorAll<HTMLElement>(quaryRowOptionMenu)
  const rowOptionMenu = listRowOptionMenu
    .item(0)
    .children.item(0)
    ?.children.item(1)
    ?.children.item(0)

  const menuItemBox1 = createMenuItem(
    // "Enable automatically display of sensitive media",
    "センシティブ画像を常に表示する",
    timelineData.setAutoDisplaySensitiveMedia,
    () => {
      timelineData.setAutoDisplaySensitiveMedia =
        !timelineData.setAutoDisplaySensitiveMedia

      window.localStorage.setItem(
        `ADSM_${timelineData.timelineTitle1}_${timelineData.timelineTitle2}_setAutoDisplaySensitiveMedia`,
        String(timelineData.setAutoDisplaySensitiveMedia)
      )
    }
  )
  const menuItemBox2 = createMenuItem(
    // "Enable filter to show only tweets containing media",
    "メディアを含むツイートのみ表示する",
    timelineData.setFilterIncludeMedia,
    () => {
      timelineData.setFilterIncludeMedia = !timelineData.setFilterIncludeMedia
      window.localStorage.setItem(
        `ADSM_${timelineData.timelineTitle1}_${timelineData.timelineTitle2}_setFilterIncludeMedia`,
        String(timelineData.setFilterIncludeMedia)
      )
    }
  )

  rowOptionMenu?.appendChild(menuItemBox1)
  rowOptionMenu?.appendChild(menuItemBox2)
}

function createMenuItem(
  textMenu: string,
  checkedMenu: boolean,
  onchange: () => void
) {
  const menuItemText = document.createElement("span")
  menuItemText.textContent = textMenu

  const menuItemInput = document.createElement("input")
  menuItemInput.type = "checkbox"
  menuItemInput.role = "switch"
  menuItemInput.checked = checkedMenu
  menuItemInput.onchange = onchange

  const menuItem = document.createElement("div")
  menuItem.appendChild(menuItemText)
  menuItem.appendChild(menuItemInput)
  menuItem.classList.add("css-1dbjc4n", "r-18u37iz", "r-1wtj0ep", "r-779j7e")

  const menuItemBox = document.createElement("div")
  menuItemBox.appendChild(menuItem)
  menuItemBox.classList.add("r-z2wwpe", "r-jgcjvd", "r-146eth8")
  menuItem.id = "customMenuItems"

  return menuItemBox
}

function filterTinelineNode(timelineData: TimelineData) {
  if (timelineData.timelineType !== "tweet") {
    return
  }
  const timelineHeader = timelineData.timelineNode.children
    .item(0)
    ?.querySelector(
      "div[data-viewportview='true'] > div[data-testid='multi-column-layout-column-content'] > div[data-testid='gryphonColumnSidebarLayout'] > section"
    )
  if (timelineHeader) {
    return
  }
  if (!timelineData.setFilterIncludeMedia) {
    return
  }

  const listTweetCell =
    timelineData.timelineNode.querySelectorAll<HTMLElement>(quaryArticleCell)
  listTweetCell.forEach((tweetArticle) => {
    const tweetDetail = tweetArticle.querySelector<HTMLElement>(
      "article[data-testid='tweet'] div[class='css-1dbjc4n r-1iusvr4 r-16y2uox r-1777fci r-1mi0q7o']"
    )
    if (tweetDetail?.children && tweetDetail?.children.length <= 3) {
      tweetArticle.hidden = true
    } else {
      const tweetMedia = tweetDetail?.querySelector("div[aria-labelledby]")
      if (!tweetMedia) {
        tweetArticle.hidden = true
      }
    }
  })
}

function displaySensitiveMedia(timelineData: TimelineData) {
  if (timelineData.timelineType !== "tweet") {
    return
  }
  if (!timelineData.setAutoDisplaySensitiveMedia) {
    return
  }

  const buttonsSensitiveMedia =
    timelineData.timelineNode.querySelectorAll<HTMLElement>(
      `${quarySensitiveMedia}`
    )
  buttonsSensitiveMedia.forEach((val) => {
    val.click()
  })

  const buttonsSensitiveContent =
    timelineData.timelineNode.querySelectorAll<HTMLElement>(
      `${quarySensitiveContent}`
    )
  buttonsSensitiveContent.forEach((val) => {
    val.classList.remove("r-l3hqri")
    val.children.item(0)?.classList.remove("r-yfv4eo")
    val.children.item(1)?.remove()
  })
}
