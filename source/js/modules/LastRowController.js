import throttle from '../helpers/throttle.js';

export default class LastRowController {
  constructor({containerElem, itemElems}) {
    this.container = containerElem;
    this.items = itemElems;
  }

  controll = () => {
    this.onWindowResize();
    window.addEventListener('resize', throttle(this.onWindowResize, 100));
  };

  onWindowResize = () => {
    const columns = getComputedStyle(this.container)
      .getPropertyValue('grid-template-columns')
      .split(' ')
      .map((px) => px);

    this.items.forEach((item) => {
      item.style.display = '';
    });

    const numOfExtraElems = this.items.length % columns.length;

    if (!numOfExtraElems) return;

    const extraElems = Array.from(this.items).slice(-numOfExtraElems);

    extraElems.forEach((extraElem) => {
      extraElem.style.display = 'none';
    });
  };
}
