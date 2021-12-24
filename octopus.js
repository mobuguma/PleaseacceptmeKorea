class Octopus {

  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  display() {
    imageMode(CORNER);
    if (objectMove) image(imgO, this.x, this.y, this.w, this.h);
  }

  move(speed) {
    if (objectMove) this.y += speed;
  }

  collide() {
    if (objectMove && !dive) {
      let d1 = dist(this.x + this.w / 2, this.y + this.w / 3, px, py - 40);
      let d2 = dist(this.x + this.w / 2, this.y + this.w / 3, px, py + 30);
      if (d1 < 25 + this.w * 2 / 6 || d2 < 35 + this.w * 2 / 6) {
        ink = true;
        ink_count = 0;
        octbgm = false;
        this.x += width;
        howManyOctopuses++;
      }

      if (octbgm == false) {
        octSound.setVolume(0.4);
        octSound.play();
        octbgm = true;
      }

      if (ink) {
        ink_count++;
        imageMode(CENTER);
        image(imgB, width / 2, height / 2, 1200, 700);

        if (ink_count >= 240) { //원하는 지속 시간(초*60)
          ink = false;
        }
      }
    }
  }
}