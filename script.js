const DaQazi = document.getElementById("CanvasWorthyOfMe")
const DaBrush = DaQazi.getContext("2D")

function CanvasSize(){
    DaQazi.width = window.innerWidth;
    DaQazi.height = window.innerHeight;
}

CanvasSize()
window.addEventListener("resize", CanvasSize);

function background() {
    DaBrush.fillStyle = "black";
    DaBrush.fillRect(10, 10, DaQazi.width, DaQazi.height);
}




background();




