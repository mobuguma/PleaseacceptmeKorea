class Trash1 {

  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  display() {
    if (objectMove) {
      imageMode(CORNER);
      if (objectMove) image(trash1_image, this.x, this.y, this.w, this.h);

      if (frameCount % 30 <= 14 && trasheffect) {
        image(radioactivity[0], px, py - 50, 30, 30);
      } else if (frameCount % 30 > 14 && trasheffect) {
        image(radioactivity[1], px, py - 50, 30, 30);
      }
    }
  }

  move(speed) {
    if (objectMove) this.y += speed;
  }

  collide() {
    if (objectMove && !dive) {
      let d1 = dist(this.x + this.w / 2 - 5, this.y + this.w / 2 + 12, px, py - 40);
      let d2 = dist(this.x + this.w / 2 - 5, this.y + this.w / 2 + 12, px, py + 30);
      if (d1 < 25 + this.w * 7 / 20 || d2 < 35 + this.w * 7 / 20) { //선수 팔
        trasheffect = !trasheffect;
        trashbgm = false;
        this.x += width;
        howManyTrashes++;
      }
      if (trashbgm == false) {
        trashSound.setVolume(0.4);
        trashSound.play();
        trashbgm = true;
      }
    }
  }
}