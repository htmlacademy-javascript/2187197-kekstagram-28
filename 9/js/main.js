import { getPhotoArray } from './generate-data.js';
import { renderThumbnails } from './draw-mini.js';
import { renderBigPicture } from './draw-big.js';
import './form.js';

const photos = getPhotoArray();
renderThumbnails(photos);
renderBigPicture(photos);
