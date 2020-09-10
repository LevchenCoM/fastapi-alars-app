function createUser(e) {
    e.preventDefault();

    const accessToken = getAccessTokenOrRedirect(),
        username = document.getElementById("username").value,
        first_name = document.getElementById("first_name").value,
        last_name = document.getElementById("last_name").value,
        password = document.getElementById("password").value;


    fetch("/api/users", {
        method: 'POST',
        headers: {
            'Authorization': accessToken ? 'Bearer ' + accessToken : '',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            first_name: first_name,
            last_name: last_name,
            password: password
        })
    }).then(function (response) {
        if (response.ok) {
            window.location.href = '/';
        }
    })
}

document.addEventListener('DOMContentLoaded', function () {
    getAccessTokenOrRedirect();
    document.getElementById("user_form").addEventListener("submit", createUser);
});