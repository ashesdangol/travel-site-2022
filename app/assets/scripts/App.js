import "../styles/styles.css"
import "lazysizes"
import MobileMenu from "./modules/MobileMenu"
import RevealOnScroll from "./modules/RevealOnScroll"
import StickyHeader from "./modules/StickyHeader"

if (module.hot) {
  module.hot.accept()
}

let mobileMenu = new MobileMenu()
new RevealOnScroll(document.querySelectorAll(".feature-item"), 80)
new RevealOnScroll(document.querySelectorAll(".testimonial"), 85)
let stickyHeader = new StickyHeader(document.querySelector(".site-header"), 60)
let modal
document.querySelectorAll(".open-modal").forEach(el => {
  el.addEventListener("click", e => {
    e.preventDefault()
    if (typeof modal == "undefined") {
      import(/* webpackChunkName:'modal' */ "./modules/Modal")
        .then(x => {
          modal = new x.default()
          setTimeout(() => modal.openTheModal(), 20)
        })
        .catch(() => console.log("there was a problem"))
    } else {
      modal.openTheModal()
    }
  })
})
