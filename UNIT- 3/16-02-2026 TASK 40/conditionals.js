function check() {

    let num = Number(document.getElementById("num").value);
    let result = "";

    if (num > 0) {
        result = "Positive";
    } else if (num < 0) {
        result = "Negative";
    } else {
        result = "Zero";
    }

    let day = 1;
    let dayName;

    switch(day) {
        case 1: dayName = "Monday"; break;
        case 2: dayName = "Tuesday"; break;
        default: dayName = "Other";
    }

    document.getElementById("output").innerHTML =
        result + "<br>Day: " + dayName;
}