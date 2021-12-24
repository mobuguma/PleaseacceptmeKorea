class Rock {
  constructor(_x, _y, _size) {
    this.x = _x;
    this.y = _y;
    this.size = _size;
  }

  move(speed) {
    if (objectMove) this.y += speed;
  }

  collide() {
    if (objectMove && !dive) {
      let d1 = dist(this.x + this.size / 2, this.y + this.size * 2 / 6, px, py - 40);
      let d2 = dist(this.x + this.size / 2, this.y + this.size * 2 / 6, px, py + 30);
      if (d1 < 25 + this.size * 7 / 20 || d2 < 35 + this.size * 7 / 20) {
        live = false;
        diebgm = false;
      }
      if (diebgm == false) {
        dieSound.setVolume(0.4);
        dieSound.play();
        diebgm = true;
      }
    }
  }

  display() {
    imageMode(CORNER);
    if (objectMove) image(rock_image, this.x, this.y, this.size, (this.size * 2) / 3);
    // stroke(255, 0, 0);
    // noFill();
    // strokeWeight(5);
    // circle(this.x+this.size/2, this.y+this.size*2/6, this.size*7/10);
    // point(this.x+this.size/2, this.y+this.size*2/6);
    // circle(px, py-40, 50);
    // circle(px, py+30, 70);
    // point(px, py-40);
    // point(px, py+30);
    //image(rock2_image, this.x, this.y, this.size, this.size*2/3);
  }
}
