//Array where the users will be stored
if (localStorage.regUsers === undefined) {
    localStorage.regUsers = "[]"
};

//Register function
function registerUser() {

    //Converting JSON strings to JavaScript strings
    regUsers = JSON.parse(localStorage.regUsers);

    //Define parameters 
    let registerUser = document.getElementById("newUser").value;
    let registerPassword = document.getElementById("newPassword").value;
    let registerEmail = document.getElementById("email").value;
    let registerDOB = document.getElementById("DOB").value;

    let newUser = {
        username: registerUser,
        password: registerPassword,
        email: registerEmail,
        DOB: registerDOB,
        topScore: 0
    };

    //Regex email format
    const mailFormat = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const passwordFormat = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    //Check for same username
    if (regUsers.find(user => user.username === registerUser)) {
        document.getElementById("feedbackReg").innerHTML = "<b>Username already taken!</b>";
        return
    };

    //Check username length
    if (registerUser.length < 4) {
        document.getElementById("feedbackReg").innerHTML = "<b>Username at least 4 characters long!</b>";
        return
    };

    //Check password length
    if (!passwordFormat.test(registerPassword)) {
        document.getElementById("feedbackReg").innerHTML = "<b>Password 8 or more charcaters, 1 uppercase and 1 special character!</b>";
        return
    };

    //Check for same email
    if (regUsers.find(user => user.email === registerEmail)) {
        document.getElementById("feedbackReg").innerHTML = "<b>Email already exists!</b>";
        return
    };

    //Check email format
    if (!mailFormat.test(registerEmail)) {
        document.getElementById("feedbackReg").innerHTML = "<b>Invalid email!</b>";
        return
    };

    //Check DOB 
    if (registerDOB == "") {
        document.getElementById("feedbackReg").innerHTML = "<b>DOB cannot be empty!</b>";
        return
    }

    //Push new user to local storage 
    regUsers.push(newUser);
    localStorage.regUsers = JSON.stringify(regUsers);

    window.location.href = "login.html"
}

//Login function
function login() {

    //Converting JSON strings to JavaScript strings
    let regUsers = JSON.parse(localStorage.regUsers);

    //Define paramteres
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    //Checks to see if the username and password input matches any usuers stored in local storage and outputs result
    for (i = 0; i < regUsers.length; i += 1) {
        if (username == regUsers[i].username && password == regUsers[i].password) {
            sessionStorage.loggedInUser = username;
            window.location.href = "game.html";
            return
        }
        if(username !== regUsers[i].username && password !== regUsers[i].password){
            document.getElementById("feedbackLog").innerHTML = "<b>Incorrect username or password.Don`t have an account? Please register.</b>";
        }
    };
}

//Check if user is logged in and loads rankings
window.onload = () => {
    if (sessionStorage.loggedInUser !== undefined) {
        document.getElementById("user").innerHTML = "Hello " + sessionStorage.loggedInUser + "!";
    }
    outputRankings();
}

//Logout function
function logout() {
    sessionStorage.loggedInUser = undefined;
}

//Update score
function updateScore(score) {
    let regUsers = JSON.parse(localStorage.regUsers)

    for (i = 0; i < regUsers.length; i += 1) {
        if (sessionStorage.loggedInUser === regUsers[i].username) {
            if (score > regUsers[i].topScore) {
                regUsers[i].topScore = score;
                localStorage.regUsers = JSON.stringify(regUsers);
            }
        }
    }
}

//Output rankings table
function outputRankings() {
    let table = "<table><tr><th>Name</th><th>Score</th></tr>";
    let regUsers = JSON.parse(localStorage.regUsers);

    for (i = 0; i < regUsers.length; i += 1) {
        table += "<tr><td>" + regUsers[i].username + "</td><td>" + regUsers[i].topScore + "</td></tr>";
    }

    table += "</table";
    document.getElementById("Rankings").innerHTML = table;
}





