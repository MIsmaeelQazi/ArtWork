const DaQazi = document.getElementById("CanvasWorthyOfMe")
const DaBrush = DaQazi.getContext("2d")
let Sky, Galaxy;

function CanvasSize(){
    DaQazi.width = window.innerWidth;
    DaQazi.height = window.innerHeight;

    Sky = DaBrush.createLinearGradient(0,0,0,DaQazi.height);
    Sky.addColorStop(0,"#02030a");
    Sky.addColorStop(1,"#000d1c");

    Galaxy = DaBrush.createLinearGradient(0,DaQazi.height,DaQazi.width,DaQazi.height*0.2);
    Galaxy.addColorStop(0,"rgba(0,0,0,0)");
    Galaxy.addColorStop(0.5,"rgba(70,80,130,0.07)");
    Galaxy.addColorStop(1,"rgba(0,0,0,0)");
}

CanvasSize()
window.addEventListener("resize", CanvasSize);


const stars = 5500;
//const distance = 120;
const Colors = [[255,255,255],[210,230,255],[255,245,220],[225,210,255],[255,225,100],[190,225,255],]
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


let EyePhase = 0;
let EyeOpacity = 0;
let EyeTimer = 400;

function DrawTheEye(){
    if (EyeOpacity <=0) return;
    const cx = DaQazi.width /2;
    const cy = DaQazi.height /2;
    DaBrush.save();
    DaBrush.globalAlpha = EyeOpacity;

    const Aura  = DaBrush.createRadialGradient(cx,cy,0,cx,cy,300);
    Aura.addColorStop(0,"rgba(200,0,0,0.4)");
    Aura.addColorStop(1,"rgba(0,0,0,0)");
    DaBrush.fillStyle = Aura;
    DaBrush.beginPath();
    DaBrush.arc(cx,cy,300,0,Math.PI*2);
    DaBrush.fill();
    DaBrush.fillStyle = "rgba(120,0,0,0.9)";
    DaBrush.beginPath();
    DaBrush.ellipse(cx,cy,100,40,0,0,Math.PI * 2);
    DaBrush.fill();
    DaBrush.shadowBlur = 20;
    DaBrush.shadowColor = "red";
    DaBrush.fillStyle = "black";
    DaBrush.beginPath();
    DaBrush.ellipse(cx,cy,10,35,0,0,Math.PI*2);
    DaBrush.fill();
    DaBrush.restore();

}

function Creepy(){
    if (EyePhase ===0){
        EyeTimer--;
        if(EyeTimer <= 0) EyePhase = 1;
    }
    else if (EyePhase === 1){
        EyeOpacity += 0.003;
        if (EyeOpacity >= 0.8){EyePhase =2; EyeTimer =300;}
    }
    else if (EyePhase === 2){
        EyeTimer--;
        if (EyeTimer <=0) EyePhase = 3;
    }
    else if (EyePhase === 3){
        EyeOpacity -= 0.003;
        if (EyeOpacity <= 0){EyePhase = 0; EyeTimer = Math.random()*800+400;}
    }
}

function Stars(){
    t += 0.02;

    DaBrush.fillStyle = Sky;
    DaBrush.fillRect(0,0,DaQazi.width,DaQazi.height);
    DaBrush.fillStyle = Galaxy;
    DaBrush.fillRect(0,0,DaQazi.width, DaQazi.height);
    Creepy();
    DrawTheEye();
    const cx = DaQazi.width/2;
    const cy = DaQazi.height/2;
    for (const star of allStars){
        let Color = star.color;
        if(EyeOpacity > 0){
            const dx = cx - star.x;
            const dy = cy - star.y;
            const distance = Math.sqrt(dx*dx+dy*dy);

            if (distance<500){
                const F = (500 - distance)/ 500 * EyeOpacity * 0.8;
                const angle = Math.atan2(dy,dx);

                star.x += Math.cos(angle +1.2)* F * 4;
                star.y += Math.sin(angle+1.2) * F *4;

                if (distance <300){
                    Color = [255,50,50]
                }
            }
        }

    
        star.x += star.vx * star.Depth;
        star.y += star.vy * star.Depth;

        if (star.x < 0) star.x = DaQazi.width;
        if (star.x > DaQazi.width) star.x = 0;
        if (star.y < 0) star.y = DaQazi.height;
        if (star.y > DaQazi.height) star.y = 0;

        const twinkle = (Math.sin(t + star.TwinkyTime) * 0.4 + 0.6)*star.Twinkle* star.Depth;
        const [r,g,b] = Color;
        DaBrush.beginPath();
        DaBrush.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

        DaBrush.fillStyle = `rgba(${r}, ${g} ,${b} , ${twinkle})`;
        DaBrush.fill();
    }



    ShootThemStars();
    requestAnimationFrame(Stars);

}



Stars();



