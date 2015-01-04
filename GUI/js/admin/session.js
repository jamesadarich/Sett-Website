var sessionString = localStorage.getItem('session');

if (sessionString === null)
{
}

var session = JSON.parse(localStorage.getItem('session'));

function logOut() {
    localStorage.removeItem('session');
    window.location.replace("/admin/login.html");
}
