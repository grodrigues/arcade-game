class Component{
    constructor(x, y, sprite){
        this.x = x;
        this.y = y;
        this.sprite = sprite;
    }
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Enemy extends Component {
    constructor(x, y, row, speed, sprite){
        super(x, y, sprite);
        this.y = (row * 83) - 20;
        this.speed = speed;
    }
    update(dt){
        if (this.colission()) {
            alert('Você Morreu');
            player.reset();
            this.reset();           
        }else{
            this.x += this.speed * dt;
            if(this.x >= 505){
                this.x = -101;
            }
        }
    }
    colission(){
        return((this.x + 100 - 30 >= player.x) 
          && (this.x + 100 - 30 <= player.x + 101) 
          || (this.x >= player.x) 
          && (this.x <= player.x + 101 - 30)) 
        && this.y === player.y;
    }
    reset(){
        this.x = 101;
    }
}

class Player extends Component {
    constructor(x, y, sprite){
        super(x,y,sprite);
        this.moveX = 101;
        this.moveY = 83;
        this.move = '';
    }
    update() {
        switch (this.move) {
            case 'up':
                if(this.y - this.moveY < -20)
                    return;
                this.y -= this.moveY;
                break;
            case 'right':
                if(this.x + this.moveX > 450)
                    return;
                this.x += this.moveX;
                break;
            case 'left':
                if(this.x - this.moveX < 0)
                    return;
                this.x -= this.moveX;
                break;
            case 'down':
                if (this.y + this.moveY > 395)
                    return;
                this.y += this.moveY;
                break;
            default:
                break;
        }
        if(this.y == -20){
            alert('Você Ganhou !!');
            this.reset();
        }       
        this.move = '';
    }
    reset(){
        this.x = 202;
        this.y = 395;
    }
    handleInput(mov){
        this.move = mov;
    }
}
let player = new Player (202, 395, 'images/char-boy.png');


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [
    new Enemy(0,101, 2, 150, 'images/enemy-bug.png'),
    new Enemy(0,99, 3, 120, 'images/enemy-bug.png'),
    new Enemy(0,110, 1, 305, 'images/enemy-bug.png')
];

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
