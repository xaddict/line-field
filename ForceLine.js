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
    const endX = this.x + this.force[0] * 10;
    const endY = this.y + this.force[1] * 10;

    paper.beginPath();
    const gradient = paper.createLinearGradient(this.x, this.y, endX, endY);
    gradient.addColorStop(0, 'black');
    gradient.addColorStop(1, 'blue');
    paper.strokeStyle = gradient;
    // paper.strokeStyle = 'linear-gradient(white, black)';
    paper.lineWidth = 10;
    paper.lineCap = 'round';
    paper.moveTo(this.x, this.y);
    paper.lineTo(endX, endY);
    paper.stroke();

    // paper.strokeStyle = 'red';
    // paper.lineWidth = 5;
    // paper.ellipse(this.x, this.y, this.force[0], this.force[1], 0, 0, 6.28);
    // paper.stroke();
    // paper.fill();
  }
}
