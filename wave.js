class Wave {
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
  }

  move(speed) {
    if (objectMove) this.y += speed;
  }

  display() {
    if (objectMove) {
      noStroke();
      fill(255, 180);

      beginShape();
      curveVertex(7 + this.x, 40 + this.y);
      curveVertex(7 + this.x, 40 + this.y);
      curveVertex(12 + this.x, 30 + this.y);
      curveVertex(19 + this.x, 26 + this.y);
      curveVertex(30 + this.x, 30 + this.y);
      curveVertex(30 + this.x, 30 + this.y);
      curveVertex(30 + this.x, 30 + this.y);
      curveVertex(40 + this.x, 26 + this.y);
      curveVertex(50 + this.x, 30 + this.y);
      curveVertex(50 + this.x, 30 + this.y);
      curveVertex(50 + this.x, 30 + this.y);
      curveVertex(61 + this.x, 26 + this.y);
      curveVertex(67 + this.x, 30 + this.y);
      curveVertex(72 + this.x, 40 + this.y);
      curveVertex(72 + this.x, 40 + this.y);
      curveVertex(72 + this.x, 40 + this.y);
      curveVertex(59 + this.x, 33 + this.y);
      curveVertex(50 + this.x, 38 + this.y);
      curveVertex(40 + this.x, 33 + this.y);
      curveVertex(30 + this.x, 38 + this.y);
      curveVertex(21 + this.x, 33 + this.y);
      curveVertex(7 + this.x, 40 + this.y);
      curveVertex(7 + this.x, 40 + this.y);
      endShape();
    }
  }
}