import throttle from '../helpers/throttle.js';
import gsap from 'gsap';

export default class Menu {
  breakpoints = {
    tablet: 640,
    desktop: 1024
  };

  keyCodes = {
    space: 32,
    enter: 13,
    escape: 27
  };

  animationDuration = '0.3';

  constructor({menuElem, openBtnElem, closeBtnElem, menuItemElems}) {
    this.menu = menuElem;
    this.openBtn = openBtnElem;
    this.closeBtn = closeBtnElem;
    this.html = document.querySelector('html');
    this.menuItems = menuItemElems;
  }

  init = () => {
    this.openBtn.addEventListener('click', this.onOpenBtnClick);
    this.openBtn.addEventListener('keydown', this.onOpenBtnKeydown);
    this.closeBtn.addEventListener('click', this.onCloseBtnClick);
    window.addEventListener('resize', throttle(this.onResizeWindow, 100));
  };

  onOpenBtnClick = () => {
    if (window.innerWidth < this.breakpoints.tablet) {
      this.disableDocumentScroll();
    }

    window.addEventListener('keydown', this.onWindowKeydown);
    this.menuOpen();
  };

  onOpenBtnKeydown = (evt) => {
    evt.preventDefault();

    if (
      evt.keyCode === this.keyCodes.enter ||
      evt.keyCode === this.keyCodes.space
    ) {
      window.addEventListener('keydown', this.onWindowKeydown);

      this.menuOpen();
      this.closeBtn.focus();
    }
  };

  onCloseBtnClick = () => {
    if (window.innerWidth < this.breakpoints.tablet) {
      this.allowDocumentScroll();
    }

    window.removeEventListener('keydown', this.onWindowKeydown);

    this.menuClose();
    this.openBtn.focus();
  };

  onWindowKeydown = (evt) => {
    if (evt.keyCode === this.keyCodes.escape) {
      if (window.innerWidth < this.breakpoints.tablet) {
        this.allowDocumentScroll();
      }

      window.removeEventListener('keydown', this.onWindowKeydown);

      this.menuClose();
    }
  };

  onResizeWindow = () => {
    if (window.innerWidth >= this.breakpoints.tablet) {
      this.allowDocumentScroll();
    }

    if (window.innerWidth >= this.breakpoints.desktop) {
      this.setDesktopStyles();
    }
  };

  setDesktopStyles = () => {
    this.menu.style.transform = 'translate(0)';
    this.closeBtn.style.transform = 'rotate(0)';

    this.menuItems.forEach((item) => {
      item.style.transform = 'translate(0)';
    });
  };

  menuOpen = () => {
    this.crossAnimationOpen();
    this.menuItemAnimationOpen();

    gsap.fromTo(
      this.menu,
      {
        x: '-100%'
      },
      {
        x: 0,
        duration: this.animationDuration
      }
    );
  };

  menuClose = () => {
    this.crossAnimationClose();
    this.menuItemAnimationClose();

    gsap.fromTo(
      this.menu,
      {x: 0},
      {
        translateX: '-100%',
        duration: this.animationDuration
      }
    );
  };

  crossAnimationOpen = () => {
    gsap.fromTo(
      this.closeBtn,
      {
        rotate: -45
      },
      {
        rotate: 0,
        duration: this.animationDuration,
        delay: '0.15'
      }
    );
  };

  crossAnimationClose = () => {
    gsap.fromTo(
      this.closeBtn,
      {
        rotate: 0
      },
      {
        rotate: -45,
        duration: this.animationDuration
      }
    );
  };

  menuItemAnimationOpen = () => {
    gsap.fromTo(
      this.menuItems,
      {
        x: -300
      },
      {
        x: 0,
        duration: this.animationDuration,
        stagger: 0.05
      }
    );
  };

  menuItemAnimationClose = () => {
    gsap.fromTo(
      this.menuItems,
      {
        x: 0
      },
      {
        x: -300,
        duration: this.animationDuration,
        stagger: 0.05
      }
    );
  };

  disableDocumentScroll = () => {
    this.html.style.overflow = 'hidden';
  };

  allowDocumentScroll = () => {
    this.html.style.overflow = 'auto';
  };
}
