# Documentation
January 17, 2019

Programming Summative Assignment

## Documentation of Code

The following documentation outlines refactoring of original into class form, as well as example implementation in index.js and accompanying interactive HTML webpage.

### art_refactor.js
First,this code defines the class SmokeBrush. 

    class SmokeBrush {

The SmokeBrush constructor accepts 5 parameters, *colour*, *segLength*, *curvature*, *x*, and *y*. Default values. Private variables/methods as will be accepted into function methods and otherwise untouched for customization purposes.

    constructor(colour ='FFFFFF', segLength=5, curvature=60, x=[20],y=[20]) {
         this.colour = colour;
         this.segLength = segLength; 
         this._curvature = curvature;
         this._x = x;
         this._y = y;	
        }
        
Subsequently, proceed to define get and set methods for the class' parameters. Formality of code style. As colour and segLength are not private, only use set method which is later called when formatting form controls on example HTML page. Both get and set methods are created for curvature, x, and y parameters, which are used to reference these parameters further in the code.

    setColour(colour){
        this.colour = colour;
    }

    setSegmentLength(segLength){
        this.segLength = segLength;    

    }

    set curvature(curvature){
        this._curvature = curvature;
    }

    get curvature() {
        return this._curvature;
    }

    set x(x){
        this._x = x;
    }

    get x(){
        return this._x;
    }

    set y(y){
        this._y =y;
    }

    get y(){
        return this._y;
    }

The remainder of refactored class consists of - methods. Upon declaring the SmokeBrush class and definining the constructor, refer to class properties(?) using this.property syntax.

First, the iterate() method -.

    iterate(){
        for(let i=0; i<this.curvature; i++) {
            this.x[i]=1;
            this.y[i]=1;
        }  
    }
    
The next - methods perform multiple function calls to themselves; reference one another - results in continuous drawing of curve as cursor moves along the screen.
    
    segment(x, y, a) {
        strokeWeight(1);
        stroke(this.colour);
        push();
        translate(x, y);
        rotate(a);
        line(0, 0, this.segLength, 0);
        pop();
    }

Text here

    dragSegment( i,  xin,  yin) { 
        let dx = xin - this.x[i];
        let dy = yin - this.y[i];
        let angle = atan2(dy, dx);  
        this.x[i] = xin - cos(angle) * this.segLength;
        this.y[i] = yin - sin(angle) * this.segLength;
        return this.segment(this.x[i], this.y[i], angle);
    }

Text here

    draw() {
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

### index.js

#### Original code sourced from OpenProcessing -

"Smoke Brush" by Laura Valentini: http://www.openprocessing.org/sketch/583697

Licensed under Creative Commons Attribution ShareAlike

https://creativecommons.org/licenses/by-sa/3.0

https://creativecommons.org/licenses/GPL/2.0/

## Documentation of Example
