function checkScope() {
    let message = "Local Scope Variable";

    document.getElementById("output").innerHTML = message;
}

// Closure
function outer() {
    let count = 0;

    return function () {
        count++;
        return count;
    };
}

const counter = outer();

function runClosure() {
    document.getElementById("output").innerHTML =
        "Count: " + counter();
}