let art;

function setup() {
  background(255);
  createCanvas(windowWidth,windowHeight); 
  art = new SmokeBrush 
  art.iterate()
}

function draw() {
  art.draw()
  }

class SmokeBrush {
  constructor(segLength=5, curvature=60, x=[20],y=[20]) {
    this.segLength = segLength; 
    this.curvature = curvature;
    this.x = x;
		this.y = y;
		
	}

  iterate(){
    for(let i=0; i<this.curvature; i++) {
      this.x[i]=1;
      this.y[i]=1;
    }  
  }

	segment(x, y, a) {
      strokeWeight(1);
      stroke(0, 0, 0,50);
      push();
      translate(x, y);
      rotate(a);
      line(0, 0, this.segLength, 0);
      pop();
  }

	dragSegment( i,  xin,  yin) { 
 		let dx = xin - this.x[i];
  	let dy = yin - this.y[i];
  	let angle = atan2(dy, dx);  
  		this.x[i] = xin - cos(angle) * this.segLength;
  		this.y[i] = yin - sin(angle) * this.segLength;
  		return this.segment(this.x[i], this.y[i], angle);
  	}

  	draw() {
      let PX = mouseX;
      let PY= mouseY;
  		this.dragSegment(0, PX, PY)
  		for(let i=0; i<this.x.length-1; i++) {
        this.dragSegment(i+1, this.x[i], this.y[i]);
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




