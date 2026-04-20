function calculate() {

    let a = Number(document.getElementById("num1").value);
    let b = Number(document.getElementById("num2").value);

    let result = add(a, b);

    document.getElementById("output").innerHTML =
        "Result: " + result;
}

function add(x, y) {
    return x + y;
}