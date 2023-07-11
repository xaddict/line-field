import ForceLine from './ForceLine.js';
import { createNoise3D } from 'simplex-noise';

export default class LineField {
  canvas = null;
  width = 1000;
  height = 1000;
  pointDistance = 20;
  zoom = 20;
  speed = 0.5;
  points = [];
  noiseGenerator = createNoise3D();
  z = 0; // used for time

  constructor() {
    let canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    document.body.append(canvas);
    this.canvas = canvas;
    this.canvas.addEventListener('click', () => this.handleClick());

    this.createGrid();
  }

  destroy() {
    this.canvas.removeEventListener('click', () => this.handleClick());
    this.canvas.remove();
  }

  createGrid() {
    const numPointsX = this.width / this.pointDistance;
    const numPointsY = this.height / this.pointDistance;
    const points = new Array(numPointsX);
    for (let x = 0; x < numPointsX; x++) {
      points[x] = new Array(numPointsY);
      for (let y = 0; y < numPointsY; y++) {
        let noise = this.noiseGenerator(
          x / this.zoom,
          y / this.zoom,
          this.z * this.speed
        );
        noise = (noise + 1) / 2;
        points[x][y] = new ForceLine(
          x * this.pointDistance + this.pointDistance / 2,
          y * this.pointDistance + this.pointDistance / 2,
          [noise * (this.pointDistance / 2), noise * (this.pointDistance / 2)]
        );
      }
    }

    this.points = points;
  }

  draw() {
    let canvas = this.canvas;
    let paper = canvas.getContext('2d');
    paper.clearRect(0, 0, this.width, this.height);
    paper.strokeStyle = 'red';
    this.points.forEach((column, i) => {
      column.forEach((cell, j) => {
        cell.draw(paper);
      });
    });
  }

  // TODO:
  // 1. [X] create noise calculator
  // 2. [x] set global for X
  // 3. [x] set global noise for Y
  // 4. [x] move the noise through time (or axis)
  // 5. [ ] Use noise for forces of the lines

  reset() {
    this.createGrid();
    this.draw();
  }

  handleClick() {
    this.reset();
  }
}
