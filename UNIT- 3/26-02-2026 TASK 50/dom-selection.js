function selectItems() {

    let items = document.getElementsByClassName("text");
    let output = "";

    for (let i = 0; i < items.length; i++) {
        output += items[i].innerHTML + "<br>";
    }

    document.getElementById("output").innerHTML = output;
}