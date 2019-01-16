// Declare the art variable
let art;

// Declare the setup() function, which is automatically called by p5 upon load. 
// Inside setup(), create a window-size Canvas with a black background. Assign the variable art to a new instance of the SmokeBrush() class.
// Before calling draw(), execute the iterate() method on art.
function setup() {
    createCanvas(windowWidth,windowHeight); 
    background('#000000');  
    art = new SmokeBrush(); 
    art.iterate();
}     
       
// After running the setup() function, declare the draw() function, which is continuously called by p5.
// Inside draw(), calling the SmokeBrush class' .draw() method on art.
function draw() {   
    art.draw();
}

//Event listeners establish interaction between user actions on HTML form and modifying values of properties set out in art_refactor.js.
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
