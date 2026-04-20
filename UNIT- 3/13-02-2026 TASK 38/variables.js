function showVariables() {

    // Different types of variables
    var message = "Using var";
    let number = 25;
    const status = "Active";

    let outputText =
        "Var: " + message + "<br>" +
        "Let: " + number + "<br>" +
        "Const: " + status;

    document.getElementById("output").innerHTML = outputText;

    console.log(message, number, status);
}