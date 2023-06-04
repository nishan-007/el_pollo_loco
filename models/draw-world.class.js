class DrawWorld {

    changeDirection = false;
    
        
        drawWorld() {
            this.clearCanvas();
            this.drawLevel();
            this.drawFixedObjects();
            this.drawEndscreen();
            this.repeatDrawFunction();
        }
    
    
        
        clearCanvas() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    
    
        
        drawLevel() {
            this.ctx.translate(this.cameraX, 0);
            this.drawBackground();
            this.drawItems();
            this.drawGameCharacters();
            this.ctx.translate(-this.cameraX, 0);
        }
    
    
        
        drawBackground() {
            this.addObjectsToMap(this.level.backgroundObjects);
            this.addObjectsToMap(this.level.clouds);
        }
    
    
        
        drawItems() {
            this.addObjectsToMap(this.level.coins);
            this.addObjectsToMap(this.level.bottles);
            this.addObjectsToMap(this.level.hearts);
            this.addObjectsToMap(this.throwableObject);
            this.addObjectsToMap(this.thrownBottle);
        }
    
    
       
        drawGameCharacters() {
            this.addObjectsToMap(this.level.smallEnemies);
            this.addObjectsToMap(this.level.enemies);
            this.addObjectsToMap(this.deadEnemies);
            this.addToMap(this.character);
            this.addToMap(this.endboss);
        }
    
    
        
        drawFixedObjects() {
            this.addToMap(this.statusBarHealth);
            this.addToMap(this.statusBarCoin);
            this.addToMap(this.statusBarBottle);
            this.drawstatusBarEndboss();
        }
    
    
        
        drawstatusBarEndboss() {
            if (this.character.reachedEndboss(this.endboss, 520))
                this.addToMap(this.statusBarEndboss);
        }
    
        drawstatusBarEndbossIcon() {
            if (this.character.reachedEndboss(this.endboss, 520))
                this.addToMap(this.statusBarEndbossIcon);
        }
    
    
        
        drawEndscreen() {
            if (this.character.endGame)
                this.addToMap(this.lost);
            else if (this.endboss.endGame)
                this.addToMap(this.gameOver); 
        }
    
        
        repeatDrawFunction() {
            self = this;
            requestAnimationFrame(function () {
                self.drawWorld();
            });
        }
    
        
        
        addObjectsToMap(objects) {
            objects.forEach(object => this.addToMap(object));
        }
    
    
        
        addToMap(object) {
            if(object.changeDirection) {
                this.flipImage(object);
            }
    
            object.draw(this.ctx)
    
            if (object.changeDirection) {
                this.flipImageBack(object);
            }
        }
    
    
        
        flipImage(object) {
            this.ctx.save();
            this.ctx.translate(object.width, 0);
            this.ctx.scale(-1, 1);
            object.x = object.x * -1;
        }
    
    
        
        flipImageBack(object) {
            this.ctx.restore();
            object.x = object.x * -1;
        }
    
        
        
        checkThrowObjects() {
            if (this.keyboard.F && this.collectedBottles > 0 && !this.character.changeDirection) {
                let bottle = new ThrowableObjects(this.character.x, this.character.y + 100);
                this.throwableObject.push(bottle);
                this.collectedBottles--;
                this.character.reduceProgressbarBottle();
                this.statusBarBottle.setPercentage(this.character.progressBottleBar);
                this.character.setTimeStamp();
                this.playSound(this.soundthrow, 1);
            }
        }
    
        
        setTimeStamp() {
            this.characterLastMovement = new Date().getTime();
        }
    
        
        characterMoveTimepassed() {
            let timepassed = new Date().getTime() - this.characterLastMovement;
            timepassed = timepassed / 1000;
            return timepassed;
        }
    
    
    
        
        endOfGame() {
            if (this.character.endGame) {
                let sound = this.soundLost
                this.playEndSound(sound);
            } else if (this.endboss.endGame) {
                let sound = this.soundWon;
                this.playEndSound(sound);
            }
        }
    
    
        
        playEndSound(sound) {
            this.playSound(sound, 1);
            this.pauseMusic();
            this.resetGame(sound);
        }
    
    
        
        resetGame(sound) {
            clearInterval(this.slowInterval);
            clearInterval(this.fastInterval);
            setTimeout(() => {
                this.restartGame();
                this.pauseMusic(sound);
            }, 2000)
        }
    
    
        
        restartGame() {
            document.location.reload();
        }
    
         
         splashedBottle(bottle) {
            let splashedBottle = new BottleSplash(bottle.x, bottle.y);
            this.thrownBottle.push(splashedBottle);
            this.playSound(this.soundBrokenBottle, 1);
            this.throwableObject = [];
            setTimeout(() => this.thrownBottle.splice(splashedBottle), 200);
        }
    }