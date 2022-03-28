/* 
Simple calculator. 
Isn't quite right as it doesn't account for operator precedence. 
(might wan't to consider Reverse Polish as a fix?)
*/

const parseEquation = (equation) => {
    const operands = equation.match(/\d+/g);
    const operators = equation.match(/[+-/*^]/g);
    return { 
        operands: operands,
        operators: operators
    }
}

const calculation = (operands, operators) => {

    // console.log('calculation', operands, operators, operands.length, operators.length)
    if(!operands.length || !operators.length || (operands.length !== operators.length + 1)) {
        return null
    }

    let answer =  Number(operands[0]);
    for (let i = 1; i < operands.length; i++) {

        //console.log('pre', answer, operands[i], operators[i - 1])

        switch (operators[i - 1]) {
            case '+':
                answer = answer + Number(operands[i]);
                break; 
            case '-':
                answer = answer - Number(operands[i]);
                break;   
            case '/':
                answer = answer / Number(operands[i]);
                break;      
            case '*':
                answer = answer * Number(operands[i]);
                break;       
            case '^':
                answer = Math.pow(answer, Number(operands[i]));
                break;              
            default:
                break;
        }

        // console.log('post', answer, operands[i], operators[i - 1])
    }

    return answer;
}

const calculate = (equation) => {
    // console.log('this', equation)
    const parsed = parseEquation(equation)
    if ( parsed.operands && parsed.operators ) {
        return calculation(parsed.operands, parsed.operators);
    }
    return null
}

module.exports = calculate
