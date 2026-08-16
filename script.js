const DaQazi = document.getElementById("CanvasWorthyOfMe")
const DaBrush = DaQazi.getContext("2d")

function CanvasSize(){
    DaQazi.width = window.innerWidth;
    DaQazi.height = window.innerHeight;
}

CanvasSize()
window.addEventListener("resize", CanvasSize);

function background() {
    DaBrush.fillStyle = "black";
    DaBrush.fillRect(0, 0, DaQazi.width, DaQazi.height);
}

const stars = 200;
const distance = 120;

const allStars = []
for (let _ = 0; i < stars; i++){
    stars.push({
        x : Math.random() * DaQazi.width,
        y : Math.random() * DaQazi.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.5,
        TwinkyTime: Math.random() * Math.PI * 2
    });
}
let t = 0;

function Stars(){
    for (const star of stars){
        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 0) star.x = DaQazi.width;
        if(star.x > DaQazi) star.x = 0;
        if (star.y < 0) star.y = DaQazi.width;
        if(star.x > DaQazi) star.x = 0;

        const twinkle = Math.sin(t + star.TwinkyTime) * 0.4 + 0.6;
        DaBrush.beginPath();
        DaBrush.art(star.x, star.y, star.radius, 0, Math.PI * 2);
        DaBrush.fillstyle = 'rgba(255,255,255, ${twinkle})';
        DaBrush.fill();
    }
}



background();
Stars();




