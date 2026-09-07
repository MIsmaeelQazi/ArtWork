const DaQazi = document.getElementById("CanvasWorthyOfMe")
const DaBrush = DaQazi.getContext("2d")

function CanvasSize(){
    DaQazi.width = window.innerWidth;
    DaQazi.height = window.innerHeight;
}

CanvasSize()
window.addEventListener("resize", CanvasSize);


const stars = 5500;
//const distance = 120;
const Colors = [[255,255,255],[210,230,255],[255,245,220],[200,220,255]]
function Galaxy(_){
    const center = DaQazi.height * 0.8 - (_/ DaQazi.width) * DaQazi.height * 0.8;

    const spread = DaQazi.height * 0.10;

    const Rand = Math.random() + Math.random() + Math.random() + Math.random() -2;

    const density = Math.sin(_ *0.01) * 0.5 +0.5;
    return center + Rand * spread * (0.5 +density);
}


const allStars = []
for (let _ = 0; _ < stars; _++){

    const X = Math.random()*DaQazi.width;
    let Y;

    if (Math.random()<0.45){
        Y = Galaxy(X);
    }
    else {
        Y = Math.random()*DaQazi.height;
    }
    Y = Math.max(0, Math.min(DaQazi.height,Y));

    allStars.push({
        x : X,
        y : Y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() ** 3 * 2.5 + 0.2,
        TwinkyTime: Math.random() * Math.PI * 2,
        Twinkle : Math.random() * 0.7 + 0.2,
        color : Colors[Math.floor(Math.random()* Colors.length)],
        Depth : Math.random()* 0.5 + 0.5
    });
}
let t = 0;


const ShootingStars = []

function ShootThemStars(){
    if (Math.random() < 0.005 && ShootingStars.length < 2){
        const speed = Math.random()* 6 + 7;
        const angle = Math.random()*(Math.PI / 9) + Math.PI /5;

        ShootingStars.push({
            x:Math.random()*DaQazi.width,
            y:Math.random()* DaQazi.height * 0.6,
            len: Math.random() * 100 + 60,
            vx:Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            Opacity:1,
            fade:Math.random() * 0.015 + 0.01
        })}


    for(let _ = ShootingStars.length - 1; _ >= 0; _ --){
        const ss = ShootingStars[_];
        const tailx = ss.x - ss.vx*(ss.len/10);
        const taily = ss.y - ss.vy*(ss.len/10);

        const gradient = DaBrush.createLinearGradient(ss.x,ss.y,tailx,taily);
        gradient.addColorStop(0, `rgba(255,255,255,${ss.Opacity})`);
        gradient.addColorStop(1, `rgba(255,255,255,0)`);



        DaBrush.beginPath();
        DaBrush.moveTo(ss.x,ss.y);
        DaBrush.lineTo(tailx, taily);        

        DaBrush.strokeStyle = gradient;
        DaBrush.lineWidth = 2;
        DaBrush.stroke();

        const GlowingHead = DaBrush.createRadialGradient(ss.x,ss.y,0,ss.x,ss.y,4);
        GlowingHead.addColorStop(0, `rgba(255,255,255,${ss.Opacity})`);
        GlowingHead.addColorStop(1, `rgba(255,255,255,0)`);

        DaBrush.fillStyle = GlowingHead;

        DaBrush.beginPath();
        DaBrush.arc(ss.x,ss.y,4,0,Math.PI*2);

        DaBrush.fill();
        DaBrush.beginPath();
        DaBrush.arc(ss.x,ss.y,1.5,0,Math.PI*2);

        DaBrush.fillStyle = `rgba(255,255,255,${ss.Opacity})`;
        DaBrush.fill();

        ss.x += ss.vx;
        ss.y += ss.vy;

        ss.Opacity -= ss.fade;


        if (ss.Opacity <=0 || ss.x > DaQazi.width + ss.len || ss.y > DaQazi.height + ss.len){
            ShootingStars.splice(_,1);
        }
    
    
    }
}


function Stars(){
    t += 0.02;

    const Sky = DaBrush.createLinearGradient(0,0,0,DaQazi.height);
    Sky.addColorStop(0, "#02030a");
    Sky.addColorStop(1, "#000d1c");
    DaBrush.fillStyle = Sky;
    DaBrush.fillRect(0,0,DaQazi.width,DaQazi.height);
    const OurGalaxy = DaBrush.createLinearGradient(0, DaQazi.height, DaQazi.width, DaQazi.height * 0.2);

    OurGalaxy.addColorStop(0,"rgba(0,0,0,0)");
    OurGalaxy.addColorStop(0.5,"rgba(70,80,130,0.07)");
    OurGalaxy.addColorStop(1,"rgba(0,0,0,0)");


    DaBrush.fillStyle = OurGalaxy;
    DaBrush.fillRect(0,0,DaQazi.width, DaQazi.height);
    for (const star of allStars){
        star.x += star.vx * star.Depth;
        star.y += star.vy * star.Depth;

        if (star.x < 0) star.x = DaQazi.width;
        if (star.x > DaQazi.width) star.x = 0;
        if (star.y < 0) star.y = DaQazi.height;
        if (star.y > DaQazi.height) star.y = 0;

        const twinkle = (Math.sin(t + star.TwinkyTime) * 0.4 + 0.6)*star.Twinkle* star.Depth;
        const [r,g,b] = star.color;
        //const glow = DaBrush.createRadialGradient(star.x,star.y,0, star.x, star.y, star.radius* 2.5);
        //glow.addColorStop(0, `rgba(${r},${g},${b}, ${twinkle * 0.25})`);
        //glow.addColorStop(1, `rgba(${r},${g},${b}, 0)`);
        

       // DaBrush.fillStyle = glow;
       // DaBrush.beginPath();
       // DaBrush.arc(star.x, star.y, star.radius * 2.5, 0, Math.PI * 2);

       // DaBrush.fill();
        DaBrush.beginPath();
        DaBrush.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

        DaBrush.fillStyle = `rgba(${r}, ${g} ,${b} , ${twinkle})`;
        DaBrush.fill();
    }
    ShootThemStars();
    requestAnimationFrame(Stars);
}




Stars();



