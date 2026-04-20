function run() {

    let output = "";

    // for loop
    for (let i = 1; i <= 5; i++) {
        output += i + " ";
    }

    output += "<br>";

    // while loop
    let j = 1;
    while (j <= 5) {
        output += j + " ";
        j++;
    }

    output += "<br>";

    // do-while
    let k = 1;
    do {
        output += k + " ";
        k++;
    } while (k <= 5);

    document.getElementById("output").innerHTML = output;
}