var van=require("../../ansuzjs/lib/van.js");
var ode=require("../ode.js");
var baudio =require("baudio");

new baudio(function(t){
    return van.fix1(ode.wav.sin,440)(t);
}).play();
