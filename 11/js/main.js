import { renderThumbnails } from './draw-mini.js';
import { renderBigPicture } from './draw-big.js';
import { setUserFormSubmit, onImageCancel } from './form.js';
import { getData, sendData } from './api.js';
import { showAlert } from './alerts.js';

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
  renderBigPicture(data);
} catch {
  throw new Error('Ошибка в подзагрузке миниатюр');
}
