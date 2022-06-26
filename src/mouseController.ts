import robot from 'robotjs';
import { WebSocket } from 'ws';
import { pos } from './utils';

const up = (offset: number): void => {
  robot.dragMouse(pos.x, pos.y - offset);
}

const down = (offset: number): void => {
  robot.dragMouse(pos.x, pos.y + offset);
}

const left = (offset: number): void => {
  robot.dragMouse(pos.x - offset, pos.y);
}

const right = (offset: number): void => {
  robot.dragMouse(pos.x + offset, pos.y);
}

const position = (ws: WebSocket) => {
  ws.send(`mouse_position ${pos.x},${pos.y}\0`);
};

export const mouseController = {
  up, down, left, right, position
}