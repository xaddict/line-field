import './style.scss';
import LineField from './lineField.js';

let lineField = new LineField(window.innerWidth, window.innerHeight);

lineField.createGrid();
lineField.draw();

function redraw() {
  lineField.z = performance.now() / 1000;
  lineField.updateGrid();
  lineField.draw();
  requestAnimationFrame(redraw);
}

requestAnimationFrame(redraw);

window.addEventListener('resize', () => {
  lineField.updateSize(window.innerWidth, window.innerHeight);
});
