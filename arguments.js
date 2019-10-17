function add(a, b) {
    return a + b
}

const defaultArguments = (passedInFunction, params) => {
    const passedInFunctionString = String(passedInFunction);

    const functionArguments = passedInFunction.toString().replace(/^.*\(|\)(.|\s)*$/g, '');
    const functionArgumentsArray = functionArguments.split(',');
    const functionArgumentsArrayExcludingOldArguments = functionArgumentsArray.map(el => el.match(/^[^=]+/));
    const functionArgumentsPlaceholders = functionArgumentsArrayExcludingOldArguments.map(el => el[0]).toString().match(/[a-z]/gi);
    const functionArgumentsObject = functionArgumentsPlaceholders.reduce((o, key) => Object.assign(o, {
        [key]: undefined
    }), {});

    const combinedObject = {
        ...functionArgumentsObject,
        ...params
    };

    const newFunctionArguments = [];
    for (let [key, value] of Object.entries(combinedObject)) {
        const combined = `${key} ${value}`
        newFunctionArguments.push(combined);
    };
    const newFunctionArgumentsWithDefaultValues = newFunctionArguments.toString().replace(/\s+/g, '=');

    let passedInFunctionNamePlace = 2
    const newFunctionName = passedInFunctionString.match(new RegExp('^(?:\\w+\\W+){' + --passedInFunctionNamePlace + '}(\\w+)'));

    const newFunctionReturn = passedInFunctionString.match(new RegExp('(?<=return).*'));
    const newFunctionReturnArguments = newFunctionReturn[0].match(new RegExp('([^;]+)'));

    const newFunction = new Function("return " + 'function' + ' ' + newFunctionName[1] + '(' + newFunctionArgumentsWithDefaultValues + ')' + '{ return ' + newFunctionReturnArguments + '; }')();

    return newFunction
}


const add2 = defaultArguments(add, {
    b: 9
})

console.log(add2(10)) // => 19
console.log(add2(10, 7)) // => 17
console.log(add2()) // NaN


const add3 = defaultArguments(add2, {
    b: 3,
    a: 2
})

console.log(add3(10)) // => 13
console.log(add3()) // => 5
console.log(add3(undefined, 10)) // => 12


const add4 = defaultArguments(add, {
    c: 3
})

console.log(add4(10)) // NaN
console.log(add4(10, 10)) // => 20
