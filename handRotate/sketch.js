//------- Condortable p5 world :))))) -------//
// remeber can only move box if start moving before video loadas
let canvas;
let a = 0;
let b = 0;
let c = 0;

let d = 0;
let e = 0;

let angle = 0;



let sketch = function(p){
  p.setup = function(){
    canvas = p.createCanvas(640, 480, p.WEBGL);
    canvas.id("canvas");

    p.colorMode(p.HSB);
  }

  p.draw = function(){
//    p.clear();
    p.background(0);

  //  let v2 = p.createVector(d, e);

    p.push()
    p.rotateX(a);
    p.rotateY(b);
    p.rotateZ(c);

    //p.rotate(angle);
    p.fill(255);
    p.stroke(0);
    p.strokeWeight(1);
    p.box(50);
    p.pop();




  //  p.translate(-p.width/2, -p.height/2)
    if(detections != undefined){



  // p.rotate();

      if(detections.multiHandLandmarks != undefined){
          //p.drawHands()
          // p.drawParts();

          p.drawLines([0, 5, 9, 13, 17, 0]);//palm
          p.drawLines([0, 1, 2, 3 ,4]);//thumb
          p.drawLines([5, 6, 7, 8]);//index finger
          p.drawLines([9, 10, 11, 12]);//middle finger
          p.drawLines([13, 14, 15, 16]);//ring finger
          p.drawLines([17, 18, 19, 20]);//pinky

      //    p.drawLines([4,8,12, 16, 20]); //webbing

          p.drawLandmarks([0, 1], 0);//palm base
          p.drawLandmarks([1, 5], 60);//thumb
          p.drawLandmarks([5, 9], 120);//index finger
          p.drawLandmarks([9, 13], 180);//middle finger
          p.drawLandmarks([13, 17], 240);//ring finger
          p.drawLandmarks([17, 21], 300);//pinky


          p.getVector([4, 20], 300);






      }
    }
  }

  p.drawHands = function(){
    for(let i=0; i<detections.multiHandLandmarks.length; i++){
      for(let j=0; j<detections.multiHandLandmarks[i].length; j++){
        let x = detections.multiHandLandmarks[i][j].x * p.width;
        let y = detections.multiHandLandmarks[i][j].y * p.height;
        let z = detections.multiHandLandmarks[i][j].z;
        // p.strokeWeight(0);
        // p.textFont('Helvetica Neue');
        // p.text(j, x, y);
        p.stroke(255);
        p.strokeWeight(10);
        p.point(x, y);
      }
    }
  }

  p.drawLandmarks = function(indexArray, hue){
    p.noFill();
    p.strokeWeight(8);
    for(let i=0; i<detections.multiHandLandmarks.length; i++){
      for(let j=indexArray[0]; j<indexArray[1]; j++){
        let x = detections.multiHandLandmarks[i][j].x * p.width;
        let y = detections.multiHandLandmarks[i][j].y * p.height;
        // let z = detections.multiHandLandmarks[i][j].z;
        p.stroke(hue, 40, 255);
        p.point(x, y);
      }
    }
  }

  p.drawLines = function(index){
    p.stroke(0, 0, 255);
    p.strokeWeight(3);
    for(let i=0; i<detections.multiHandLandmarks.length; i++){
      for(let j=0; j<index.length-1; j++){
        let x = detections.multiHandLandmarks[i][index[j]].x * p.width;
        let y = detections.multiHandLandmarks[i][index[j]].y * p.height;
        // let z = detections.multiHandLandmarks[i][index[j]].z;

        let _x = detections.multiHandLandmarks[i][index[j+1]].x * p.width;
        let _y = detections.multiHandLandmarks[i][index[j+1]].y * p.height;
        // let _z = detections.multiHandLandmarks[i][index[j+1]].z;
        p.line(x, y, _x, _y);
      }
    }
  }


    p.getVector = function(index, hue){
      p.stroke(0, 0, 255);
      p.strokeWeight(3);
      for(let i=0; i<detections.multiHandLandmarks.length; i++){
        for(let j=0; j<index.length-1; j++){

          let v1 = p.createVector(detections.multiHandLandmarks[i][index[j]].x * p.width,
                                  detections.multiHandLandmarks[i][index[j]].y * p.height);
          let v2 = p.createVector(detections.multiHandLandmarks[i][index[j+1]].x * p.width,
                                  detections.multiHandLandmarks[i][index[j+1]].y * p.height);

          let v3 = p.createVector(50, detections.multiHandLandmarks[i][index[j]].y * p.height);

          // let _z = detections.multiHandLandmarks[i][index[j+1]].z;
          p.stroke(hue, 40, 255);
        //  p.line(v1.x, v1.y, v2.x, v2.y);
        //  p.line(v3.x, v3.y, v1.x, v1.y);


          let angle = v3.angleBetween(v2);

          console.log(angle);


          if(angle>p.PI/6)
          {
            c= -1.5*(angle-p.PI/6);
        }else if(angle<p.PI/6)
          {
            c = (angle-p.PI/6)*-1.5;
          }
      }
    }
  }

/*    p.getVector = function(index, hue){
      p.stroke(0, 0, 255);
      p.strokeWeight(3);
      for(let i=0; i<detections.multiHandLandmarks.length; i++){
        for(let j=0; j<index.length-1; j++){
          let v1 = p.createVector(detections.multiHandLandmarks[i][index[j]].x * p.width,
                                  detections.multiHandLandmarks[i][index[j]].y * p.height);
          let v2 = p.createVector(detections.multiHandLandmarks[i][index[j+1]].x * p.width,
                                  detections.multiHandLandmarks[i][index[j+1]].y * p.height);
          // let z = detections.multiHandLandmarks[i][index[j]].z;

    `       //  let v3 = p.createVector(50, v1.y);
          p.stroke(hue, 40, 255);
          p.line(v1.x, v1.y, v2.x, v2.y);

          p.line(50, v1.y, v1.x, v1.y);

          //let angleBetween = p.v2.angleBetween(v3);


        }
      }
    }*/



  /*  p.rotate = function()
    {
      let v0 = p.createVector(50, 50);

      let v1 = p.createVector(50, 0);

//      let angleBetween = v1.angleBetween(v2);

  //    angle = angleBetween;


}*/


}

let myp5 = new p5(sketch);
