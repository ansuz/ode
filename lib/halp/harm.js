/* Harmony stuff */

// take a note, its harmonic base, and a coprime, return its stellation
hum.stel = function(n,b,c){
    return (n*c)%b;
};

hum.lydier = function(n){
    return (n*7)%12;
};

hum.intervalsOf = function(A,b){
    var intervals = [];
    A.concat([b])
        .reduce(function(a,b){
        intervals.push(b-a);
        return b;
    });
    return intervals;
};

// take:
//   an array of numbers 'A'
//   a base 'b'
// return:
//   all permutations of the sequence
hum.modesOf = function(A,b){
    return A.map(function(a){
        return hum.sort(A.map(function(x){
            return x-a;
        })
        .map(function(y){
            return (y<0)?y+b:y;
    }));
});
};

hum.sort = function(A){
    var temp = A.slice();
    return temp.sort(function(a,b){return a-b;});
};

// produce a function which adds together two 'voices'
// you will probably want to divide the result by two ;)
hum.dyad = function(f,g){
    return function(t){
        return f(t)+g(t);
    };
};

// take a 'voice' in the form of a function, and 'H', a list of harmonies
// return a new function which plays those harmonies as a chord, using the 'voice'
hum.chord = function(F,H){
    var temp = H.map(function(f){
//        console.log("sine(%s)",f);
        return van.fix1(F,f);
    }).reduce(hum.dyad);

    var L = H.length;
    return function(t){
        return temp(t)/L;
    };
};

