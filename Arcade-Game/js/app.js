
//  Bugs the player must avoid 
var score=0;
document.getElementById('playerScore').innerHTML = score;
var start=new Date().getMinutes();
var Bug=function(x,y, speed)
{
    // x and y determine x,y axis speed of the enemy
    this.x=x;
    this.y=y;
    this.speed=speed;
    // image of cockroach is added
    this.sprite='images/enemy-bug.png';
}
 
// update the bug position 
Bug.prototype.update=function(dt)
{
    
    // multiplies speed with dt parameter
    this.x +=this.speed*dt;
    // once bugs are off the canvas they appear with random speeds
    if(this.x > 510)
    {
        this.x=-50;
        this.speed=100 + Math.floor(Math.random()*222);
    }
    // collison between the player and bug
    if(player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y )
    {
        score--;
        if(score <0)
        {
            alert("Try Again");
            score=0;
            document.getElementById('playerScore').innerHTML = score;
        }
        document.getElementById('playerScore').innerHTML = score;
         player.x=202;
         player.y=405;
    }

};

//Renders the enemy into the game
Bug.prototype.render=function()
{
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var Player=function(x,y)
{
    this.x=x;
    this.y=y;
    this.player='images/char-horn-girl.png';
}
var end;
Player.prototype.update = function (dt) {
if(player.y<20)
{
    score++;
    document.getElementById('playerScore').innerHTML = score;
    if(score==15)
    {
        end=new Date().getMinutes();
        congratulations();
        score=0;
    }
	this.reset();
}


}
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 405;
};


// Renders the image of the user into the game
Player.prototype.render=function()
{
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
}


// Allows the user to use the arrow keys to jump from tile to tile 
Player.prototype.handleInput=function(keyPress)
{
    
    // Enables user on left arrow key to move left and moves one tile upwards
    if(keyPress=='left' && this.x>0)
    {
        this.x=this.x-102;
    }
    // move towrds right 
    if(keyPress=='right' && this.x < 405)
    {
        this.x=this.x+102;
    }
    // up 
    if(keyPress=='up' && this.y >0)
    {
        this.y=this.y-83;
    }
    // down 
    if(keyPress=='down' && this.y<405)
    {
        this.y=this.y+83;
    }
    // once the user reaches top of the page; water; the user should come back to the initial position
    if(this.y<0)
    {
        setTimeout(()=>{
           this.x=202;
           this.y=405;
        },800);
    }
}

// All bugs placed in an array

var bugs =[];


// bugs loaction 
var bugsLocation=[63, 147, 230];

// each bug move at a speed of 200 untill bugs appear in the array 
bugsLocation.forEach(function(locationY)
{
    bug = new Bug(0, locationY, 200);
    bugs.push(bug);
    
});
// starting location of the game 
var player=new Player(202,405);

// listener for key pressed 
document.addEventListener('keyup', function(e){
var allowedKeys={
    37:'left',
    38:'up',
    39:'right',
    40:'down'
};
player.handleInput(allowedKeys[e.keyCode]);
});

function congratulations()
{
    var time=end-start;
    alert(" Congratulations you win !! Total time taken to complete : " + time + "min"); 
    score=0;
    document.getElementById('playerScore').innerHTML = score;
}
function info()
{
    alert('Welcome to Escape Lady Bird !! '+
    ' 1) Score == 15 Player Wins Game ' + ' 2) Bug Bite score score count decrements by 1 '+' 3) score < 0 play again :)');
}