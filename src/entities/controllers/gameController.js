import { camera } from "../../entities/buildScene.js";

let moveForward = false;
let moveBackward = false;
let cruiseControl = 0;
let switcher = 0;

const information = document.getElementById("switch");

export function listenForPlayerMovement() {
  // A key has been pressed
  const onKeyDown = function (event) {
    if (moveForward) {
      return;
    }
    switch (event.keyCode) {
      case 38: // up
      case 87: // w
        moveForward = true;
        switcher === 4 ? (switcher = 4) : switcher++;
        break;
      case 40: // down
      case 83: // s
        moveBackward = true;
        switcher === 0 ? (switcher = 0) : switcher--;
        break;
    }
  };
  // A key has been released
  const onKeyUp = function (event) {
    switch (event.keyCode) {
      case 38: // up
      case 87: // w
        moveForward = false;
        break;
      case 40: // down
      case 83: // s
        moveBackward = false;
        break;
    }
  };
  // Add event listeners for when movement keys are pressed and released
  document.addEventListener("keydown", onKeyDown, false);
  document.addEventListener("keyup", onKeyUp, false);
}

export function animatePlayer() {
  if (!camera) {
    console.log("object camera corrupt");
    return;
  }
  if (moveForward) {
    switch (switcher) {
      case 1:
        information.innerText = "ПЕРЕДАЧА : 1";
        camera.position.z -= 0.2;
        cruiseControl = 0.2;
        break;
      case 2:
        information.innerText = "ПЕРЕДАЧА : 2";
        camera.position.z -= 0.3;
        cruiseControl = 0.3;
        break;
      case 3:
        information.innerText = "ПЕРЕДАЧА : 3";
        camera.position.z -= 0.5;
        cruiseControl = 0.5;
        break;
      case 4:
        information.innerText = "ПЕРЕДАЧА : 4";
        camera.position.z -= 0.6;
        cruiseControl = 0.6;
        break;
    }
  }

  if (moveBackward) {
    switch (switcher) {
      case 0:
        information.innerText = "ПЕРЕДАЧА : 0";
        camera.position.z -= 0;
        cruiseControl = 0;
        break;
      case 1:
        information.innerText = "ПЕРЕДАЧА : 1";
        camera.position.z -= 0.1;
        cruiseControl = 0.1;
        break;
      case 2:
        information.innerText = "ПЕРЕДАЧА : 2";
        camera.position.z -= 0.2;
        cruiseControl = 0.2;
        break;
      case 3:
        information.innerText = "ПЕРЕДАЧА : 3";
        camera.position.z -= 0.3;
        cruiseControl = 0.3;
        break;
      case 4:
        information.innerText = "ПЕРЕДАЧА : 4";
        camera.position.z -= 0.4;
        cruiseControl = 0.4;
        break;
    }
  }

  if (!(moveForward || moveBackward)) {
    // No movement key being pressed. Stop movememnt
    camera.position.z -= cruiseControl;
  }
}
