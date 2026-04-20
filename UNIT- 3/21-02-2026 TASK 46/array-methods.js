function runMethods() {

    let numbers = [1, 2, 3];

    numbers.push(4); // add
    numbers.pop();   // remove last

    let doubled = numbers.map(n => n * 2);

    document.getElementById("output").innerHTML =
        "Array: " + numbers + "<br>" +
        "Doubled: " + doubled;
}