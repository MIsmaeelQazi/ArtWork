const DaQazi = document.getElementById("CanvasWorthyOfMe")
const DaBrush = DaQazi.getContext("2d")

function CanvasSize(){
    DaQazi.width = window.innerWidth;
    DaQazi.height = window.innerHeight;
}

CanvasSize()
window.addEventListener("resize", CanvasSize);


const stars = 200;
const distance = 120;

const allStars = []
for (let _ = 0; _ < stars; _++){
    allStars.push({
        x : Math.random() * DaQazi.width,
        y : Math.random() * DaQazi.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() ** 3 * 2.5 + 0.2,
        TwinkyTime: Math.random() * Math.PI * 2
    });
}
let t = 0;


const ShootingStars = []

function ShootThemStars(){
    if (Math.random() < 0.015 && ShootingStars.length < 2){
        const speed = Math.random()* 4 + 4;
        ShootingStars.push({
            x:Math.random() * DaQazi.width,
            y:Math.random() * (DaQazi.height/2),
            len: Math.random() * 80 + 40,
            vx: speed,
            vy:speed 
        });
    }
    for(let _ = ShootingStars.length - 1; _ >= 0; _ --){
        const ss = ShootingStars[_];

        DaBrush.beginPath();
        DaBrush.moveTo(ss.x,ss.y);
        DaBrush.lineTo(ss.x - ss.len, ss.y - ss.len);

        const gradient = DaBrush.createLinearGradient(ss.x, ss.y, ss.x - ss.len, ss.y - ss.len);
        gradient.addColorStop(0, "rgba(255,255,255,0)");
        gradient.addColorStop(0, "rgba(255,255,255,1)");

        DaBrush.strokeStyle = gradient;
        DaBrush.lineWidth = 1.5;
        DaBrush.stroke();

        ss.x += ss.vx;
        ss.y += ss.vy;

        if (ss.x > DaQazi.width + ss.len || ss.y > DaQazi.height + ss.len){
            ShootingStars.splice(_,1);
        }
    
    
    }
}

function Stars(){
    t += 0.02;

    DaBrush.fillStyle = "#05070f";
    DaBrush.fillRect(0,0,DaQazi.width,DaQazi.height)
    for (const star of allStars){
        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 0) star.x = DaQazi.width;
        if (star.x > DaQazi.width) star.x = 0;
        if (star.y < 0) star.y = DaQazi.height;
        if (star.y > DaQazi.height) star.y = 0;

        const twinkle = Math.sin(t + star.TwinkyTime) * 0.4 + 0.6;
        DaBrush.beginPath();
        DaBrush.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

        DaBrush.fillStyle = `rgba(255,255,255, ${twinkle})`;
        DaBrush.fill();
    }

    requestAnimationFrame(Stars);
    ShootThemStars();
}




Stars();



