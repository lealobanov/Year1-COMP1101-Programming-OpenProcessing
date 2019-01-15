let art;

function setup() {
    createCanvas(windowWidth,windowHeight); 
    background('#000000');  
    art = new SmokeBrush(); 
    art.iterate();
}     
       

function draw() {   
    art.draw();
}


document.addEventListener('DOMContentLoaded', function() {

    let cc = document.getElementById('colour');
    function changeColour(){
        let colour = document.getElementById('colour').value;
        art.setColour(colour);
    }

    let sl = document.getElementById('segLength');
    function changeSegLength(){
        let segLength = document.getElementById('segLength').value;
        art.setSegmentLength(segLength);
    }

    let sw = document.getElementById('strokeWght');
    function changeStrokeWght(){
        let strokeWght = document.getElementById('strokeWght').value;
        art.setStrokeWght(strokeWght);
    }


    cc.addEventListener('change', changeColour);
    sl.addEventListener('input', changeSegLength);
    sw.addEventListener('input', changeStrokeWght);
   
    

    let customize = document.getElementById('customize');

    customize.addEventListener('submit', function (event){
        event.preventDefault();});
});
