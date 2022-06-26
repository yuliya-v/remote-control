import robot from 'robotjs';
import Jimp from 'jimp';
import { pos } from './utils';
import { WebSocket } from 'ws';

export const makeScreenshot = (ws: WebSocket) => {
  const size = 200;
  const inputImg = robot.screen.capture(
    pos.x - size / 2,
    pos.y - size / 2,
    size,
    size
  );
  const outputImg = new Jimp(size, size);
  for (let i = 0; i < size; i += 1) {
    for (let j = 0; j < size; j += 1) {
      const hex = inputImg.colorAt(i, j)
      const num = parseInt(`${hex}ff`, 16)
      outputImg.setPixelColor(num, i, j);
    }
  }
  outputImg.getBase64(Jimp.MIME_PNG, (err: Error | null, buffer: string) => {
    if (err) console.log(err);
    else {
      ws.send(`prnt_scrn ${buffer.slice(22)}\0`);
    }
  })
}