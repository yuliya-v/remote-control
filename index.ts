import { httpServer } from './src/http_server/index';
import { WebSocketServer } from 'ws';
import { mouseController } from './src/mouseController';
import { draw, figures } from './src/drawController';
import { makeScreenshot } from './src/screenshot';

const HTTP_PORT = 3000;
const WS_PORT = 8000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: WS_PORT });

wss.on('connection', (ws) => {
  console.log(`Connected to websocket server on the ${WS_PORT} port!`);
  ws.on('message', (data) => {
    const dataStringified = data.toString().split(' ');
    const [cmd] = dataStringified;
    const [, param1, param2] = dataStringified.map(el => +el);

    ws.send(`Command_${cmd}\0`)

    try {
      switch(cmd) {
        case 'mouse_up': {
          mouseController.up(param1);
          break;
        }
        case 'mouse_down': {
          mouseController.down(param1);
          break;
        }
        case 'mouse_left': {
          mouseController.left(param1);
          break;
        }
        case 'mouse_right': {
          mouseController.right(param1);
          break;
        }
        case 'mouse_position': {
          mouseController.position(ws);
          break;
        }
        case 'draw_circle': {
          draw(figures.circle, param1);
          break;
        }
        case 'draw_square': {
          draw(figures.square, param1);
          break;
        }
        case 'draw_rectangle': {
          draw(figures.rectangle, param1, param2);
          break;
        }
        case 'prnt_scrn': {
          makeScreenshot(ws);
          break;
        }
      }
    } catch {
      ws.send(`Command_${cmd}_Result_Error\0`)
    }

    ws.send(`Command_${cmd}_Result_Success\0`);
  });
});

wss.on('close', () => {
  console.log('Connection disconnected');
})
