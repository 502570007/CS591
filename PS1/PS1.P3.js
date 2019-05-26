const transfer = (str, func) => func(str);

const inputString = 'supercalifragilisticexpialidocious';

let broke = str => str.match(/(c[^c]*|[^c]*)/g);
let replaceA = str => {
    let ret = {};
    let count = 0;
    ret['originalString'] = str;
    ret['modifiedString'] = str.replace(/a/g, (sub,index) => {count++;return 'A'});
    ret['numberReplaced'] = count;
    ret['length']= str.length;
    return ret
};

console.log(`${transfer(inputString, broke)}`);
console.log(`${JSON.stringify(transfer(inputString, replaceA))}`);

(str,cb) => cb()