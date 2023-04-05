const SCALE_STEP = 25;
const SCALE_DEFAULT = 100;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

const scaleButtonValue = document.querySelector('.scale__control--value');
const scaleButtonSmaller = document.querySelector('.scale__control--smaller');
const scaleButtonBigger = document.querySelector('.scale__control--bigger');
const inputImage = document.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  scaleButtonValue.value = `${value}%`;
  inputImage.style.transform = `scale(${value / 100})`;
};

const onImageScaleClick = (evt) => {
  evt.preventDefault();

  let scale = parseInt(scaleButtonValue.value, 10);

  if (evt.target === scaleButtonSmaller) {
    scale -= SCALE_STEP;
  } else {
    scale += SCALE_STEP;
  }

  if (scale <= SCALE_MIN) {
    scale = SCALE_MIN;
    scaleButtonSmaller.disabled = true;
    scaleButtonBigger.disabled = false;
  } else if (scale >= SCALE_MAX) {
    scale = SCALE_MAX;
    scaleButtonBigger.disabled = true;
    scaleButtonSmaller.disabled = false;
  } else {
    scaleButtonSmaller.disabled = false;
    scaleButtonBigger.disabled = false;
  }

  scaleImage(scale);
};

scaleButtonSmaller.addEventListener('click', onImageScaleClick);
scaleButtonBigger.addEventListener('click', onImageScaleClick);

const resetScale = () => scaleImage(SCALE_DEFAULT);

export { resetScale, inputImage };
