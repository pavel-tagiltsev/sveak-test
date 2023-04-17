import ProgressBar from './modules/ProgressBar.js';
import LastRowController from './modules/LastRowController.js';
import Menu from './modules/Menu.js';
import IconsController from './modules/iconsController.js';
import InputsToButtonsConnector from './modules/InputsToButtonsConnector.js';

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('#task2')) {
    new ProgressBar({
      progressBarElem: document.querySelector('.progress-bar'),
      inputElem: document.querySelector('.control__input'),
      resetElem: document.querySelector('.control__reset'),
      counterElem: document.querySelector('.progress-bar__counter'),
      initialPercentage: 68,
      animationDuration: 1
    }).init();
  }

  if (document.querySelector('#task3')) {
    new Menu({
      menuElem: document.querySelector('[data-menu="menu"]'),
      openBtnElem: document.querySelector('[data-menu="open"]'),
      closeBtnElem: document.querySelector('[data-menu="close"]'),
      menuItemElems: document.querySelectorAll('[data-menu="item"]')
    }).init();

    new LastRowController({
      containerElem: document.querySelector('.cards'),
      itemElems: document.querySelectorAll('[data-card]')
    }).controll();
  }

  if (document.querySelector('#task4')) {
    const iconsController = new IconsController(
      document.querySelectorAll('[data-icon]')
    );
    iconsController.controll();
    iconsController.controllOnResize();

    new InputsToButtonsConnector(
      document.querySelectorAll('[data-input]'),
      document.querySelectorAll('[data-button]'),
      iconsController
    ).connect();
  }
});
