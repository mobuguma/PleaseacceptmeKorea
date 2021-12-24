class Boat {
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
  }

  move(speed) {
    if (objectMove) this.y += speed;
  }

  collide() {
    if (objectMove && !dive) {
      let d1 = dist(this.x + 88, this.y + 130, px, py - 40);
      let d2 = dist(this.x + 88, this.y + 130, px, py + 30);
      if (d1 < 90 || d2 < 100) { //배와 선수 팔
        live = false;
        dieSound = false;
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
    if (objectMove) image(boat_image, this.x, this.y, 176, 220);
  }

}
