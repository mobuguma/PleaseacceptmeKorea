class Net {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  move(speed) {
    if (objectMove) this.y += speed;
  }

  collide() {
    if (objectMove && !dive && !trap) {
      let d1 = dist(this.x, this.y, px, py - 40);
      let d2 = dist(this.x, this.y, px, py + 30);
      if (d1 < 80 || d2 < 90) {
        trap = true;
        netbgm = false;
        this.x += width;
        howManyNets++;
      }
      if (netbgm == false) {
        netSound.setVolume(0.4);
        netSound.play();
        netbgm = true;
      }
    }
  }

  display() {
    imageMode(CENTER);
    if (objectMove) image(net_image, this.x, this.y, 100, 160);
  }
}

function keyTyped() {

  if (trap) {
    if (trap_count >= 8) {
      trap = false;
      trap_count = 0;

    } else if (trap_count < 8) {
      if (key === ' ') {
        trap_count++;
      }
    }
  }
}