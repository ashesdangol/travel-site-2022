import { throttle } from "lodash"
class StickyHeader {
  constructor(el, scrolledPx) {
    this.siteHeader = el
    this.scrolledPx = scrolledPx
    this.events()
  }
  events() {
    window.addEventListener(
      "scroll",
      throttle(() => {
        this.runOnScroll(), 200
      })
    )
  }
  runOnScroll() {
    if (window.scrollY > this.scrolledPx) {
      this.siteHeader.classList.add("site-header--dark")
    } else {
      this.siteHeader.classList.remove("site-header--dark")
    }
  }
}
export default StickyHeader
