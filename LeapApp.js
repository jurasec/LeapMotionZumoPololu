var Leap = require("leapjs");
var express = require('express.io');
var routes = require('./routes');
var user = require('./routes/user');
var path = require('path');
var five = require("johnny-five"),
    board = new five.Board();

var app = express();
var controller = new Leap.Controller();

// For view the direction's animation => http://127.0.0.1:3000/ 
app.http().io();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.get('/users', user.list);


board.on('ready' , function(){

  motor1 = new five.Motor([10, 8]);
  motor2 = new five.Motor([9, 7]);

  // board.repl.inject({
  //   lmotor: motor1,
  //   rmotor: motor2,
  // });

  app.io.on('connection', function (socket){
      console.log(socket.id);
  });

  app.io.route('getMessages', function( req ){
      console.log("getMessages");
      app.io.broadcast('message', {users:'aaaaa'});
  });  

  controller.on('ready', function() {
      console.log("ready");
  });
  controller.on('connect', function() {
      console.log("connect");
  });
  controller.on('disconnect', function() {
      console.log("disconnect");
  });

  controller.connect();

  controller.on("frame", function(frame) { 

          hand = frame.hands[0];
          if ( hand ) {
              var hand = frame.hands[0];

              sphereRadius = Math.round(hand.sphereRadius);

              // Get current position for x, y, z
              x = (hand.palmPosition[0].toFixed(1));
              // y = (hand.palmPosition[1].toFixed(1));
              z = (hand.palmPosition[2].toFixed(1));

              // Round data
              x = Math.round(x);
              // y = Math.round(y);
              z = Math.round(z);              

              if(parseInt(sphereRadius)<40){
                  console.log(">> Deterse");
                  app.io.broadcast('stop', {data:'xxxxx'});
                  // fwd=0;
                  motor1.stop();
                  motor2.stop();
              }else{

                  if(x >= 50 && sphereRadius>40){
                      console.log(">> Right ============================= " + x);
                      app.io.broadcast('right', {data:'xxxxx'});
                      motor1.stop();
                      motor2.fwd();
                  }
                  else if(x <= -40 && sphereRadius>40){
                      console.log(">> Izquierda ============================= " + x);
                      app.io.broadcast('left', {data:'xxxxx'});
                      motor1.fwd();
                      motor2.stop();
                  }
                  

                  if(z >= 50 && sphereRadius>40){
                      console.log(">> Back");
                      app.io.broadcast('back', {data:'xxxxx'});
                      motor1.fwd();
                      motor2.fwd();
                  }
                  else if(z <= -40 && sphereRadius>40){
                      console.log(">> Forward");
                      app.io.broadcast('forward', {data:'xxxxx'});
                      motor1.rev();
                      motor2.rev();
                  }
              }
          } else {
              console.log(">> Look ma, no hands! Ok but seriously...put your hand up");
              app.io.broadcast('stop', {data:'xxxxx'});
          }   
  });

});

process.stdin.setRawMode(true);
process.stdin.resume();

app.listen(3000, function(){
    console.log("Server Express IO ready... ");
});