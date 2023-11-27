import { TimelineData } from "type/types"
import { querySelector } from "./query"

export default class Filter {
  private timelineData: TimelineData

  constructor(timelineData: TimelineData) {
    this.timelineData = timelineData
  }

  public main() {
    this.filterTinelineNode()
  }

  private filterTinelineNode() {
    if (this.timelineData.timelineType !== "tweet") {
      return
    }

    const timelineHeader = this.timelineData.timelineNode.children
      .item(0)
      ?.querySelector(
        "div[data-viewportview='true'] > div[data-testid='multi-column-layout-column-content'] > div[data-testid='gryphonColumnSidebarLayout'] > section"
      )
    if (timelineHeader) {
      return
    }
    if (!this.timelineData.setFilterIncludeMedia) {
      return
    }

    this.timelineData.timelineNode
      .querySelectorAll<HTMLElement>(querySelector.quaryArticleCell)
      .forEach((tweetArticle) => {
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
}
