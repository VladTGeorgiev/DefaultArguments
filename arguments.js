function add(a, b) {
    return a + b
}

let defaultArguments = (passedInFunction, params) =>{
    let passedInFunctionString = String(passedInFunction);
    let functionArguments = passedInFunction.toString().replace(/^.*\(|\)(.|\s)*$/g, '');

    let functionArgumentsPlaceholders = functionArguments.match(/[a-z]/gi);

    const functionArgumentsObject = functionArgumentsPlaceholders.reduce((o, key) => Object.assign(o, {[key]: undefined}), {});

    let combinedObject = {...functionArgumentsObject, ...params}

    let newFunctionArguments = [];
    for(let [key, value] of Object.entries(combinedObject)) {
        let z = key
        let l = value
        let kk = `${z} ${l}`
        newFunctionArguments.push(kk);
    }
    let newFunctionArgumentsWithDefaultValues = newFunctionArguments.toString().replace(/\s+/g, '=');

    let passedInFunctionNamePlace = 2
    let newFunctionName = passedInFunctionString.match(new RegExp('^(?:\\w+\\W+){' + --passedInFunctionNamePlace + '}(\\w+)'));

    let newFunctionReturn = passedInFunctionString.match(new RegExp('(?<=return).*'));

    let newFunctionReturnArguments = newFunctionReturn[0].match(new RegExp('([^;]+)'));

    let newFunction = new Function("return " + 'function' + ' ' + newFunctionName[1] + '(' + newFunctionArgumentsWithDefaultValues + ')' + '{ return ' + newFunctionReturnArguments  +'; }')();
    return newFunction
}



const add2 = defaultArguments(add, { b:9 })

console.log(add2(10)) // => 19
console.log(add2(10, 7)) // => 17
console.log(add2()) // NaN

const add3 = defaultArguments(add2, { b: 3, a: 2})

console.log(add3(10)) // => 13
console.log(add3()) // => 5
console.log(add3(undefined, 10)) // => 12

const add4 = defaultArguments(add, { c: 3})

console.log(add4(10))// NaN
console.log(add4(10, 10)) // => 20
