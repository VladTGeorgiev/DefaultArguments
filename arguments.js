function add(a, b) {
    return a + b;
}

// let string = add.toString()

// console.log(string)

let defaultArguments = (add, { a: 4, b: 6 }) =>{
    console.log(add.toString())
}

defaultArguments()

// function myFunction(arg) {
//     alert(arg.var1 + ' ' + arg.var2 + ' ' + arg.var3);
// }

myFunction ({ var1: "Option 1", var2: "Option 2", var3: "Option 3" });