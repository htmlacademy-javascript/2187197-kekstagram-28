import { getPhotoArray } from './generate-data.js';
import { renderThumbnails } from './draw-mini.js';
import { renderBigPicture } from './draw-big.js';

const photos = getPhotoArray();
renderThumbnails(photos);
renderBigPicture(photos);
