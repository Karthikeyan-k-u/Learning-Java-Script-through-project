function changeText() {
    document.getElementById("title").innerHTML = "Clicked!";
}

function changeColor() {
    document.getElementById("title").style.color = "yellow";
}

function showName() {
    let name = document.getElementById("name").value;

    document.getElementById("output").innerHTML =
        "Hello, " + name;
}