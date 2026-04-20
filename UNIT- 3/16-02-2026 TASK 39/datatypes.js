function showData() {

    let text = "Hello";
    let num = 10;
    let flag = true;

    let a = 5, b = 2;

    let output =
        "String: " + text + "<br>" +
        "Number: " + num + "<br>" +
        "Boolean: " + flag + "<br><br>" +
        "Addition: " + (a + b) + "<br>" +
        "Multiplication: " + (a * b);

    document.getElementById("output").innerHTML = output;
}