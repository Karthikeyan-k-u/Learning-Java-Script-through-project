function showDetails() {

    let user = {
        name: "User",
        age: 21,
        marks: {
            math: 90,
            science: 85
        },
        greet: function () {
            return "Hello " + this.name;
        }
    };

    document.getElementById("output").innerHTML =
        user.greet() + "<br>" +
        "Math: " + user.marks.math + "<br>" +
        "Science: " + user.marks.science;
}