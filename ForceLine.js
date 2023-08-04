function linear(x, fromStart, fromEnd, toStart, toEnd) {
  return (
    ((x - fromStart) / (fromEnd - fromStart)) * (toEnd - toStart) + toStart
  );
}

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
    const linearForce0 = linear(this.force[0], -1, 1, 0, 1);
    const linearForce1 = linear(this.force[1], -1, 1, 0, 1);
    const endX = this.x + this.force[0] * 100;
    const endY = this.y + this.force[1] * 100;
    const hue = linearForce0 * 360;
    const saturation = linearForce1 * 100;
    const lineWidth =
      Math.sqrt(Math.pow(this.force[0], 2) + Math.pow(this.force[1], 2)) * 10;

    paper.beginPath();
    const gradient = paper.createLinearGradient(this.x, this.y, endX, endY);
    gradient.addColorStop(0, `hsl(${hue}, 100%, 10%)`);
    gradient.addColorStop(1, `hsl(${hue}, 100%, 50%)`);
    paper.strokeStyle = gradient;
    paper.lineWidth = lineWidth;
    paper.lineCap = 'round';
    paper.moveTo(this.x, this.y);
    paper.lineTo(endX, endY);
    paper.stroke();
    paper.closePath();
  }
}
