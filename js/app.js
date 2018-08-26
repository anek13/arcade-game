

// Enemies our player must avoid
var Enemy = function(x,y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.step = 101;
    this.x = x;
    this.y = y + 60;
    this.resetPos = -this.step;
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < this.step * 5) {
      this.x += this.speed *dt;
    }
    else {
      this.x = this.resetPos;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Hero {
  constructor() {
    this.stepX = 101;
    this.stepY = 83;
    this.startX = this.stepX * 2;
    this.startY =  this.stepY * 5 - 20;
    this.x = this.startX;
    this.y = this.startY;
    this.sprite = 'images/char-pink-girl.png';
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

}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const player = new Hero();
const bug1 = new Enemy(-101, 0, 120);
const bug2 = new Enemy(-101, 83, 50);
const bug3 = new Enemy((-101 * 2,5), 83, 30);
const bug4 = new Enemy((-101 * 4), 83, 100);
const bug5 = new Enemy(-101, (83 * 2), 75);
const bug6 = new Enemy((-101 * 3,5), (83 * 2), 220);

const allEnemies = [];
allEnemies.push(bug1, bug2, bug3, bug4, bug5, bug6);
console.log(allEnemies);

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
