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
        
Subsequently, the code proceeds to define get and set methods for the class' parameters. Although most are unused in the SmokeBrush class itself, these are defined for purposes of developing a reusable component from the original OpenProcessing sketch. Incorporating getters and setters is generally considered best practice, as it allows for flexibility in code functionality and modification; if one must make alterations to code when a class property is accessed or modified, necessary modifications can be made in the existing getter and/or setter as opposed to within the property itself. 

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

Next, the *dragSegment()* method accepts 3 arguments, *i*, *xin*, and *yin*. The values passed to *i*, *xin*, and *yin* are determined upon executing the *draw()* method, which, when the left mouse button is pressed, executes this.dragSegment() using the current cursor coordinates and in a for loop using the values *this.x[i]* and *this.y[i]*. *dragSegment()* utilizes the p5 function calls *sin()*, *cos()*, and *atan2()* to produce linear movement and orient the SmokeBrush curve in relation with the position of the cursor. Specifically, *sin(angle+this.xcurve)* and *cos(angle+this.ycurve)* return values between -1 and 1, which are then scaled by a factor of *this.segLength* to generate outward curve movement. In extending the functionality of the original sketch, *sin(angle)* and *cos(angle)* have been modified to account for a customization of horizontal (x) and vertical (y) curvature. *atan2()* returns the angle from a specified point (dx,dy) to the origin as measured from the positive x-axis; this value is assigned to the variable *angle*, and is passed to *sin()*, *cos()*, and a call to *this.segment()*.

    dragSegment( i,  xin,  yin) { 
        let dx = xin - this.x[i];
        let dy = yin - this.y[i];
        let angle = atan2(dy, dx);  
        this.x[i] = xin - cos(angle+this.xcurve) * this.segLength;
        this.y[i] = yin - sin(angle+this.ycurve) * this.segLength;
        return this.segment(this.x[i], this.y[i], angle);
    }

Lastly, the *draw()* method implements the *dragSegment()* (and, as a result of nesting, *segment()*) method(s), thereby drawing a SmokeBrush curve on the canvas. In further extending the functionality of the orignial sketch, I have incorporated a series of if-statements that respond to the user's mouse behavior. If the mouse is pressed and left mouse button is clicked, SmokeBrush will be drawn to the canvas. Previously, drawing would occur upon dragging the cursor across the screen, regardless if the mouse was clicked or not; thus, the user can now select where to draw a SmokeBrush curve, and can customize the curve appearance between drawings (in essence, multiple distinct curves can be drawn on the same canvas). Additionally, if the mouse is pressed and right mouse button is clicked, the canvas is cleared. This functionality enables the user to clear the screen and draw a new SmokeBrush curve without refreshing the webpage.

When the left mouse button is pressed and held, *draw()* executes by calling *this.dragSegment()*, which in turn calls *segment()*. The *dragSegment()* method is first called on the X and Y coordinates of the mouse cursor's current position. *dragSegment()* is then again called inside a for loop, iterating i times, where i is bounded by the length of the list *x*. At each iteration, *this.dragSegment()* is called on the arguments *i+1*, *this.x[i]*, and *this.y[i]*.

To account for an optional p5.Renderer parameter, the *draw()* method can take two different forms, depending if p5.Renderer is present. If no p5.Renderer object is passed to the *draw()* method, the method executes and *classname.draw()* is called in *index.js*. Otherwise,if a p5.Renderer object is passed to the *draw()* function, the *draw()* method performs draw operations on the object *g*.

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
                for(let i=0; i<this.x.length-1; i++) {
                    g.this.dragSegment(i+1, this.x[i], this.y[i]);
                } 
            }
            if(mouseIsPressed && mouseButton == RIGHT){
                background('#000000');  
            } 
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

Once the canvas and new SmokeBrush class instance have been initialized, the *draw()* function is called. 

    function draw() {   
    art.draw();
    }


The last portion of *index.js* concerns form controls on the sample HTML webpage, discussed below. JS event listeners are established to respond to user input on HTML form elements, and subsequently call *SmokeBrush()* set functions to reassign values to class properties. This facilitates interaction between *example.HTML*, *index.js*, and the SmokeBrush class defined in *art_refactor.js*.

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
          
Lastly, a JS event listener is used to respond to user form entries.

    let customize = document.getElementById('customize');

    customize.addEventListener('submit', function (event){
        event.preventDefault();});
    });
    
### example.html

First, making the <!DOCTYPE> declaration and opening HTML tag:

    <!DOCTYPE html>
    <html>

Next, declaring the header element inside <head></head> tags. A page title, 'Example Implementation', is assigned inside the <title></title> tags. 

Additionally, linking to a CSS stylesheet through Bootstrap CDN.

    <head>
    
    <title>Example Implementation</title>	

	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

    </head>

Next, declaring the body of the HTML page with an opening <body> tag and assigning a background color. Creating a Bootstrap container class with an opening <div> tag.
    
    <body style="background-color:#F8F8F8;">
	
	<div class="container">

Inside '<div class="container">', proceed to create a row. Inside this row, instructions are provided for the webpage's user interface. 

    <div class="row">
    
    	<h4 style="padding-top: 5px; font-size: 16px;">Welcome to the SmokeBrush interface! Click and drag the cursor to draw a new curve. Design your sketch by adjusting the customization properties below. Right click to clear the canvas.</h4> 
   
    </div>
 
Inside a new row, proceed to create an inline form with the id 'customize'. Actions taken on this form are monitored by event listeners in *index.js*, and subsequently influence appearance of the sketch by modifying properties of the *SmokeBrush()* class defined in *art_refactor.js*.

    <div class="row">	
	<form class="form-inline" id="customize" >

Each form field is declared inside <div class="form-group"></div>. The first two fields, Segment Length and Stroke Weight, take the form of a draggable slider with an assignment to class="form-control-range". Additionally, maximum input values are set for both fields. The third field, Color, prompts a color wheel selector (in browser that do not support this function, the user is prompted to enter a 6-character HEX code specifying a desired color). Lastly, the final three fields are checkboxes that, when checked, randomize the color, segment length, and segment weight of the drawn curve. The Rainbow Mode field is pre-checked upon page load; thus, by default, the user will draw a rainbow-colored SmokeBrush curve.
 
    <div class="form-group">	
				<label for="segLength">Segment Length</label>
				<input type="range" class="form-control-range" style="width: 180px;" max="20" id = "segLength"/>
			</div>
			<div class="form-group">	
				<label for="strokeWeight">Stroke Weight</label>
				<input type="range" class="form-control-range" style="width: 180px;" max="6" id = "strokeWght"/>
			</div>
			<div class="form-group">	
				<label for="colour">Color (HEX):</label>
				<input type="color" input id = "colour"/>
			</div>
			<div class="form-group">	
				<label for="randomcolor">&nbsp;&nbsp;Rainbow Mode</label>
				<input type="checkbox" id = "randomcolor" checked/>
			</div>
			<div class="form-group">	
				<label for="randomseglength">&nbsp;&nbsp;Randomize Segment Length</label>
				<input type="checkbox" id = "randomseglength"/>
			</div>
			<div class="form-group">	
				<label for="randomstrokeweight">&nbsp;&nbsp;Randomize Stroke Weight</label>
				<input type="checkbox" id = "randomstrokeweight"/>
			</div>
    	</form>
    	</div>
  	</div>
 
Lastly, <script></script> tags referencing the p5 CDN, *art_refactor.js*, and *index.js* are included before closing the body tag.
 
      <script src=https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/p5.js></script>
      
      <script src="art_refactor.js"></script>
      
      <script src="index.js"></script>

    </body>	

    </html>
    
