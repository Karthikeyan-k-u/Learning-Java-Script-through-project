function showObject() {

    let user = {
        name: "User",
        age: 21,
        course: "CSE"
    };

    document.getElementById("output").innerHTML =
        "Name: " + user.name + "<br>" +
        "Age: " + user.age + "<br>" +
        "Course: " + user.course;
}