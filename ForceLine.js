export default class ForceLine {
  x = null;
  y = null;
  force = [null, null];

  constructor(x, y, force) {
    this.x = x;
    this.y = y;
    this.force = force;
  }

  draw(paper) {
    paper.beginPath();
    // paper.moveTo(this.x, this.y);
    // paper.lineTo(this.x + this.force[0], this.y + this.force[1]);
    paper.ellipse(this.x, this.y, this.force[0], this.force[1], 0, 0, 6.28);
    // paper.stroke();
    paper.fill();
  }
}
