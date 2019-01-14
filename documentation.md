# Documentation
January 17, 2019

Programming Summative Assignment

## Documentation of Code

The following documentation outlines the refactoring of a sample OpenProcessing sketch into class form, as well as its example implementation in index.js and accompanying, interactive HTML webpage.

### art_refactor.js
First, this code defines the class SmokeBrush. 

    class SmokeBrush {

The SmokeBrush constructor accepts 5 parameters, *colour*, *segLength*, *curvature*, *x*, and *y*. The paramters are initialized with default values; these values are those that draw the default SmokeBrush curve used in the original OpenProcessing sketch. curvature, x, and y are denoted as private properties, as they are utilized in the class' methods but are otherwise left untouched for customization purposes.

    constructor(colour ='FFFFFF', segLength=5, curvature=60, x=[20],y=[20]) {
         this.colour = colour;
         this.segLength = segLength; 
         this._curvature = curvature;
         this._x = x;
         this._y = y;	
        }
        
Subsequently, the code proceeds to define get and set methods for the class' parameters. Although most are unused in the SmokeBrush class itself, these are defined for purposes of developing a reusable component from the original OpenProcessing sketch. Incorporating getters and setters is generally considered best practice, as it allows for flexibility in code functionality; if one must make alterations to code when a class property is accessed or modified, necessary modifications can be made in the existing getter and/or setter. 

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

The remainder of the refactored class consists of 4 methods: *iterate()*, *segment()*, *drawSegment()*, and *draw()*. Upon declaring the SmokeBrush class and definining its constructor, class properties are referenced using the *this.property* syntax.

First, the *iterate()* method iterates through the lists *x* and *y* *i* times, assigning a value of 1 to the index *i* at each iteration. In the original sketch, this function is initially called before any drawing occurs on the canvas; thus, in the refactored SmokeBrush class, the iterate() method is called in the setup() function. The upper bound on i is defined by *this.curvature*, as it influences the degree of curvature between drawn segments in the resulting SmokeBrush curve; the values at *x[i]* and *y[i]* are later used to calculate the angle of curvature in the *dragSegment()* method.

    iterate(){
        for(let i=0; i<this.curvature; i++) {
            this.x[i]=1;
            this.y[i]=1;
        }  
    }
    
The subsequent *segment()*, *drawSegment()*, and *draw()* methods are nested, referencing one another at other points in the class; this results in continuous drawing of a SmokeBrush curve as the cursor moves along the screen.

The *segment()* method accepts 3 arguments, *x*, *y*, and *a*. The values passed to *x*, *y*, and *a* are determined upon executing the *dragSegment()* method, which returns *this.segment* using the calculated values of *this.x[i]*, *this.y[i]*, and *angle*.

Inside the *segment()* method, pre-defined p5 function calls *strokeWeight()* and *stroke()* are used to style the thickness and color of the SmokeBrush curve. Further, *translate()*, *rotate()*, and *line()* are used to locate a new position on the canvas and draw a line between specified coordinates. *line()* references the *this.segLength* property, which specifies the length of the line to be drawn, given that the value of all other coordinates passed to the function is 0. *rotate()* accepts the argument a, which takes the value of *angle* set out in *dragSegment()*; this function call contributes to rotating the SmokeBrush curve as new strokes are drawn.

    segment(x, y, a) {
        strokeWeight(1);
        stroke(this.colour);
        push();
        translate(x, y);
        rotate(a);
        line(0, 0, this.segLength, 0);
        pop();
    }

Next, the *dragSegment()* method accepts 3 arguments, *i*, *xin*, and *yin*. The values passed to *i*, *xin*, and *yin* are determined upon executing the *draw()* method, which, when the left mouse button is pressed, executes this.dragSegment() using the current cursor coordinates and in a for loop using the values *this.x[i]* and *this.y[i]*. *dragSegment()* utilizes the p5 function calls *sin()*, *cos()*, and *atan2()* to produce linear movement and orient the SmokeBrush curve in relation with the position of the cursor. Specifically, *sin(angle)* and *cos(angle)* return values between -1 and 1, which are then scaled by a factor of *this.segLength* to generate linear movement. *atan2()* returns the angle from a specified point (dx,dy) to the origin as measured from the positive x-axis; this value is assigned to the variable *angle*, and is passed to *sin()*, *cos()*, and a call to *this.segment()*.

    dragSegment( i,  xin,  yin) { 
        let dx = xin - this.x[i];
        let dy = yin - this.y[i];
        let angle = atan2(dy, dx);  
        this.x[i] = xin - cos(angle) * this.segLength;
        this.y[i] = yin - sin(angle) * this.segLength;
        return this.segment(this.x[i], this.y[i], angle);
    }

Lastly, the *draw()* method carries out/performs

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
