
const evaluate = exp => {
    let op = exp.charAt(1);
    switch (op) {
        case '+':
            return e2 => (e2.charAt(0) - '0') + (e2.charAt(2) - '0');
        case '-':
            return e2 => (e2.charAt(0) - '0') - (e2.charAt(2) - '0');
        case '*':
            return e2 => (e2.charAt(0) - '0') * (e2.charAt(2) - '0');
        case '/':
            return e2 => (e2.charAt(0) - '0') / (e2.charAt(2) - '0');
    }
};

const expression = '8-3';
let operator = evaluate(expression);
console.log(`${expression} = ${operator(expression)}`);
