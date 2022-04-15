import "../styles/styles.css"
import MobileMenu from "./modules/MobileMenu"
import RevealOnScroll from "./modules/RevealOnScroll"
import StickyHeader from "./modules/StickyHeader"
import Modal from "./modules/Modal"

if (module.hot) {
  module.hot.accept()
}

let mobileMenu = new MobileMenu()
new RevealOnScroll(document.querySelectorAll(".feature-item"), 80)
new RevealOnScroll(document.querySelectorAll(".testimonial"), 85)
let stickyHeader = new StickyHeader(document.querySelector(".site-header"), 60)
new Modal()
