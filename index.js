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