function showArray() {

    let items = ["HTML", "CSS", "JavaScript"];

    let output = "";

    for (let i = 0; i < items.length; i++) {
        output += items[i] + "<br>";
    }

    document.getElementById("output").innerHTML = output;
}