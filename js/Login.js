var email = document.getElementById('email');
var password = document.getElementById('password');
var btn = document.getElementsByTagName('button')[0];
var mySpan = document.getElementsByTagName('span');
var flag = 0;
var RegEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


btn.addEventListener("click", function (e) {
    e.preventDefault();

    if (email.value == '') {
        mySpan[0].innerHTML = '*required';

    } else if (!email.value.match(RegEmail)) {
        email.value = '';
        mySpan[0].innerHTML = "  Your Email is Not Valid";

    } else {
        flag++;
    }


    if (password.value == '') {
        mySpan[1].innerHTML = '*required';

    } else if (password.value.length < 8) 
    {
        password.value = '';
        mySpan[1].innerHTML = "  You Entered invalid Password!";

    } 
    else 
    {
        flag++;
    }


    if (flag >= 2)
    {
        if ((getCookie('email') == email.value) && (getCookie('password') == password.value))
        {
            location.replace("quiz.html?Name="+getCookie('fname'));

        } 
        else {
            email.value = '';
            password.value = '';
            mySpan[0].innerHTML = "  You have to register!";
        }
    }

});

//get Cookies Function
function getCookie(cookieName) {
    if (arguments.length == 1) {
        var x = document.cookie.split(";");

        for (var i = 0; i < x.length; i++) {
            if (x[i].split("=")[0].trim() == cookieName.trim()) {
                console.log(x[i].split("=")[1]);
                return x[i].split("=")[1]
            }
        }

    } else {
        throw ("You MUST Enter 1 parameter");
    }
}
