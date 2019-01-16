//Define the SmokeBrush() class. Inside the constructor, specifying class parameters and their default values.

class SmokeBrush {
    constructor(colour ='#B0E0E6', segLength=7, strokeWght=1, xcurve=0.15, ycurve=0, curvature=60, x=[20],y=[20]) {
        this.colour = colour;
        this.segLength = segLength; 
        this.strokeWght = strokeWght;
        this.xcurve = xcurve;
        this.ycurve =ycurve;
        this.curvature = curvature;
        this.x = x;
        this.y = y;	
    }

//Defining get and set methods for all class parameters.
    getColour(){
        return this.colour;
    }
    setColour(colour){
        this.colour = colour;
    }
    getSegmentLength(){
        return this.segLengthr;
    }   
    setSegmentLength(segLength){
        this.segLength = segLength;    
    }
    getStrokeWght(){
        return this.strokeWght;
    }
    setStrokeWght(strokeWght){
        this.strokeWght = strokeWght;
    }
    getXcurve(){
        return this.xcurve;
    }
    setXcurve(xcurve){
        this.xcurve = xcurve;
    }
    getYcurve(){
        return this.ycurve;
    }  
    setYcurve(ycurve){
        this.ycurve = ycurve;
    }
    getCurvature() {
        return this.curvature;
    }
    setCurvature(curvature){
        this.curvature = curvature;
    }
    getX(){
        return this.x;
    }
    setX(x){
        this.x = x;
    }
    getY(){
        return this.y;
    }  
    setY(y){
        this.y = y;
    }

//Defining the iterate method, which is called inside the setup() function in index.js. This for loop runs before the .draw() method executes.
    iterate(){
        for(let i=0; i<this.curvature; i++) {
            this.x[i]=1;
            this.y[i]=1;
        }  
    }

//The colorCheck(), strokeWghtCheck(), and segLengthCheck() methods examine whether the respective checkboxes in index.html form controls are checked. If checked, true is returned.
    colorCheck(){
        if (document.getElementById('randomcolor').checked) 
            return true;

    }

    strokeWghtCheck(){
        if (document.getElementById('randomstrokeweight').checked) 
            return true;

    }

    segLengthCheck(){
        if (document.getElementById('randomseglength').checked) 
            return true;

    }

//The segment(), dragSegment(), and draw() methods carry out necessary calculations and draw the sketch to the canvas.
    segment(x, y, a) {
        if (this.strokeWghtCheck() != true) {
            strokeWeight(this.strokeWght); 
        }
        else {
            let randomstrokeweight = Math.random()*9;
            strokeWeight(randomstrokeweight);
        }
        if (this.colorCheck() != true) {
            stroke(this.colour); 
        }
        else {
            let randomhex = '#000000'.replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);} );
            stroke(randomhex);
        }
        push();
        translate(x, y);
        rotate(a);
        if (this.segLengthCheck() != true) {
            line(0, 0, this.segLength, 0);
        }
        else {
            let randomseglength = Math.random()*80;
            line(0, 0, randomseglength, 0);
        } 
        pop();
    }

    dragSegment( i,  xin,  yin) { 
        let dx = xin - this.x[i];
        let dy = yin - this.y[i];
        let angle = atan2(dy, dx);  
        this.x[i] = xin - cos(angle+this.xcurve) * this.segLength;
        this.y[i] = yin - sin(angle+this.ycurve) * this.segLength;
        return this.segment(this.x[i], this.y[i], angle);
    }

// The draw() method accounts for an optional p5.Renderer object.
    draw(g) {
        if(g === undefined){
            if(mouseIsPressed && mouseButton == LEFT){
                let PX = mouseX;
                let PY= mouseY;
                this.dragSegment(0, PX, PY);
                for(let i=0; i<this.x.length-1; i++) {
                    this.dragSegment(i+1, this.x[i], this.y[i]);
                }
            }
            if(mouseIsPressed && mouseButton == RIGHT){
                background('#000000');  
            } 
        }
    
        else {
            if(mouseIsPressed && mouseButton == LEFT){  
                let PX = mouseX;
                let PY= mouseY;
                g.this.dragSegment(0, PX, PY);
                for(let i=0; i<g.this.x.length-1; i++) {
                    g.this.dragSegment(i+1, g.this.x[i], g.this.y[i]);
                } 
            }
            if(mouseIsPressed && mouseButton == RIGHT){
                background('#000000');  
            } 
        }
    } 
}

/*
 "Smoke Brush" by Laura Valentini
http://www.openprocessing.org/sketch/583697
Licensed under Creative Commons Attribution ShareAlike
https://creativecommons.org/licenses/by-sa/3.0
https://creativecommons.org/licenses/GPL/2.0/
*/




