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

  numPointsX = 0;
  numPointsY = 0;

  constructor(width = 1000, height = 1000) {
    let canvas = document.createElement('canvas');
    document.body.append(canvas);
    this.canvas = canvas;
    this.updateSize(width, height);
    this.createGrid();
  }

  destroy() {
    this.canvas.removeEventListener('click', () => this.handleClick());
    this.canvas.remove();
  }

  createGrid() {
    const points = new Array(this.numPointsX);
    for (let x = 0; x < this.numPointsX; x++) {
      points[x] = new Array(this.numPointsY);
      for (let y = 0; y < this.numPointsY; y++) {
        points[x][y] = new ForceLine(
          x * this.pointDistance + this.pointDistance / 2,
          y * this.pointDistance + this.pointDistance / 2,
          this.z,
          [1, 1]
        );
      }
    }

    this.points = points;
  }

  updateGrid() {
    for (let x = 0; x < this.numPointsX; x++) {
      for (let y = 0; y < this.numPointsY; y++) {
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

        let point = this.points[x][y];
        point.x = x * this.pointDistance + this.pointDistance / 2;
        point.y = y * this.pointDistance + this.pointDistance / 2;
        point.z = this.z;
        point.force = [noise, noise2];
      }
    }
  }

  draw() {
    let canvas = this.canvas;
    let paper = canvas.getContext('2d');
    paper.clearRect(0, 0, this.width, this.height);
    paper.fillRect(0, 0, this.width, this.height);

    for (let x = this.numPointsX; x >= 0; x--) {
      for (let y = this.numPointsY; y >= 0; y--) {
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
    this.numPointsX = Math.round(this.width / this.pointDistance);
    this.numPointsY = Math.round(this.height / this.pointDistance);
    this.createGrid();
  }
}
