import robot from 'robotjs';

export const enum figures {
  circle = 'circle',
  square = 'square',
  rectangle = 'rectangle'
}

const drawCircle = (radius: number) => {
  const mousePos = robot.getMousePos();
  for (let i = 0; i <= Math.PI * 2; i += 0.01) {
      const x = mousePos.x - (radius * Math.cos(i) - radius);
      const y = mousePos.y - (radius * Math.sin(i));
      robot.dragMouse(x, y);
  }
};

const drawSquare = (length: number) => {
  const { x, y } = robot.getMousePos();

  for (let i = x; i <= x + length; i += 1) {
    robot.dragMouse(i, y);
  }
  for (let i = y; i <= y + length; i += 1) {
    robot.dragMouse(x + length, i);
  }
  for (let i = x + length; i >= x; i -= 1) {
    robot.dragMouse(i, y + length);
  }
  for (let i = y + length; i >= y; i -= 1) {
    robot.dragMouse(x, i);
  }
};

const drawRectangle = (width: number, length: number) => {
  const { x, y } = robot.getMousePos();

  for (let i = x; i <= x + length; i += 1) {
    robot.dragMouse(i, y);
  }
  for (let i = y; i <= y + width; i += 1) {
    robot.dragMouse(x + length, i);
  }
  for (let i = x + length; i >= x; i -= 1) {
    robot.dragMouse(i, y + width);
  }
  for (let i = y + width; i >= y; i -= 1) {
    robot.dragMouse(x, i);
  }
};

export const draw = (figure: string, ...params: number[]) => {
  
  robot.mouseToggle('down');
  robot.mouseToggle('down');
  switch(figure) {
    case figures.circle: {
      const [radius] = params; 
      drawCircle(radius);
      break;
    }
    case figures.square: {
      const [length] = params; 
      drawSquare(length);
      break;
    }
    case figures.rectangle: {
      const [length, width] = params; 
      drawRectangle(length, width);
      break;
    }
    default: break;
  }
  robot.mouseToggle('up');
  robot.mouseToggle('up');
}
