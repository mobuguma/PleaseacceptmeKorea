let imgO; //문어그림
let imgB; //먹물
let imgD; //잠수하는 사람
let img = [];
let radioactivity = [];
let congrats = [];
let ending = [];
let c; //바다 색깔
let start_image;
let rock_image;
let boat_image; //배이미지
let goggle_image;
let star_image;
let fail_image;
let success_image;
let arrive_image;
let net_image;
let swimnet_image;
let face_image;
let intro1;
let intro2;
let intro3;
let night;
let barx = 280;
let bary = 30;
let storyline = 0; //스토리 진행

let startbgm = false;
let startstory = false;
let playbgm = false;
let endingbgm = false;
let finishbgm = false;//브금 소리

let gogglebgm;
let octbgm;
let trashbgm;
let netbgm;
let diebgm;//오브젝트 소리
let distanceAlarm = false; //남은거리 소리

//restart -> reset
let waves = [];
let octopuses = [];
let trashes1 = [];
let rocks = [];
let boats = [];
let goggles = [];
let nets = [];
let current = 0;
let trashtime = 0;

let live = true;
let dive = false;
let dive_count;
let trap = false;
let trap_count = 0;
let ink = false;
let ink_count;
let px = 600; //선수x
let py = 550; //선수y
let pw = 150; //선수너비
let ph = 150; //선수높이
let speed = 5; //선수스피드
let seaSpeed = 2; //바다스피드
let distance = 1085; //스코어
let positions = [60, 180, 300, 420, 540, 660, 780, 900, 1020, 1140]; //장애물위치
let trasheffect = false; //
let objectMove = true;
let end_count = 0;
let stage;
let howManyOctopuses = 0;
let howManyGoggles = 0;
let howManyNets = 0;
let howManyTrashes = 0;
let blank = 0;

function preload() {
  //수영 이미지 로딩
  for (let i = 0; i < 9; i++) {
    img[i] = loadImage("assets/swim" + i + ".png");
  }
  for (let i = 1; i < 3; i++) {
    radioactivity[i - 1] = loadImage("assets/trash_effect" + i + ".png");
  }
  for (let i = 1; i < 3; i++) {
    congrats[i - 1] = loadImage("assets/ending" + i + ".png");
  }

  start_image = loadImage("assets/start.png");
  intro1 = loadImage("assets/intro1.png");
  intro2 = loadImage("assets/intro2.png");
  intro3 = loadImage("assets/intro3.png");
  imgO = loadImage("assets/octopus.png");
  imgB = loadImage("assets/black.png");
  imgD = loadImage("assets/diver.png");
  star_image = loadImage("assets/starr.png");
  goggle_image = loadImage("assets/goggle.png");
  boat_image = loadImage("assets/boat.png");
  rock_image = loadImage("assets/rock1.png");
  net_image = loadImage("assets/net.png");
  swimnet_image = loadImage("assets/swim_net.png");
  trash1_image = loadImage("assets/trash1.png");
  fail_image = loadImage("assets/fail2.png");
  success_image = loadImage("assets/successend.png");
  arrive_image = loadImage("assets/korea.png");
  face_image = loadImage("assets/player.png");
  font = loadFont("assets/IBMPlexSansKR-Medium.ttf");

  startSound = loadSound("assets/sound_startbgm.mp3");//시작화면 브금
  storySound1 = loadSound("assets/sound_start1.mp3");//스토리진행 브금
  storySound2 = loadSound("assets/sound_start2.mp3");
  storySoundBack = loadSound("assets/sound_startadd.mp3");
  gameBgm = loadSound("assets/sound_gamebgm.mp3");//본게임 브금
  octSound = loadSound("assets/sound_octopus.mp3"); //각각 장애물 부딪힐때 효과음
  goggleSound = loadSound("assets/sound_goggle.mp3");
  trashSound = loadSound("assets/sound_trash.mp3");
  netSound = loadSound("assets/sound_net.mp3");
  dieSound = loadSound("assets/sound_die.mp3")
  distSound_half = loadSound("assets/sound_distance_half.mp3")//남은거리
  distSound_200 = loadSound("assets/sound_distance_200.mp3")
  clapSound = loadSound("assets/sound_clap.mp3"); //완주성공하면 효과음
  sucSound = loadSound("assets/sound_successend.mp3"); //성공화면 브금
  failSound2 = loadSound("assets/sound_failend2.mp3");//엔딩페이지 브금
}

function setup() {
  createCanvas(1200, 700);
  c = color(60, 195, 225);
}

function noOverlap() {
  if (positions.length <= 3) {
    let num = int(random(0, positions.length));
    let object = positions[num];

    positions = [60, 180, 300, 420, 540, 660, 780, 900, 1020, 1140];

    for (let i = 0; i < positions.length; i++) {
      if (positions[i] === object) {
        positions.splice(i, 1);
      }
    }
    
    return object;

  } else {
    let num = int(random(0, positions.length));
    let object = positions[num];
    positions.splice(num, 1);

    return object;
  }
}

function draw() {

  switch (storyline) {
    case 0: //시작화면

      if (startbgm == false) {
        startSound.setVolume(0.45);
        startSound.play();
        startbgm = true;
      }
      imageMode(CORNER);
      image(start_image, 0, 0, 1200, 700);

      break;

    case 1: //스토리1
      imageMode(CORNER);
      image(intro1, 0, 0, 1200, 700);
      if (startbgm == true && startstory == false) {
        startSound.stop();
        storySoundBack.setVolume(0.2);
        storySoundBack.play();

        storySound1.setVolume(0.4);
        storySound1.play();
        startbgm = false;
        startstory = true;
      }
      break;

    case 2: //스토리2
      imageMode(CORNER);
      image(intro2, 0, 0, 1200, 700);
      if (startbgm == false) {
        storySound1.stop();
        storySound2.setVolume(0.4);
        storySound2.play();
        startbgm = true;
      }
      break;

    case 3: //게임설명
      imageMode(CORNER);
      image(intro3, 0, 0, 1200, 700);
      if (startbgm == true && startstory == true) {
        storySound2.stop();
        storySoundBack.setVolume(0.4);
        startbgm = false;
      }
      if (keyIsDown(ENTER) && storyline == 3) {
        storyline++;
      }
      break;

    case 4: //게임화면
      //생사
      if (live) {
        //배경
        background(c); //바다
        noStroke();

        //밤하늘에 펄~
        if (stage == 2 || stage == 4) {
          imageMode(CORNER);
          image(star_image, 0, 0, width, 250);
        }

        if (playbgm == false) {
          startSound.stop();
          failSound2.stop();
          sucSound.stop();
          gameBgm.setVolume(0.4);
          gameBgm.play();
          storySoundBack.stop();

          playbgm = true;
          endingbgm = false;
          finishbgm = false;
          distanceAlarm = false;
        }

        //실패조건
        //if (keyIsDown(CONTROL)) live = false;

        //성공조건(도착)
        // if (keyIsDown(SHIFT)) distance = 0;

        if (distance == 0) {
          end_count++;

          if (end_count >= 200 && !objectMove) storyline = 5;

          for (let i = 0; i < 120; i++) {
            noStroke();
            fill(0, 255, 0);
            imageMode(CORNER);
            image(arrive_image, 0, 0, 1200, 120);
          }

          if (finishbgm == false) {
            gameBgm.stop();
            clapSound.setVolume(0.4);
            clapSound.play();
            finishbgm = true;
          }
          objectMove = false;

          if (py <= ph) {
            py = ph;
          } else {
            py -= 10;
          }
        }

        //파도
        for (let wave of waves) {
          wave.move(seaSpeed);
          wave.display();
        }

        if (frameCount % 50 == 0) {
          let b = new Wave(random(0, width - 60), -60);
          waves.push(b);
        }

        for (let i = 0; i < waves.length; i++) {
          if (waves[i].y - 50 > width) {
            waves.splice(0, 1);
          }
        }

        //선수
        if (!dive && !trap) {
          imageMode(CENTER);
          if (frameCount % 6 == 0 && objectMove && !trap) {
            image(img[current++ % 9], px, py, pw, ph);
          } else {
            image(img[current % 9], px, py, pw, ph);
          }
        } else if (!dive && trap) {
          imageMode(CENTER);
          image(swimnet_image, px, py, pw, ph);
        } else if (dive) {
          imageMode(CENTER);
          image(imgD, px, py, pw, ph);
        }

        if (!trap) {
          //좌우키 이동
          if (!trasheffect) {
            if (keyIsDown(LEFT_ARROW)) {
              if (px > pw / 2 && px <= width - pw / 2) {
                px -= speed;
              } else if (px < pw / 2) {
                px = pw / 2;
              } else if (px > width - pw / 2) {
                px = width - pw / 2;
              }
            } else if (keyIsDown(RIGHT_ARROW)) {
              if (px >= pw / 2 && px < width - pw / 2) {
                px += speed;
              } else if (px < pw / 2) {
                px = pw / 2;
              } else if (px > width - pw / 2) {
                px = width - pw / 2;
              }
            }
          } else if (trasheffect) {
            if (keyIsDown(LEFT_ARROW)) {
              if (px >= pw / 2 && px < width - pw / 2) {
                px += speed;
              } else if (px < pw / 2) {
                px = pw / 2;
              } else if (px > width - pw / 2) {
                px = width - pw / 2;
              }
            } else if (keyIsDown(RIGHT_ARROW)) {
              if (px > pw / 2 && px <= width - pw / 2) {
                px -= speed;
              } else if (px < pw / 2) {
                px = pw / 2;
              } else if (px > width - pw / 2) {
                px = width - pw / 2;
              }
            }
          }

          //상하키 이동
          if (keyIsDown(UP_ARROW)) {
            if (py > ph / 2 && py <= height - ph / 2) {
              py -= speed;
            } else if (py < ph / 2) {
              py = ph / 2;
            } else if (pw > height - ph / 2) {
              py = height - ph / 2;
            }
          } else if (keyIsDown(DOWN_ARROW)) {
            if (py >= ph / 2 && py < height - ph / 2) {
              py += speed;
            } else if (py < ph / 2) {
              py = ph / 2;
            } else if (py > height - ph / 2) {
              py = height - ph / 2;
            }
          }
        }

        //장애물&아이템~

        //바위
        for (let rock of rocks) {
          rock.move(seaSpeed);
          rock.collide();
          rock.display();
        }

        //배
        for (let boat of boats) {
          boat.move(seaSpeed);
          boat.display();
          boat.collide();
        }

        //쓰레기
        for (let trash1 of trashes1) {
          trash1.move(seaSpeed);
          trash1.display();
          trash1.collide();
        }

        //고글 아이템
        for (let goggle of goggles) {
          goggle.move(seaSpeed);
          goggle.display();
          goggle.collide();
        }

        //그물
        for (let net of nets) {
          net.move(seaSpeed);
          net.display();
          net.collide();
        }

        //문어
        for (let octopus of octopuses) {
          octopus.move(seaSpeed);
          octopus.display();
          octopus.collide();
        }

        //stage 나누기
        if (distance < 1085 && distance >= 900) {//1_낮
          stage = 1;
        } else if (distance < 900 && distance >= 750) {//1_밤
          stage = 2;
        } else if (distance < 750 && distance >= 550) { //2_낮
          stage = 3;
        } else if (distance < 550 && distance >= 400) {//2_밤
          stage = 4;
        } else if (distance > 0 && distance < 400) {//3
          stage = 5;
        }

        switch (stage) {
          case 1:  //stage1
            seaSpeed = 2.5;
            c = color(60, 195, 225);

            //바위
            if (frameCount % 70 == 0) {
              let rr = new Rock(noOverlap(), -200, random(70, 150));
                rocks.push(rr);
              }

              for (let i = 0; i < rocks.length; i++) {
                if (rocks[i].y - height > height) {
                  rocks.splice(0, 1);
                }
              }
            
            //쓰레기
            if(distance < 980){
              if (frameCount % 150 == 0) {
                let t1 = new Trash1(noOverlap(), -200, 100, 100);
                trashes1.push(t1);
              }

              for (let i = 0; i < trashes1.length; i++) {
                if (trashes1[i].y - height > height) {
                  trashes1.splice(0, 1);
                }
              }
            }
           
            //문어
            if (frameCount % 150 == 0) {
              let o = new Octopus(noOverlap(), -200, 80, 60);
              octopuses.push(o);
            }

            for (let i = 0; i < octopuses.length; i++) {
              if (octopuses[i].y - height > height) {
                octopuses.splice(0, 1);
              }
            }
            break;

          case 2: //stage1 밤
            if (seaSpeed >= 3) {
              seaSpeed = 3;
            } else if (seaSpeed < 3) {
              seaSpeed += 0.01;
            }
            c = color(30, 110, 140);

            //바위
            if (frameCount % 60 == 0) {
              let rr = new Rock(noOverlap(), -200, random(70, 150));
              rocks.push(rr);
            }

            for (let i = 0; i < rocks.length; i++) {
              if (rocks[i].y - height > height) {
                rocks.splice(0, 1);
              }
            }

            //그물
            if (frameCount % 300 == 0) {
              let n = new Net(noOverlap(), -80);
              nets.push(n);
            }

            for (let i = 0; i < nets.length; i++) {
              if (nets[i].y - height > height) {
                nets.splice(0, 1);
              }
            }

            //쓰레기
            if (frameCount % 150 == 0) {
              let t1 = new Trash1(noOverlap(), -200, 100, 100);
              trashes1.push(t1);
            }

            for (let i = 0; i < trashes1.length; i++) {
              if (trashes1[i].y - height > height) {
                trashes1.splice(0, 1);
              }
            }

            //문어
            if (frameCount % 120 == 0) {
              let o = new Octopus(noOverlap(), -200, 80, 60);
              octopuses.push(o);
            }

            for (let i = 0; i < octopuses.length; i++) {
              if (octopuses[i].y - height > height) {
                octopuses.splice(0, 1);
              }
            }

            rectMode(CORNER);
            fill(0, 0, 0, 170);
            rect(0, 0, width, height);
            fill(20, 0, 30, 40);
            rect(0, 0, width, height);

            break;

          case 3: //stage2
            if (seaSpeed >= 3.5) {
              seaSpeed = 3.5;
            } else if (seaSpeed < 3.5) {
              seaSpeed += 0.01;
            }
            c = color(60, 195, 225);

            //바위
            if (frameCount % 50 == 0) {
              let rr = new Rock(noOverlap(), -200, random(120, 160));
              rocks.push(rr);
            }

            for (let i = 0; i < rocks.length; i++) {
              if (rocks[i].y - height > height) {
                rocks.splice(0, 1);
              }
            }

            //쓰레기
            if (frameCount % 120 == 0) {
              let t1 = new Trash1(noOverlap(), -200, 100, 100);
              trashes1.push(t1);
            }

            for (let i = 0; i < trashes1.length; i++) {
              if (trashes1[i].y - height > height) {
                trashes1.splice(0, 1);
              }
            }

            //그물
            if (frameCount % 200 == 0) {
              let n = new Net(noOverlap(), -80);
              nets.push(n);
            }

            for (let i = 0; i < nets.length; i++) {
              if (nets[i].y - height > height) {
                nets.splice(0, 1);
              }
            }

            //문어
            if (frameCount % 150 == 0) {
              let o = new Octopus(noOverlap(), -200, 80, 60);
              octopuses.push(o);
            }

            for (let i = 0; i < octopuses.length; i++) {
              if (octopuses[i].y - height > height) {
                octopuses.splice(0, 1);
              }
            }

            break;

          case 4:  //stage2 밤
            if (seaSpeed >= 4) {
              seaSpeed = 4;
            } else if (seaSpeed < 4) {
              seaSpeed += 0.02;
            }
            c = color(30, 110, 140);

            //바위
            if (frameCount % 45 == 0) {
              let rr = new Rock(noOverlap(), -200, random(120, 180));
              rocks.push(rr);
            }

            for (let i = 0; i < rocks.length; i++) {
              if (rocks[i].y - height > height) {
                rocks.splice(0, 1);
              }
            }

            //쓰레기
            if (frameCount % 100 == 0) {
              let t1 = new Trash1(noOverlap(), -200, 100, 100);
              trashes1.push(t1);
            }

            for (let i = 0; i < trashes1.length; i++) {
              if (trashes1[i].y - height > height) {
                trashes1.splice(0, 1);
              }
            }

            //고글
            if (frameCount % 250 == 0) {
              let g = new Goggle(noOverlap(), -80);
              goggles.push(g);
            }

            for (let i = 0; i < goggles.length; i++) {
              if (goggles[i].y - height > height) {
                goggles.splice(0, 1);
              }
            }

            //그물
            if (frameCount % 300 == 0) {
              let n = new Net(noOverlap(), -80);
              nets.push(n);
            }

            for (let i = 0; i < nets.length; i++) {
              if (nets[i].y - height > height) {
                nets.splice(0, 1);
              }
            }

            //문어
            if (frameCount % 100 == 0) {
              let o = new Octopus(noOverlap(), -200, 80, 60);
              octopuses.push(o);
            }

            for (let i = 0; i < octopuses.length; i++) {
              if (octopuses[i].y - height > height) {
                octopuses.splice(0, 1);
              }
            }

            rectMode(CORNER);
            fill(0, 0, 0, 170);
            rect(0, 0, width, height);
            fill(20, 0, 30, 40);
            rect(0, 0, width, height);

            break;

          case 5: //stage3
            if (seaSpeed >= 5) {
              seaSpeed = 5;
            } else if (seaSpeed < 5) {
              seaSpeed += 0.02;
            }
            c = color(60, 195, 225);

            //바위
            if (frameCount % 35 == 0) {
              let rr = new Rock(noOverlap(), -200, random(120, 180));
              rocks.push(rr);
            }

            for (let i = 0; i < rocks.length; i++) {
              if (rocks[i].y - height > height) {
                rocks.splice(0, 1);
              }
            }

            //배
            if (frameCount % 80 == 0) {
              let bb = new Boat(noOverlap(), -200);
              boats.push(bb);
            }

            for (let i = 0; i < boats.length; i++) {
              if (boats[i].y - height > height) {
                boats.splice(0, 1);
              }
            }

            //쓰레기
            if (frameCount % 70 == 0) {
              let t1 = new Trash1(noOverlap(), -200, 100, 100);
              trashes1.push(t1);
            }

            for (let i = 0; i < trashes1.length; i++) {
              if (trashes1[i].y - height > height) {
                trashes1.splice(0, 1);
              }
            }

            //고글
            if (frameCount % 250 == 0) {
              let g = new Goggle(noOverlap(), -80);
              goggles.push(g);
            }

            for (let i = 0; i < goggles.length; i++) {
              if (goggles[i].y - height > height) {
                goggles.splice(0, 1);
              }
            }

            //그물
            if (frameCount % 350 == 0) {
              let n = new Net(noOverlap(), -80);
              nets.push(n);
            }

            for (let i = 0; i < nets.length; i++) {
              if (nets[i].y - height > height) {
                nets.splice(0, 1);
              }
            }

            //문어
            if (frameCount % 60 == 0) {
              let o = new Octopus(noOverlap(), -200, 80, 60);
              octopuses.push(o);
            }

            for (let i = 0; i < octopuses.length; i++) {
              if (octopuses[i].y - height > height) {
                octopuses.splice(0, 1);
              }
            }

            break;
        }

        //축하박
        if (distance == 0 && py <= ph) {
          imageMode(CENTER);
          if (frameCount % 60 <= 29) {
            image(congrats[0], width / 2, height / 2, 900, 600);
          } else {
            image(congrats[1], width / 2, height / 2+10, 900, 600);
          }
        }

        //상태창
        rectMode(CENTER);
        fill(255, 200);
        rect(150, 40, 180, 60);
        fill(0);
        textSize(20);
        textAlign(CENTER);
        textFont(font);
        text("남은 거리: " + distance + "km", 150, 45);

        //거리바
        fill(255);
        rectMode(CORNER);
        rect(barx, bary, 850, 20, 10);
        let x = map(distance, 1085, 0, 0, 850);
        imageMode(CENTER);
        image(face_image, barx + x, bary + 10, 50, 50);

        //남은 거리 소리
        if (distance == 540 && distanceAlarm == false) {
          gameBgm.setVolume(0.2);
          distSound_half.setVolume(0.5);
          distSound_half.play();
          distanceAlarm = true;
          gameBgm.setVolume(0.35);
        }
        if (distance == 200 && distanceAlarm == true) {
          gameBgm.setVolume(0.2);
          distSound_200.setVolume(0.5);
          distSound_200.play();
          distanceAlarm = false;
          gameBgm.setVolume(0.35);
        }

        if (live && frameCount % 8 == 0) {
          if (distance != 0) {
            distance--;
          }
        }

        //업적
        if(howManyOctopuses >= 15) {
          textSize(15);
          fill(255);
          text("오징어 친구 - 문어 "+howManyOctopuses+"회", 360, 80);
        }
          
        if(howManyTrashes >= 10) {
          textSize(15);
          fill(255);
          text("프로 피폭러 - 쓰레기 "+howManyTrashes+"회", 570, 80);
        }
        
        if(howManyNets >= 5) {
          textSize(15);
          fill(255);
          text("일등급 횟감 - 그물 "+howManyNets+"회", 790, 80);
        }
                
        if(howManyGoggles >= 10) {
          textSize(15);
          fill(255);
          text("제주도 해녀 - 잠수 "+howManyGoggles+"회", 1000, 80);
        }
                
      } else {
        //실패
        imageMode(CORNER);
        image(fail_image, 0, 0, width, height);

        if (distanceAlarm == true) {
          distSound_half.stop();
          distanceAlarm = false;
        } else {
          distSound_200.stop();
          distanceAlarm = true;
        }
        if (endingbgm == false) {
          gameBgm.stop();
          failSound2.setVolume(0.4);
          failSound2.play();
          endingbgm = true;
          playbgm = false;
        }

        //restart
        if (keyIsDown(ENTER) && storyline == 4) {
          storyline = 4;
          waves = [];
          octopuses = [];
          trashes1 = [];
          rocks = [];
          boats = [];
          goggles = [];
          nets = [];
          current = 0;
          trashtime = 0;
          live = true;
          dive = false;
          dive_count = 0;
          trap = false;
          trap_count = 0;
          ink = false;
          ink_count = 0;
          px = 600; //선수x
          py = 550; //선수y
          pw = 150; //선수너비
          ph = 150; //선수높이
          speed = 5; //선수스피드
          seaSpeed = 2; //바다스피드
          distance = 1085; //스코어
          positions = [60, 180, 300, 420, 540, 660, 780, 900, 1020, 1140]; //장애물위치
          trasheffect = false; //
          objectMove = true;
          end_count = 0;
          stage = 1;
          playbgm = false;
          howManyOctopuses = 0;
          howManyGoggles = 0;
          howManyNets = 0;
          howManyTrashes = 0;
          blank = 0;
        }
      }

      break;

    case 5: //엔딩
      imageMode(CORNER);
      image(success_image, 0, 0, width, height);

      if (endingbgm == false) {
        sucSound.setVolume(0.25);
        sucSound.play();

        endingbgm = true;
        playbgm = false;
      }

      //restart
      if (keyIsDown(ENTER) && storyline == 5) {
        storyline = 4;
        waves = [];
        octopuses = [];
        trashes1 = [];
        rocks = [];
        boats = [];
        goggles = [];
        nets = [];
        current = 0;
        trashtime = 0;
        live = true;
        dive = false;
        dive_count = 0;
        trap = false;
        trap_count = 0;
        ink = false;
        ink_count = 0;
        px = 600; //선수x
        py = 550; //선수y
        pw = 150; //선수너비
        ph = 150; //선수높이
        speed = 5; //선수스피드
        seaSpeed = 2; //바다스피드
        distance = 1085; //스코어
        positions = [60, 180, 300, 420, 540, 660, 780, 900, 1020, 1140]; //장애물위치
        trasheffect = false; //
        objectMove = true;
        end_count = 0;
        stage = 1;
        playbgm = false;
        howManyOctopuses = 0;
        howManyGoggles = 0;
        howManyNets = 0;
        howManyTrashes = 0;
        blank = 0;
      }

      break;
  }
}

function mouseClicked() {
  switch (storyline) {
    case 0:
      storyline++;
      break;
    case 1:
      storyline++;
      break;
    case 2:
      storyline++;
      break;
    case 3:
      break;
    case 4:
      break;
    case 5:
      break;
  }
}
