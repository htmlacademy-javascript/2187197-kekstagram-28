import { renderThumbnails } from './draw-mini.js';
import { renderBigPicture } from './draw-big.js';
import { setUserFormSubmit, onImageCancel } from './form.js';
import { getData, sendData } from './api.js';
import { showAlert } from './alerts.js';
import { renderFilters } from './filters.js';
import { debounce, showSystemMessage } from './util.js';

const RERENDER_DELAY = 500;
const MESSAGE_SHOW_TIME = 5000;

setUserFormSubmit(async (data) => {
  try {
    await sendData(data);
    onImageCancel();
    showAlert('success');
  } catch {
    showAlert('error');
  }
});

try {
  const data = await getData();
  renderThumbnails(data);
  const debounceThumbnails = debounce(renderThumbnails, RERENDER_DELAY);
  renderFilters(data, debounceThumbnails);
  renderBigPicture(data);
} catch {
  showSystemMessage('Сбой в подгрузке данных. Попробуйте подключиться позже', MESSAGE_SHOW_TIME);
  throw new Error('Ошибка в получении данных с сервера');
}
