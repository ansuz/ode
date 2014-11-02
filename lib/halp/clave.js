var clave={};

/* Beat stuff */

// find the most significant bit of an integer (the sign bit for a clave)
hum.signif = function(I){
    return Math.floor(syrup.bops['//'](I,2));
};

// take an integer code, return an array containing its bits
// excludes the sign bit (necessarily)
// optionally adds a value 'm' to each element

hum.clave = clave = function(I,m){
  var a=Math.floor(Math.pow(2,hum.signif(I))/2);
  var temp=[];
  m=(m===0)?0:m||2;
  while(a){
    temp.unshift(((a&I)?1:0)+m);
    a >>= 1;
  };
  return temp;
};

// accept an integer code, convert it into an array of 2s and 3s
// 'count' through those values of 2s and 3s, yielding a rhythmic structure
hum.fullClave = function(n){
  return (n>2)?
    clave(n,1).map(van.fix1(van.range,0)).reduce(function(a,b){return a.concat(b);}):
    [];
};

