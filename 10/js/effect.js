import { inputImage } from './scale.js';
import { EFFECTS } from './effects-data.js';

const DEFAULT_EFFECT = EFFECTS[0];
let userEffect = DEFAULT_EFFECT;

const effectsFieldset = document.querySelector('.effects');
const effectsContainer = document.querySelector('.img-upload__effect-level');
const effectValue = document.querySelector('.effect-level__value');
const effectSlider = document.querySelector('.effect-level__slider');

const showSlider = () => {
  effectsContainer.classList.remove('hidden');
};

const hideSlider = () => {
  effectsContainer.classList.add('hidden');
};

noUiSlider.create(effectSlider, {
  range: {
    min: userEffect.min,
    max: userEffect.max,
  },
  start: userEffect.max,
  step: userEffect.step,
  connect: 'lower',
});
hideSlider();

const isDefault = () => userEffect === DEFAULT_EFFECT;

const updateSlider = () => {
  effectSlider.noUiSlider.updateOptions({
    range: {
      min: userEffect.min,
      max: userEffect.max,
    },
    start: userEffect.max,
    step: userEffect.step,
  });
  if (isDefault()) {
    hideSlider();
  } else {
    showSlider();
  }
};

const onEffectChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }

  userEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  inputImage.className = `effects__preview--${userEffect.name}`;
  updateSlider();
};

const onSliderUpdate = () => {
  const sliderValue = effectSlider.noUiSlider.get();
  inputImage.style.filter = isDefault()
    ? DEFAULT_EFFECT.style
    : `${userEffect.style}(${sliderValue}${userEffect.unit})`;
  effectValue.value = sliderValue;
};

const resetEffects = () => {
  userEffect = DEFAULT_EFFECT;
  updateSlider();
};

effectsFieldset.addEventListener('change', onEffectChange);
effectSlider.noUiSlider.on('update', onSliderUpdate);

export { resetEffects };
