# Documentation
January 17, 2019

Programming Summative Assignment

The following documentation outlines the refactoring of a sample OpenProcessing sketch into class form, as well as its example implementation in index.js and accompanying, interactive HTML webpage.

## Documentation of Code

### art_refactor.js
First, this code defines the class SmokeBrush. 

    class SmokeBrush {

The SmokeBrush constructor accepts 8 parameters, *colour*, *segLength*, *strokeWght*, *xcurve*, *ycurve*, *curvature*, *x*, and *y*. *colour*, *segLength*, and *strokeWght* control the color, length, and thickness of individual lines drawn in the sketch, respectively. *xcurve*, *ycurve*, and *curvature* control the degree of horizontal and vertical curvature in the sketch as the cursor in clicked/dragged across the canvas. *x* and *y* are used for iterative purposes and in calculations for the class methods *dragSegment()* and *draw()*.The paramters are initialized with default values; these values are those that draw the default SmokeBrush curve used in the original OpenProcessing sketch, with slight modifications to *x-curvature* and *curvature* values to add a 3-D effect. 

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
        
Subsequently, the code proceeds to define get and set methods for the class' parameters. Although most are unused in the SmokeBrush class itself, these are defined for purposes of developing a reusable component from the original OpenProcessing sketch. Incorporating getters and setters is generally considered best practice, as it allows for flexibility in code functionality and modification; if one must make alterations to code when a class property is accessed or modified, necessary modifications can be made in the existing getter and/or setter as opposed to within the code itself. 

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

Inside the *segment()* method, pre-defined p5 function calls *strokeWeight()* and *stroke()* are used to style the thickness and color of the SmokeBrush curve. If-else statements are used to check whether the user has opted to randomize the value of a particular property; if not, values taken by *this.strokeWght*, *this.colour*, and *this.segLength* are passed to the appropriate p5 functions. Otherwise, random HEX and number values are generated for *strokeWeight()*, *stroke()*, and *line()* each time the method *segment()* is called. This results in a continuously randomized SmokeBrush curve as the user clicks and drags the cursor across the canvas.

Further, *translate()*, *rotate()*, and *line()* are used to locate a new position on the canvas and draw a line of length *this.segLength* between specified coordinates. *line()* references the *this.segLength* property, which specifies the length of the line to be drawn, given that the value of all other coordinates passed to the function is 0. *rotate()* accepts the argument a, which takes the value of *angle* set out in *dragSegment()*; this function call contributes to rotating the SmokeBrush curve as new strokes are drawn.

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

Next, the *dragSegment()* method accepts 3 arguments, *i*, *xin*, and *yin*. The values passed to *i*, *xin*, and *yin* are determined upon executing the *draw()* method, which, when the left mouse button is pressed, executes this.dragSegment() using the current cursor coordinates and in a for loop using the values *this.x[i]* and *this.y[i]*. *dragSegment()* utilizes the p5 function calls *sin()*, *cos()*, and *atan2()* to produce linear movement and orient the SmokeBrush curve in relation with the position of the cursor. Specifically, *sin(angle)* and *cos(angle)* return values between -1 and 1, which are then scaled by a factor of *this.segLength* to generate linear movement. *atan2()* returns the angle from a specified point (dx,dy) to the origin as measured from the positive x-axis; this value is assigned to the variable *angle*, and is passed to *sin()*, *cos()*, and a call to *this.segment()*.

    dragSegment( i,  xin,  yin) { 
        let dx = xin - this.x[i];
        let dy = yin - this.y[i];
        let angle = atan2(dy, dx);  
        this.x[i] = xin - cos(angle) * this.segLength;
        this.y[i] = yin - sin(angle) * this.segLength;
        return this.segment(this.x[i], this.y[i], angle);
    }

Lastly, the *draw()* method implements the *dragSegment()* (and, therefore, *segment()) method(s), thereby drawing a SmokeBrush curve on the canvas. In extending the functionality of the orignial sketch, I have incorporated a series of if-statements that respond to the user's mouse behavior. If the mouse is pressed and left mouse button is clicked, SmokeBrush will be drawn to the canvas. Previously, drawing would occur upon dragging the cursor across the screen, regardless if the mouse was clicked or not; thus, the user can now select where to draw a SmokeBrush curve, and can customize the curve appearance between drawings (in essence, multiple distinct curves can be drawn on the same canvas). Additionally, if the mouse is pressed and right mouse button is clicked, the canvas is cleared. This functionality enables the user to clear the screen and draw a new SmokeBrush curve without refreshing the webpage.

When the left mouse button is pressed and held, *draw()* executes by calling *this.dragSegment()*, which in turn calls *segment()*. The *dragSegment()* method is first called on the X and Y coordinates of the mouse cursor's current position. *dragSegment()* is then again called inside a for loop, iterating i times, where i is bounded by the length of the list *x*. At each iteration, *this.dragSegment()* is called on the arguments *i+1*, *this.x[i]*, and *this.y[i]*.

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

#### Original code sourced from OpenProcessing -

"Smoke Brush" by Laura Valentini: http://www.openprocessing.org/sketch/583697

Licensed under Creative Commons Attribution ShareAlike

https://creativecommons.org/licenses/by-sa/3.0

https://creativecommons.org/licenses/GPL/2.0/

## Documentation of Example

### index.js

First, declare the *art* variable.

The function *setup()* initializes the canvas, which takes the size of the user's screen. The canvas background is initialized to black, hex #000000. Next, the variable *art* is assigned to a new instance of the class *SmokeBrush()*. The *iterate()* method is called on *art*.

    let art;
    
    function setup() {
        createCanvas(windowWidth,windowHeight); 
        background('#000000');
        art = new SmokeBrush(); 
        art.iterate();
    }

Once the canvas and new SmokeBrush class instance have been initialized, the *draw()* function is called. To account for an optional p5.Renderer parameter, the *draw()* function can take two different forms, depending if p5.Renderer is present. If a p5.Renderer object is passed to the *draw()* function, *obj.art.draw()* is carried out, calling the *draw()* method from the SmokeBrush class. Otherwise, if no p5.Renderer object is passed to the *draw()* function, *art.draw()* is executed.

    function draw(obj) {
        if(obj){
            obj.art.draw();
        }
        else {
         art.draw();
        }
    }

The last portion of *index.js* concerns form controls on the sample HTML webpage, discussed below. The parameters are assigned, establish link -.

    document.addEventListener('DOMContentLoaded', function(){
        let cc = document.getElementById('colour');
        function changeColour(event){
            let colour = document.getElementById('colour').value;
            art.setColour(colour);
        }

        let sl = document.getElementById('segLength');
        function changeSegLength(event){
            let segLength = document.getElementById('segLength').value;
            art.setSegmentLength(segLength);
        }
    
        cc.addEventListener('change', changeColour);
        sl.addEventListener('input', changeSegLength);

        let customize = document.getElementById('customize');
    
        customize.addEventListener('submit', function (event){
            event.preventDefault()
        }    
        
### example.html
