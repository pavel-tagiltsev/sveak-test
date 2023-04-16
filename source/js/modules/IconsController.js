import throttle from '../helpers/throttle.js';

export default class IconsController {
  constructor(icons) {
    this.icons = Array.from(icons);
    this.throttleDelay = 600;
  }

  controllOnResize = () => {
    window.addEventListener(
      'resize',
      throttle(this.onWindowResize, this.throttleDelay)
    );
  };

  onWindowResize = () => {
    this.showIcons();
    this.controll();
  };

  controll = () => {
    setTimeout(() => {
      for (let i = 0; i < this.icons.length; i++) {
        const currentWidth = this.icons[i].clientWidth;
        const defualtWidthString = this.icons[i].style.width;

        if (!defualtWidthString) {
          throw new Error(
            'The element must be given a positive width in inline styles'
          );
        }

        const defaultWidth = this.getInteger(defualtWidthString);

        if (!defaultWidth) {
          throw new Error(
            'The element must be given a positive width in inline styles'
          );
        }

        console.log();

        if (currentWidth < defaultWidth) {
          this.hideIcons();
          break;
        } else {
          this.showIcons();
        }
      }
    });
  };

  hideIcons = () => {
    this.icons.forEach((icon) => {
      icon.style.display = 'none';
    });
  };

  showIcons = () => {
    this.icons.forEach((icon) => {
      icon.style.display = 'block';
    });
  };

  getInteger = (width) => {
    return +width.match(/\d+/g).join('');
  };
}
