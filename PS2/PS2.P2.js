let wordList = function *(str) {
    let words = str.split(/\s/g);
    for (let idx in words){
        yield words[idx];
    }
}

let g = wordList('All I know is something like a bird within her sang');
while(true){
    let e = g.next();
    if(e.done){
        break;
    }
    console.log(e.value);
}
