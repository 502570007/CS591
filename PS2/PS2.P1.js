let fibonacci = function *() {
    yield 0;
    yield 1;
    let a = 0;
    let b = 1;
    while(true){
        let c = a + b;
        a = b;
        b = c;
        yield c;
    }
};

let evenFibonacci = function *() {
    let g = fibonacci();
    while(true){
        let p = g.next();
        if ( p.value % 2 == 0)
            yield p.value;
    }
};

let evenG = evenFibonacci();
for(let i = 0; i< 5; ++i){
    console.log(evenG.next().value);
}


