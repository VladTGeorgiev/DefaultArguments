function add(a, b) {
    return a + b;
}

let defaultArguments = (fn, params) =>{
    let fnString = String(fn)
    let functionArguments = fn.toString().replace(/^.*\(|\)(.|\s)*$/g, '');

    let functionArgumentsPlaceholders = functionArguments.match(/[a-z]/gi)

    const functionArgumentsObject = functionArgumentsPlaceholders.reduce((o, key) => Object.assign(o, {[key]: 0}), {});

    let combinedObject = {...functionArgumentsObject, ...params}

    let newFunctionArguments = []
    for(let [key, value] of Object.entries(combinedObject)) {
        let z = key
        let l = value
        let kk = `${z} ${l}`
        newFunctionArguments.push(kk)
    }
    let newFunctionArgumentsWithDefaultValues = newFunctionArguments.toString().replace(/\s+/g, '=')

    let c = functionArgumentsPlaceholders.toString().replace(',', '+')
// console.log(c)

    let n = 2
    let newFunctionName = fnString.match(new RegExp('^(?:\\w+\\W+){' + --n + '}(\\w+)'));
    let func = new Function("return " + 'function' + ' ' + newFunctionName[1] + '(' + newFunctionArgumentsWithDefaultValues + ')' + '{ return ' + c  +'; }')();
    return func
}



const add2 = defaultArguments(add, { b:9 })

console.log(add2(10)) // => 19
console.log(add2(10, 7)) // => 17
console.log(add2())

const add3 = defaultArguments(add2, { b: 3, a: 2})

console.log(add3(10)) // => 13
console.log(add3()) // => 5
console.log(add3(undefined, 10)) // => 12

const add4 = defaultArguments(add, { c: 3})

console.log(add4(10))// => 10
console.log(add4(10, 10)) // => 20
