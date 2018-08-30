// Enemies our player must avoid
class Enemy {
  constructor(y) {
    this.step = 101;
    this.y = y + 60;
    this.sprite = 'images/enemy-bug.png';
    this.reset();
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
      if (this.x < this.step * 5) {
        this.x += this.speed * dt;
      }
      else {
        this.x = -this.step;
      }
  }

  // Draw the enemy on the screen, required method for game
  render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  //Sets start position end speed of enemy
  reset() {
      this.x = Math.floor(Math.random() * 200) - 300;
      this.speed = Math.floor(Math.random() * 200) + 20;
  }

}

class Hero {
  constructor() {
    this.stepX = 101;
    this.stepY = 83;
    this.startX = this.stepX * 2;
    this.startY =  this.stepY * 4 + 60;
    this.x = this.startX;
    this.y = this.startY;
    this.sprite = 'images/char-pink-girl.png';
    this.victory = false;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(input) {
    if (input === 'left' && this.x > 0) {
      this.x -= this.stepX;
    }
    else if (input === 'right' && this.x < this.stepX * 4) {
      this.x += this.stepX;
    }
    else if (input === 'up' && this.y > 0) {
      this.y -= this.stepY;
    }
    else if (input === 'down' && this.y < this.stepY * 4) {
      this.y += this.stepY;
    }
  }

  //sets the inital position
  reset() {
    this.x = this.startX;
    this.y = this.startY;
  }

  update() {
    //check collisions with Enemy
    for (let enemy of allEnemies) {
      if ((this.y === enemy.y) && (this.x < enemy.x + 80) && (this.x > enemy.x - 80)){
        this.reset();
      }
    }
    //check end of game
    if (this.y === -23) {
      this.victory = true;
    }
  }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const row1 = 0;               //for enemies on the first row
const row2 = 83;              //for enemies on second row
const row3 = 2 * 83;          //for enemies on third row

const player = new Hero();
const allEnemies = [];
allEnemies.push(new Enemy(row1), new Enemy(row1));
allEnemies.push(new Enemy(row2), new Enemy(row2));
allEnemies.push(new Enemy(row3), new Enemy(row3));


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
