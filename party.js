/*********************************************
Just havin' a game of daytime nighttime.
*********************************************/

// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

var tessel = require('tessel');
var ambient = require("ambient-attx4").use(tessel.port('C'));
var audio = require('audio-vs1053b').use(tessel.port('D'));
var fs = require('fs');

var dayAudio = fs.createReadStream('/app/Daytime.mp3');
var nightAudio = fs.createReadStream('/app/Nighttime.mp3');

var dayTrigger = 0.02;

ambient.on('ready', function () {
    audio.on('ready', function () {

        // Get a stream of light data
        setInterval(function() {
            ambient.getLightLevel(function(err, data) {

                audio.setVolume(20,20, function () {
                    if (data > dayTrigger) {
                        console.log("Daytime:", data);
                        dayAudio.pipe(audio.createPlayStream());
                    } else {
                      console.log("Nighttttime:", data);
                      nightAudio.pipe(audio.createPlayStream());;
                    }
                });
    
            });
        }, 10000);
    });
});