var form = document.getElementById("myForm");
var fname = document.getElementById("fname");
var lname = document.getElementById("lname");
var email = document.getElementById("email");
var password = document.getElementById("pass");
var repass = document.getElementById("repass");
var btn = document.getElementsByTagName("button")[0];
var mySpan = document.getElementsByTagName('span');
// var flag = 0;
var letters = /^[A-Za-z]+$/;
var RegEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


btn.addEventListener("click", function (e) {
    e.preventDefault();
    var flag = 0;  //To be assigned with 0 every time

    if (fname.value == '') {
        mySpan[0].innerHTML = '*required';

    } else if (!fname.value.match(letters)) {
        fname.value = '';
        mySpan[0].innerHTML = "  Only Letters Allowed!";

    } else {
        flag++;
    }


    if (lname.value == '') {
        mySpan[1].innerHTML = '*required';

    } else if (!lname.value.match(letters)) {
        lname.value = '';
        mySpan[1].innerHTML = "  Only Letters Allowed!";

    } else {
        flag++;
    }


    if (email.value == '') {
        mySpan[2].innerHTML = '*required';

    } else if (!email.value.match(RegEmail)) {
        email.value = '';
        mySpan[2].innerHTML = "  Your Email should be like anything@anything.anything";

    } else {
        flag++;
    }


    if (password.value == '') {
        mySpan[3].innerHTML = '*required';

    } else if (password.value.length < 8) {
        password.value = '';
        mySpan[3].innerHTML = "  Your Password should be of length 8 or greater!";

    } else {
        flag++;
    }


    if (repass.value == '') {
        mySpan[4].innerHTML = '*required';

    } else if (repass.value !== password.value) {
        repass.value = '';
        mySpan[4].innerHTML = "  Your Password in two fields are not matched";

    } else {
        flag++;
    }


    if (flag >= 5) {
        setCookie("fname", fname.value, d);
        setCookie("lname", lname.value, d);
        setCookie("email", email.value, d);
        setCookie("password", password.value, d);
        setCookie("repass", repass.value, d);

        location.replace("Login.html");
    }
});

//set cookies Function 
var d = new Date();

function setCookie(cookieName, cookieValue, expiryDate) {
    if (arguments.length == 3) {
        document.cookie = cookieName + "=" + cookieValue + ";" + expiryDate;
    } else {
        throw ("You Must Enter 3 parameters");
    }
}
