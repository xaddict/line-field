import ForceLine from './ForceLine.js';
import { createNoise3D } from 'simplex-noise';

export default class LineField {
  canvas = null;
  width = 1000;
  height = 1000;
  pointDistance = 40;
  zoom = 20;
  speed = 0.1;
  points = [];
  noiseGenerator = createNoise3D();
  noiseGenerator2 = createNoise3D();
  z = 0; // used for time

  constructor(width = 1000, height = 1000) {
    this.width = width;
    this.height = height;
    let canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    document.body.append(canvas);
    this.canvas = canvas;
    this.createGrid();
  }

  destroy() {
    this.canvas.removeEventListener('click', () => this.handleClick());
    this.canvas.remove();
  }

  createGrid() {
    const numPointsX = Math.round(this.width / this.pointDistance);
    const numPointsY = Math.round(this.height / this.pointDistance);
    const points = new Array(numPointsX);
    for (let x = 0; x < numPointsX; x++) {
      points[x] = new Array(numPointsY);
      for (let y = 0; y < numPointsY; y++) {
        let noise = this.noiseGenerator(
          x / this.zoom,
          y / this.zoom,
          this.z * this.speed
        );

        let noise2 = this.noiseGenerator2(
          x / this.zoom,
          y / this.zoom,
          this.z * this.speed
        );

        points[x][y] = new ForceLine(
          x * this.pointDistance + this.pointDistance / 2,
          y * this.pointDistance + this.pointDistance / 2,
          [noise, noise2]
        );
      }
    }

    this.points = points;
  }

  draw() {
    const numPointsX = Math.round(this.width / this.pointDistance);
    const numPointsY = Math.round(this.height / this.pointDistance);
    let canvas = this.canvas;
    let paper = canvas.getContext('2d');
    paper.clearRect(0, 0, this.width, this.height);
    paper.fillRect(0, 0, this.width, this.height);

    for (let x = numPointsX; x >= 0; x--) {
      for (let y = numPointsY; y >= 0; y--) {
        this?.points?.[x]?.[y]?.draw(paper);
      }
    }
  }

  reset() {
    this.createGrid();
    this.draw();
  }

  updateSize(width, height) {
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
  }
}
