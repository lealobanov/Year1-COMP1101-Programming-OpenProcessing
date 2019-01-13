let art;

function setup() {
    createCanvas(windowWidth,windowHeight); 
    background('#000000');
    art = new SmokeBrush(); 
    art.iterate();

}

function draw(obj) {
    if(obj){
        obj.art.draw()
    }
    else {
      art.draw()
    }
}

document.addEventListener("DOMContentLoaded", function(){
    let cc = document.getElementById("colour");
    function changeColour(event){
    let colour = document.getElementById("colour").value;
    art.setColour(colour);
    }


    let sl = document.getElementById("segLength");
    function changeSegLength(event){
    let segLength = document.getElementById("segLength").value;
    art.setSegmentLength(segLength);
    }
    
    cc.addEventListener("change", changeColour);
    sl.addEventListener("input", changeSegLength);
 

    let customize = document.getElementById("customize");

    customize.addEventListener("submit", function (event){
    event.preventDefault()});
});
