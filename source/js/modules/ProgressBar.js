import {gsap} from 'gsap';

export default class ProgressBar {
  fullCircle = 360;

  constructor({
    progressBarElem,
    inputElem,
    resetElem,
    counterElem,
    initialPercentage,
    animationDuration
  }) {
    this.progressBar = progressBarElem;
    this.input = inputElem;
    this.reset = resetElem;
    this.counter = counterElem;
    this.percentage = initialPercentage;
    this.duration = animationDuration;
    this.gradientDegrees = this.calculatePercentage(
      this.fullCircle,
      initialPercentage
    );
  }

  init = () => {
    this.input.value = this.percentage;
    this.initialAnimation();
    this.input.addEventListener('change', this.onInputChange);
    this.reset.addEventListener('click', this.onResetClick);
  };

  onInputChange = () => {
    this.gradientDegrees = this.calculatePercentage(
      this.fullCircle,
      this.input.value
    );
  };

  onResetClick = () => {
    this.counter.textContent = 0;
    this.counterAnimation(this.input.value);
    this.progerssBarAnimation();
  };

  initialAnimation = () => {
    this.counterAnimation(this.percentage);
    this.progerssBarAnimation();
  };

  counterAnimation = (percentage) => {
    gsap.to(this.counter, {
      textContent: percentage,
      duration: this.duration,
      snap: {textContent: 1},
      onStart: () => {
        this.reset.disabled = true;
      },
      onComplete: () => {
        this.reset.disabled = false;
      }
    });
  };

  progerssBarAnimation = () => {
    gsap.fromTo(
      this.progressBar,
      {
        backgroundImage: this.calculateGradient(0)
      },
      {
        backgroundImage: this.calculateGradient(this.gradientDegrees),
        duration: this.duration
      }
    );
  };

  calculateGradient = (gradientDegrees) => {
    return `linear-gradient(0deg, rgba(218, 218, 218, 0.2), rgba(218, 218, 218, 0.2)), conic-gradient(from 0deg at 50% 50%, #fb2799 0deg, #8300ea ${gradientDegrees}deg, rgba(131, 0, 234, 0) ${gradientDegrees}deg, rgba(131, 0, 234, 0) 360deg)`;
  };

  calculatePercentage = (number, percentage) => {
    return (number * percentage) / 100;
  };
}
