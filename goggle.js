class Goggle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  move(speed) {
    if (objectMove) this.y += speed;
  }

  collide() {
    if (objectMove && !dive && !trap) {
      let d1 = dist(this.x, this.y, px, py - 40);
      let d2 = dist(this.x, this.y, px, py + 30);
      if (d1 < 80 || d2 < 90) {
        dive = true;
        dive_count = 0;
        gogglebgm = false;
        ink = false;
        this.x += width;
        howManyGoggles ++;
      }
      if (gogglebgm == false) {
        goggleSound.setVolume(0.4);
        goggleSound.play();
        gogglebgm = true;
      }
    }

    if (dive) {
      dive_count++;
      if (dive_count >= 150) { //원하는 지속 시간(초*60)
        dive = false;
        goggleSound.stop();
      }
    }
  }

  display() {
    imageMode(CENTER);
    if (objectMove) image(goggle_image, this.x, this.y, 80, 70);
  }
}