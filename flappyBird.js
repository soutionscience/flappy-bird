let cvs = document.getElementById('canvas')
let ctx = cvs.getContext('2d');



//initialize images
let bg = new Image(),
    bird = new Image(),
    fg = new Image(),
    pipeNorth = new Image(),
    pipeSouth = new Image();
    bg.src = "/images/bg.png";
    bird.src = "/images/bird.png";
    fg.src = "/images/fg.png";
    pipeNorth.src = "/images/pipeNorth.png";
    pipeSouth.src = "/images/pipeSouth.png";
//initialize audio

let fly = new Audio();
let win = new Audio();

fly.src="/sounds/fly.mp3";
win.src ="/sounds/score.mp3"

//other distance variables
let gap = 90;
let constant = pipeNorth.height+ gap
//bird variables
let bX = 10;
let bY = 150;
let gravity = 1.5;
let score =0;

//on player key down
document.addEventListener("keydown", moveUp);
function moveUp() {fly.play(); bY -=25;}

//pipes coordinates
let pipe =[];
pipe[0]={
    x: cvs.width,
    y: 0
}

let draw = ()=>{
        ctx.drawImage(bg, 0, 0);
        for(var i=0; i<pipe.length; i++){
            ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
            ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y+constant);
            pipe[i].x--;

            if(pipe[i].x == 65){
                pipe.push({
                    x: cvs.width,
                    y: Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
                })
            }
              //detect collision
        if(bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + 
            pipeNorth.height || bY+ bird.height>=pipe[i].y+constant) || bY + bird.height >= cvs.height - fg.height ){
                location.reload()
            }

            if(pipe[i].x ==5){
                score ++;
                win.play();
            }

        }
      

        
        ctx.drawImage(fg, 0, cvs.height- fg.height);
        ctx.drawImage(bird, bX, bY)
        bY += gravity;

        ctx.fillStyle = "#000";
        ctx.font =" 20px Verdana";
        ctx.fillText("Score : " + score, 10, cvs.height -20 )
        requestAnimationFrame(draw)
    }
    
    draw()

