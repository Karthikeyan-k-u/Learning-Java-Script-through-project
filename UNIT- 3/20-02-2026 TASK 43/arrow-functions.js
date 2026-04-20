const square = (x) => x * x;

function calculateSquare() {
    let num = Number(document.getElementById("num").value);

    document.getElementById("output").innerHTML =
        "Square: " + square(num);
}