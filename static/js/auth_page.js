document.addEventListener('DOMContentLoaded', function () {
    const submitBtn = document.getElementById("submit-btn"),
        form = document.getElementById("auth-form");


    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value,
            password = document.getElementById("password").value;

        const formData = [
            encodeURIComponent("username") + '=' + encodeURIComponent(username),
            encodeURIComponent("password") + '=' + encodeURIComponent(password)
        ].join('&');

        fetch("/api/token", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        }).then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                alert("Не верный username или password");
            }
        }).then(function (data) {
            window.localStorage.setItem("access_token", data.access_token);
            window.location.href = '/';
        })

    });
})

