export default class InputsToButtonsConnector {
  constructor(inputs, buttons, iconsController) {
    this.inputs = Array.from(inputs);
    this.buttons = Array.from(buttons);
    this.iconsController = iconsController;
  }

  connect = () => {
    this.inputs.forEach((input, i) => {
      input.addEventListener('input', () => this.onInputInput(input, i));
    });
  };

  onInputInput = (input, i) => {
    setTimeout(() => this.iconsController.showIcons());
    this.iconsController.controll();
    this.buttons[i].textContent = input.value;
  };
}
