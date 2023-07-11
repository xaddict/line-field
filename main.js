import './style.scss';
import LineField from './lineField.js';

let lineField = new LineField(500, 500);

lineField.draw();

// lineField.destroy();

function redraw() {
  lineField.z = performance.now() / 1000;
  lineField.createGrid();
  lineField.draw();
  requestAnimationFrame(redraw);
}

requestAnimationFrame(redraw);
