$(document).ready(function(){
    /**
    * Socket.io comunication
    */

    window.io = io.connect();

    io.on('connect', function(socket){
        console.log('hi');
        io.emit('getMessages');
    });

    io.on('message', function(data){
        console.log('message');
        // console.log(data);
    });

    io.on('forward', function(data){
        console.log('key up');
        // console.log(data);
        $('#up-btn').toggleClass('btn-success');
        $('#down-btn').addClass('btn-primary').removeClass('btn-success');
        $('#left-btn').addClass('btn-primary').removeClass('btn-success');
        $('#right-btn').addClass('btn-primary').removeClass('btn-success');
        $('#stop-btn').addClass('btn btn-danger btn-lg icon-close');
    });

    io.on('back', function(data){
        console.log('key down');
        // console.log(data);
        $('#down-btn').toggleClass('btn-success');
        $('#up-btn').addClass('btn-primary').removeClass('btn-success');
        $('#left-btn').addClass('btn-primary').removeClass('btn-success');
        $('#right-btn').addClass('btn-primary').removeClass('btn-success');
        $('#stop-btn').addClass('btn btn-danger btn-lg icon-close');
    });

    io.on('left', function(data){
        console.log('key left');
        // console.log(data);
        $('#left-btn').toggleClass('btn-success');
        $('#up-btn').addClass('btn-primary').removeClass('btn-success');
        $('#down-btn').addClass('btn-primary').removeClass('btn-success');
        $('#right-btn').addClass('btn-primary').removeClass('btn-success');
        $('#stop-btn').addClass('btn btn-danger btn-lg icon-close');
    });

    io.on('right', function(data){
        console.log('key right');
        // console.log(data);
        $('#right-btn').toggleClass('btn-success');
        $('#up-btn').addClass('btn-primary').removeClass('btn-success');
        $('#down-btn').addClass('btn-primary').removeClass('btn-success');
        $('#left-btn').addClass('btn-primary').removeClass('btn-success');
        $('#stop-btn').addClass('btn btn-danger btn-lg icon-close');
    });

    io.on('stop', function(data){
        console.log('key stop');
        // console.log(data);
        $('#stop-btn').addClass('btn-success').removeClass('btn-danger');
        $('#up-btn').addClass('btn-primary').removeClass('btn-success');
        $('#down-btn').addClass('btn-primary').removeClass('btn-success');
        $('#left-btn').addClass('btn-primary').removeClass('btn-success');
        $('#right-btn').addClass('btn-primary').removeClass('btn-success');
    });

    /*****  Button events *****/

    // $('#up-btn').click(function () {
    //     var btn = $(this)
    //     console.log("click btn up");
    //     io.emit('fwd');
    // });

    // $('#down-btn').click(function () {
    //     var btn = $(this)
    //     console.log("click btn down");
    //     io.emit('rev');
    // });

    // $('#left-btn').click(function () {
    //     var btn = $(this)
    //     console.log("click btn left");
    //     io.emit('left');
    // });

    // $('#right-btn').click(function () {
    //     var btn = $(this)
    //     console.log("click btn right");
    //     io.emit('right');
    // });

    // $('#stop-btn').click(function () {
    //     var btn = $(this)
    //     console.log("click btn stop");
    //     io.emit('stop');
    // });

});