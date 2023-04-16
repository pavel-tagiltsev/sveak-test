import throttle from '../helpers/throttle.js';

export default class LastRowController {
  breakpoints = {
    2: 320,
    3: 450,
    4: 640,
    5: 1280
  };

  constructor(items) {
    this.items = items;
    this.extraElemsInLastRows = this.findExtraElemsInLastRows();
  }

  init = () => {
    this.onWindowResize();
    window.addEventListener('resize', throttle(this.onWindowResize, 100));
  };

  onWindowResize = () => {
    if (window.innerWidth < this.breakpoints['3']) {
      this.clearRegardingNumberOfColumns(2);
    }

    if (window.innerWidth < this.breakpoints['4']) {
      this.clearRegardingNumberOfColumns(3);
    }

    if (window.innerWidth < this.breakpoints['5']) {
      this.clearRegardingNumberOfColumns(4);
    }

    if (window.innerWidth >= this.breakpoints['5']) {
      this.clearRegardingNumberOfColumns(5);
    }
  };

  clearRegardingNumberOfColumns = (columns) => {
    this.clearAllDisplayNone();
    this.clearLastNotFullRow(columns);
  };

  clearLastNotFullRow = (columns) => {
    this.extraElemsInLastRows[`${columns}`].forEach((elem) => {
      elem.style.display = 'none';
    });
  };

  clearAllDisplayNone = () => {
    Object.values(this.extraElemsInLastRows).forEach((elems) => {
      elems.forEach((elem) => {
        elem.style.display = '';
      });
    });
  };

  findExtraElemsInLastRows = () => {
    let extraElemsInLastRows = {};

    Object.keys(this.breakpoints).forEach((numberOfColumns) => {
      const numberOfExtraElems = this.items.length % numberOfColumns;

      if (!numberOfExtraElems) {
        extraElemsInLastRows[numberOfColumns] = [];
      } else {
        const extraElems = Array.from(this.items).slice(-numberOfExtraElems);
        extraElemsInLastRows[numberOfColumns] = extraElems;
      }
    });

    return extraElemsInLastRows;
  };
}
