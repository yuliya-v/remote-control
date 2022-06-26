import robot from 'robotjs';

export const pos = {
  get x () {
    return robot.getMousePos().x;
  },
  get y () {
    return robot.getMousePos().y;
  }
}