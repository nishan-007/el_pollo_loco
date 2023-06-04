class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;
  F = false;

  constructor() {
      this.keyPressEvents();
      this.touchEvents();
  }


  
  keyPressEvents() {
      this.keydownEvent();
      this.keyupEvent();
  }


  
  keydownEvent() {
      window.addEventListener("keydown", (event) => {
          if (event.keyCode == 39) {
              keyboard.RIGHT = true;
          }

          if (event.keyCode == 37) {
              keyboard.LEFT = true;
          }

          if (event.keyCode == 38) {
              keyboard.UP = true;
          }

          if (event.keyCode == 40) {
              keyboard.DOWN = true;
          }

          if (event.keyCode == 32) {
              keyboard.SPACE = true;
          }

          if (event.keyCode == 70) {
              keyboard.F = true;
          }
      });
  }


  /**
   *  buttons are not activated
   */
  keyupEvent() {
      window.addEventListener("keyup", (event) => {
          if (event.keyCode == 39) {
              keyboard.RIGHT = false;
          }

          if (event.keyCode == 37) {
              keyboard.LEFT = false;
          }

          if (event.keyCode == 38) {
              keyboard.UP = false;
          }

          if (event.keyCode == 40) {
              keyboard.DOWN = false;
          }

          if (event.keyCode == 32) {
              keyboard.SPACE = false;
          }

          if (event.keyCode == 70) {
              keyboard.F = false;
          }
      });
  }


  
  touchEvents() {
      this.moveLeftstart();
      this.moveLeftstop();
      this.moveRightstart();
      this.moveRightstop();
      this.jumpStart();
      this.jumpStop();
      this.throwBottlestart();
      this.throwBottlestop();
  }


  
  moveLeftstart() {
      document.getElementById('btnLeft').addEventListener('touchstart', (event) => {
          event.preventDefault()
          this.LEFT = true;
          document.getElementById('btnLeft').classList.add('buttonOnTouch');
      });
  }
  moveLeftstop() {
      document.getElementById('btnLeft').addEventListener('touchend', (event) => {
          event.preventDefault()
          this.LEFT = false;
          document.getElementById('btnLeft').classList.add('buttonOnTouch');
      });
  }


  
  moveRightstart() {
      document.getElementById('btnRight').addEventListener('touchstart', (event) => {
          event.preventDefault()
          this.RIGHT = true;
          document.getElementById('btnRight').classList.add('buttonOnTouch');
      });
  }

  moveRightstop() {
      document.getElementById('btnRight').addEventListener('touchend', (event) => {
          event.preventDefault()
          this.RIGHT = false;
          document.getElementById('btnRight').classList.add('buttonOnTouch');
      });
  }


  
  jumpStart() {
      document.getElementById('btnJump').addEventListener('touchstart', (event) => {
          event.preventDefault();
          this.SPACE = true;
          document.getElementById('btnJump').classList.add('buttonOnTouch');
      });
  }

  jumpStop() {
      document.getElementById('btnJump').addEventListener('touchend', (event) => {
          event.preventDefault();
          this.SPACE = false;
          document.getElementById('btnJump').classList.add('buttonOnTouch');
      });
  }


  
  throwBottlestart() {
      document.getElementById('btnThrow').addEventListener('touchstart', (event) => {
          event.preventDefault()
          this.F = true;
          document.getElementById('btnThrow').classList.add('buttonOnTouch');
      });
  }

  throwBottlestop() {
      document.getElementById('btnThrow').addEventListener('touchend', (event) => {
          event.preventDefault()
          this.F = false;
          document.getElementById('btnThrow').classList.add('buttonOnTouch');
      });
  }
}