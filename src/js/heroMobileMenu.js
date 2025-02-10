(() => {
  const refs = {
    mobileMenu: document.querySelector(".mobile__container"),
    openMenuBtn: document.querySelector(".nav__button"),
    closeMenuBtn: document.querySelector(".mobile__button--close"),
    openModalBtns: document.querySelectorAll("[data-modal-open]"),
    closeModalBtns: document.querySelectorAll("[data-modal-close]"),
    modals: document.querySelectorAll("[data-modal]"),
  };
 
  const toggleMenu = () => {
    const isMenuOpen =
      refs.openMenuBtn.getAttribute("aria-expanded") === "true" || false;
    refs.openMenuBtn.setAttribute("aria-expanded", !isMenuOpen);
    refs.mobileMenu.classList.toggle("is-open");

    const scrollLockMethod = !isMenuOpen
      ? "disableBodyScroll"
      : "enableBodyScroll";
    bodyScrollLock[scrollLockMethod](document.body);
  };

 
  const toggleModal = (modal) => {
    modal.classList.toggle("modal--hidden");

    // Închide meniul mobil dacă este deschis
    if (refs.mobileMenu.classList.contains("is-open")) {
      refs.mobileMenu.classList.remove("is-open");
      refs.openMenuBtn.setAttribute("aria-expanded", false);
      bodyScrollLock.enableBodyScroll(document.body);
    }
  };

 
  refs.openMenuBtn.addEventListener("click", toggleMenu);
  refs.closeMenuBtn.addEventListener("click", toggleMenu);

  
  refs.openModalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modalId = btn.getAttribute("data-modal-open");
      const modal = document.querySelector(`[data-modal="${modalId}"]`);
      toggleModal(modal);
    });
  });

  refs.closeModalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modalId = btn.getAttribute("data-modal-close");
      const modal = document.querySelector(`[data-modal="${modalId}"]`);
      toggleModal(modal);
    });
  });

  
  window.matchMedia("(min-width: 768px)").addEventListener("change", (e) => {
    if (!e.matches) return;
    refs.mobileMenu.classList.remove("is-open");
    refs.openMenuBtn.setAttribute("aria-expanded", false);
    bodyScrollLock.enableBodyScroll(document.body);
  });
})();
