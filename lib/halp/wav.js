var wav={};

var tau=2*Math.PI;

wav.sin=function(f,t){
  return Math.sin(tau*t*f)-1;
};

wav.saw=function(f,t){
  var n=((t%(1/f))*f)%1; // could be factored..
  return -1+2*n;
};

wav.tri=function(f,t){ // these args might need to be swapped
  return t/f-1;
};

wav.triangle = function(t,f){
    var n = ((t%(1/f))*f)%1;
    return n<0.5?4*n-1:1-4*2;
};

wav.triangle_s = function(t, f) {
    var n = ((t % (1 / f)) * f) % 1; // n = [0 -> 1]
    var s = Math.abs(Math.sin(t));
    return n < s ? -1 + (2 * (2 * (n / s))) : 1 - (2 * (2 * (n / s)))
};

// a square wave generator
wav.sqr = function (t, f) {
    return ((t % (1 / f)) * f) % 1 > 0.5 ? 1 : -1;
};

// a different square wave generator
wav.square = function(f,t){
    return ((Math.sin(tau*t*f) > 0.5)?1:0)-1;
};

// white noise generator
wav.noise = function(t){
    return Math.random()*2-1;
};

module.exports=wav;
