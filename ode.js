var ansuz=require("ansuz");
var ode={};

// wave functions...
// use dep annotations!

var tau=ode.tau=2*Math.PI;
var base=ode.base=12;

var sin=ode.sin=function(f,t){
  //[tau]
  return Math.sin(tau*t*f)-1;
};

var saw=ode.saw=function(f,t){
  return -1+2*(((t%(1/f))*f)%1);
};

var tri=ode.tri=function(f,t){
  return t/f-1;
};

var triangle=ode.triangle=function(f,t){
  var n=((t%(1/f))*f)%1;
  var s=Math.abs(Math.sin(t));
  return n<s?-1+(2*(2*(n/s))):1-(2*(2*(n/s)));
};

var sqr=ode.sqr=function(f,t){
  return ((t%(1/f))*f)%1>0.5?1:-1;
};

var square=ode.square=function(f,t){
  //[tau]
  return ((Math.sin(tau*t*f)>0.5)?1:0)-1;
};

var noise=ode.noise=function(t){
  return Math.random()*2-1;
};

/* Harmony functions */

var stel=ode.stel=function(n,b,c){
  // used for lydian
  return (n*c)%b;
};

var intervals=ode.intervals=function(A,b){
  //[base]
  var ivals=[];
  A.concat([b])
    .reduce(function(a,b){
      ivals.push(b,a);
      return b;
    });
  return ivals;
};

var sort=ode.sort=function(A){
  return A.slice(0).sort(function(a,b){return a-b;});
};

var modesOf=ode.modesOf=function(A,b){
  //[base,sort]
  return A.map(function(a){
    return ode.sort(A.map(function(x){
      return x-a;
    }).map(function(y){
      return (y<0)?y+b:y;
    }))
  });
};

/* voice functions */

var dyad=ode.dyad=function(f,g){
  return function(t){
    return f(t)+g(t);
  };
};

var chord=ode.chord=function(f,H){
  //[fix1]
  var temp=H.map(function(h){
    return ansuz.fix1(f,h);
  }).reduce(ode.dyad);

  var L=H.length;
  return function(t){
    return temp(t)/L;
  };
};

var mtof=ode.mtof=function(m){
  //[base]
  return 440*Math.pow(2,(m-69)/base);
};

var bpm=ode.bpm=function(bpm){
  return 1/(bpm/60);
};

/* beat functions */

var signif=ode.signif=function(I){
  //[log]
  return Math.floor(ansuz.log(I,2));
};

var clave=ode.clave=function(I,m){
  //[signif]
  var a=Math.floor(Math.pow(2,ode.signif(I))/2);
  var temp=[];
  m=(m===0)?0:m||2;
  while(a){
    temp.unshift(((a&I)?1:0)+m);
    a >>= 1;
  }
  return temp;
};

var fullClave=ode.fullClave=function(n){
  //[clave,flatten,fix1,range]
  return (n>2)?
    ansuz.flatten(
      clave(n,1)
        .map(ansuz.fix1(ansuz.range,0))
    ):[];
};

/* Engineering functions */

var ticker=ode.ticker=0.000022675736961451254;

var freaq=ode.freaq=function(base,freq,diff){
  return freq*Math.pow(2,diff/base);
};

var scale=ode.scale=function(f,a){
  return function(t){
    return f(t)*a;
  };
};

var clip=ode.clip=function(s,lim){
  lim=lim||1;
  var sign=(s<0)?-1:1;
  var v=(Math.abs(s)>lim)?lim:s;
  return v*sign;
};

var harp=ode.harp=function(chord,period,beats,f){
  //[range,ticker]
  period=Math.floor(period);
  return ansuz.range(0,period-1)
    .map(function(x){
      var temp=Math.floor((x*beats)/period)%beats;
      return f(x*ticker,chord[temp]);
    });
};

var emptySample=emptySampe=function(L){
  //[range,ticker]
  return ansuz.range(0,L-1)
    .map(function(i){
      return i*ticker;
    });
};

var interpolate=ode.interpolate=function(a,b,c){
  return (b-a)*c+a;
};

var stretch=ode.stretch=function(A,r){
  //[range]
  var L=Math.floor(A.length*r);
  var B=ansuz.range(0,L-1);
  return B.map(function(i){
    var p=i*r;
    return interpolate(
      Math.floor(p)
      ,Math.ceil(p)
      ,p%1
    );
  });
};

if(typeof module !== 'undefined')
  module.exports=ode;
