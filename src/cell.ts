import { TimelineData } from "type/types"
import { querySelector } from "./query"

export default class Cell {
  private timelineData: TimelineData

  constructor(timelineData: TimelineData) {
    this.timelineData = timelineData
  }

  public main() {
    this.autoDisplaySensitiveMedia()
  }

  private autoDisplaySensitiveMedia() {
    if (this.timelineData.timelineType !== "tweet") {
      return
    }
    if (!this.timelineData.setAutoDisplaySensitiveMedia) {
      return
    }

    this.timelineData.timelineNode
      .querySelectorAll<HTMLElement>(`${querySelector.quarySensitiveMedia}`)
      .forEach((val) => {
        val.click()
      })

    this.timelineData.timelineNode
      .querySelectorAll<HTMLElement>(`${querySelector.quarySensitiveContent}`)
      .forEach((val) => {
        val.classList.remove("r-l3hqri")
        val.children.item(0)?.classList.remove("r-yfv4eo")
        val.children.item(1)?.remove()
      })
  }
}
