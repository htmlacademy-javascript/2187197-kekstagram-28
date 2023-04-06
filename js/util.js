const isEscapeKey = (evt) => evt.key === 'Escape';

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const showSystemMessage = (message, showTime) => {
  const systemMessage = document.createElement('div');

  systemMessage.style.position = 'absolute';
  systemMessage.style.zIndex = '100';
  systemMessage.style.left = '0';
  systemMessage.style.right = '0';
  systemMessage.style.top = '0';
  systemMessage.style.padding = '10px 15px';
  systemMessage.style.fontSize = '20px';
  systemMessage.style.textAlign = 'center';
  systemMessage.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  systemMessage.style.fontFamily = '"Open Sans", Arial, sans-serif';
  systemMessage.style.color = '#ffe753';

  systemMessage.textContent = message;
  document.body.append(systemMessage);

  setTimeout(() => {
    systemMessage.remove();
  }, showTime);
};

export { isEscapeKey, debounce, showSystemMessage };
