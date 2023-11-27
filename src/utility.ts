export function startProcessAfterCreateElement(
  querySelectorAll: () => NodeListOf<HTMLElement>,
  callback: () => void,
  timeSpan: number = 1000
) {
  const timer = setInterval(() => {
    consoleLog("checking roop until create element ....")
    let element: null | NodeListOf<HTMLElement> = querySelectorAll()

    if (element.length > 0) {
      consoleLog("checking complete. result:", element)

      clearInterval(timer)
      callback()
    }
  }, timeSpan)
}

export function startProcessAfterRemoveElement(
  querySelectorAll: () => NodeListOf<HTMLElement>,
  callback: () => void,
  timeSpan: number = 1000
) {
  const timer = setInterval(() => {
    consoleLog("checking roop until remove element ....")
    let element: null | NodeListOf<HTMLElement> = querySelectorAll()

    if (element.length === 0) {
      consoleLog("checking complete. result:", element)

      clearInterval(timer)
      callback()
    }
  }, timeSpan)
}

export function consoleLog(message: string, opt: any | null = null) {
  if (process.env.NODE_ENV == "development") console.log(`ADSM: ${message}`)
  if (process.env.NODE_ENV == "development" && opt) console.log(opt)
}
