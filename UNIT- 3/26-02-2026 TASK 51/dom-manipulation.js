function changeStyle() {
    let h = document.getElementById("heading");

    h.classList.toggle("highlight");
}

function addText() {
    document.getElementById("output").innerHTML += "New Text Added<br>";
}