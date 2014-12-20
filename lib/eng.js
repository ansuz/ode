/*  Audio engineering functions..
    like scaling.. mixing, etc.

var tickr = 0.000022675736961451254;
var eng={};

eng.freaq = function(base,freq,diff){
    return freq*Math.pow(2,diff/base);
};

eng.scale=function(f,a){
  return function(t){
    return f(t)*a;
  };
};

// hard limiter, optionally takes a value other than 1 as its limit
eng.clip = function(s,lim){
    lim=lim||1;
    // preserve sign information
    var sign=1;
    if(s<0){
        sign=-1;
    }
    var v = (Math.abs(s)>lim)?lim:s;
    return v*sign;
};

/* SAMPLE things */

// take a list of frequencies, a period, a number of beats, and a function
// return an array filled with precomputed values for use as a 'arpeggiated sample'
eng.harp = function(chord,period,beats,f){
//    console.log(chord);
    period = Math.floor(period);
    return van.range(0,period-1)
       .map(function(x){
           var temp = Math.floor((x*beats)/period)%beats;
           return f(x*tickr,chord[temp]);
       });
};

eng.emptySample = function(L){
    return van.range(0,L-1)
        .map(function(i){
            return i*tickr;
        });
};

// for filling in the gaps between elements in an array
// a and b are points, c is a value between zero and one, the fractional part of an inexact index.
// ie. if A = [2,8]

// quadratic interpolation
eng.interpolate = function(a,b,c){
    return (b-a)*c+a;
//    return a+Math.pow(b-a,c);
};

eng.stretch = function(A,r){
    var L = Math.floor(A.length*r);
    var B = van.range(0,L-1);
    return B.map(function(i){
  var p = i*r;
  return eng.interpolate(
    Math.floor(p)
    ,Math.ceil(p)
    ,p%1);
  });
};


module.exports=eng;
