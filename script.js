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
        radius: Math.random() * 1.5 + 0.5,
        TwinkyTime: Math.random() * Math.PI * 2
    });
}
let t = 0;

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

    for (let _ = 0; _ < allStars.length;_++){
        for(let i= _ + 1; i< allStars.length; i ++){
            const dx = allStars[_].x - allStars[i].x;
            const dy = allStars[_].y - allStars[i].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < distance){
                DaBrush.beginPath();
                DaBrush.moveTo(allStars[_].x, allStars[_].y);
                DaBrush.lineTo(allStars[i].x, allStars[i].y);
                DaBrush.strokeStyle = `rgba(180, 200, 255, ${1 - dist /distance})`;
                DaBrush.lineWidth = 0.5;
                DaBrush.stroke();
            }

        }
    }
    requestAnimationFrame(Stars);
}



Stars();




