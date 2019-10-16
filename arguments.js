function add(a, b) {
    return a + b;
}

let defaultArguments = (fn, params) =>{
    let fnString = String(fn)
    let x = params.a || 0
    let y = params.b || 0
    let n = 2
    var name = fnString.match(new RegExp('^(?:\\w+\\W+){' + --n + '}(\\w+)'));
    console.log(name[1])
    var func = new Function("return " + 'function' + ' ' + name[1] + `(a = ${x}, b = ${y}) { return a + b; }`)();
    return func
}

const add2 = defaultArguments(add, { b:9 })

console.log(add2(10))
console.log(add2(10, 7))
console.log(add2())

const add3 = defaultArguments(add2, { b: 3, a: 2})

console.log(add3(10))
console.log(add3())
console.log(add3(undefined, 10))

const add4 = defaultArguments(add3, { c: 3})

console.log(add3(10))
console.log(add3(10, 10))
