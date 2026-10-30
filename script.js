const DaQazi = document.getElementById("CanvasWorthyOfMe")
const DaBrush = DaQazi.getContext("2d",{ willReadFrequently:true});
let Sky, Galaxy;

const Mouse =[window.innerWidth/2,window.innerHeight/2];
window.addEventListener('mousemove',(e)=>{
    Mouse[0] = e.clientX;
    Mouse[1] =e.clientY;
});

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
function DrawGalaxy(_){
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
        Y = DrawGalaxy(X);
    }
    else {
        Y = Math.random()*DaQazi.height;
    }
    Y = Math.max(0, Math.min(DaQazi.height,Y));

    const VxI = (Math.random() - 0.5) *0.3;
    const VyI = (Math.random() - 0.5)* 0.3;

    allStars.push({
        x : X,
        y : Y,
        vx: VxI,
        vy: VyI,
        tx:0,
        ty:0,
        text: false,
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
let EyeOpacity = 0;
let EyeState = 0;
let EyeTimer = 0;
let F =0;
let CanShow = false;
function ISeeYou(){
    if (CanShow){
    if (EyeState ===0 && Math.random()< 0.003){
        EyeState = 1;
    }
    else if (EyeState === 1){
        EyeOpacity += 0.005;
        if (EyeOpacity>= 0.7) EyeState =2;
    }
    else if (EyeState === 2){
        EyeTimer ++;
        if (EyeTimer > 200){
            EyeState = 3;
            EyeTimer = 0;
        }
    }
    else if (EyeState ===3){
            EyeOpacity -= 0.01;
            if (EyeOpacity <= 0){
                EyeOpacity = 0;
                EyeState =0;
            }
        }
        F = EyeOpacity;
}
}

function TheEye() {
    if (EyeOpacity <= 0) return;
    const cx = DaQazi.width / 2;
    const cy = DaQazi.height / 2;
    const dx = Mouse[0] - cx;
    const dy = Mouse[1] - cy;
    const angle = Math.atan2(dy, dx);
    const dist = Math.min(Math.sqrt(dx * dx + dy * dy), 40);

    DaBrush.save();
    DaBrush.globalAlpha = EyeOpacity * 0.85;

    const eyeWidth = 260;
    const eyeHeight = 65;

    const EyeGradient = DaBrush.createRadialGradient(cx, cy, 20, cx, cy, 220);
    EyeGradient.addColorStop(0, "rgba(255,0,0,0.3)");
    EyeGradient.addColorStop(0.5, "rgba(120,0,0,0.15)");
    EyeGradient.addColorStop(1, "rgba(0,0,0,0)");

    DaBrush.fillStyle = EyeGradient;
    DaBrush.beginPath();
    DaBrush.arc(cx, cy, 220, 0, Math.PI * 2);
    DaBrush.fill();

    DaBrush.beginPath();
    DaBrush.moveTo(cx - eyeWidth, cy);
    DaBrush.quadraticCurveTo(cx, cy - eyeHeight * 1.3, cx + eyeWidth, cy - 10);
    DaBrush.quadraticCurveTo(cx, cy + eyeHeight * 0.9, cx - eyeWidth, cy);
    DaBrush.closePath();

    DaBrush.strokeStyle = "rgba(220, 20, 20, 0.9)";
    DaBrush.lineWidth = 3;
    DaBrush.shadowColor = "red";
    DaBrush.shadowBlur = 20;
    DaBrush.stroke();

    DaBrush.fillStyle = "rgba(15, 0, 0, 0.6)";
    DaBrush.fill();
    const px = cx + Math.cos(angle) * dist;
    const py = cy + Math.sin(angle) * dist * 0.3;

    DaBrush.save();
    DaBrush.clip(); 
    DaBrush.beginPath();
    DaBrush.arc(px, py, 35, 0, Math.PI * 2);
    DaBrush.fillStyle = "rgba(200, 0, 0, 0.9)";
    DaBrush.shadowColor = "#ff3333";
    DaBrush.shadowBlur = 15;
    DaBrush.fill();
    DaBrush.beginPath();
    DaBrush.ellipse(px, py, 5, 28, 0, 0, Math.PI * 2);
    DaBrush.fillStyle = "black";
    DaBrush.shadowBlur = 0;
    DaBrush.fill();

    DaBrush.restore(); 
    DaBrush.restore(); 


const McSpeech = ["I see the player you mean.","You are the universe tasting itself.","Wake up.","The universe loves you.","You are the player.","And the game was over and player woke up .",]
let textPhase = 0;
let textTimer = 200;
let C = 0;

const textCanvas = document.createElement("canvas");
const textCtx = textCanvas.getContext("2d", {willReadFrequently:true});


function Deliver(){
    if (C>= McSpeech.length){ 
        CanShow = false;
        return; 
    }
    const Speech = McSpeech[C];
    textCanvas.width = DaQazi.width;
    textCanvas.height = DaQazi.height;
    textCtx.fillStyle = "black";
    textCtx.fillRect(0,0,textCanvas.width,textCanvas.height);
    textCtx.fillStyle = "white";
    textCtx.font = "bold 60px Arial";
    textCtx.textBaseline = "middle";
    textCtx.textAlign = "center";
    textCtx.fillText(Speech, textCanvas.width/2, textCanvas.height/2);

    const imgData = textCtx.getImageData(0,0,textCanvas.width,textCanvas.height).data;
    const textPixels = [];
    for (let tempy =0;tempy<textCanvas.height; tempy +=4){
        for (let tempx =0; tempx <textCanvas.width; tempx +=4){
            const i = (tempy*textCanvas.width+tempx)*4;
            if (imgData[i] > 128) {
                textPixels.push({tempx,tempy});
            }
        }
    }
    allStars.forEach(star =>star.text = false);
    for (let i = 0; i <textPixels.length;i++) {
        if (i< allStars.length){
            allStars[i].tx = textPixels[i].tempx;
            allStars[i].ty = textPixels[i].tempy;
            allStars[i].text = true;
        }
    }
    C++;
}

function Stars(){
    t += 0.02;

    DaBrush.fillStyle = Sky;
    DaBrush.fillRect(0,0,DaQazi.width,DaQazi.height);
    DaBrush.fillStyle = Galaxy;
    DaBrush.fillRect(0,0,DaQazi.width, DaQazi.height);
    ISeeYou();
    TheEye();
    if (textTimer >0){
        textTimer--;
        if (textTimer < 50) CanShow = false;
    } else {
        Deliver();
        textTimer = 300;
    }



    const cx = DaQazi.width/2;
    const cy = DaQazi.height/2;
    for (const star of allStars) {
        let Color = star.color;
    
        if (star.text) {

            star.x += (star.tx - star.x) * 0.05;
            star.y += (star.ty - star.y) * 0.05;
        } else {

            star.x += star.vx * star.Depth;
            star.y += star.vy * star.Depth;

            if (star.x < 0) star.x = DaQazi.width;
            if (star.x > DaQazi.width) star.x = 0;
            if (star.y < 0) star.y = DaQazi.height;
            if (star.y > DaQazi.height) star.y = 0;
        }
        if (EyeOpacity > 0 && !star.text) {
            const dx = cx - star.x;
            const dy = cy - star.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 500) {
                const angle = Math.atan2(dy, dx);
                star.x -= Math.cos(angle) * F * 4;
                star.y -= Math.sin(angle) * F * 4; 

                if (distance < 300) {
                    Color = [255, 50, 50]; 
                }
            }
        }

        const twinkle = (Math.sin(t + star.TwinkyTime) * 0.4 + 0.6) * star.Twinkle * star.Depth;
        const [r, g, b] = Color;
        
        DaBrush.beginPath();
        DaBrush.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        DaBrush.fillStyle = `rgba(${r}, ${g}, ${b}, ${star.text ? 1 : twinkle})`; 
        DaBrush.fill();
    }



    ShootThemStars();
    requestAnimationFrame(Stars);

}



Stars();



