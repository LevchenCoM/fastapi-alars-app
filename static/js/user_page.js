function getUserIdFromPath() {
    const url = window.location.pathname;
    const user_id = url.substring(url.lastIndexOf('/') + 1);

    return user_id;
}

function fetchUser() {
    const accessToken = getAccessTokenOrRedirect();

    fetch(`/api/users/${getUserIdFromPath()}`, {
        method: 'GET',
        headers: {
            'Authorization': accessToken ? 'Bearer ' + accessToken : ''
        },
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        }
    }).then(function (data) {
        const username = document.getElementById("username"),
            first_name = document.getElementById("first_name"),
            last_name = document.getElementById("last_name");

        username.value = data.username;
        first_name.value = data.first_name;
        last_name.value = data.last_name;
    });
}

function deleteUser(e) {
    const accessToken = getAccessTokenOrRedirect();

    fetch(`/api/users/${getUserIdFromPath()}`, {
        method: 'DELETE',
        headers: {
            'Authorization': accessToken ? 'Bearer ' + accessToken : ''
        },
    }).then(function (response) {
        if (response.ok) {
            window.location.href = '/';
        }
    })
}

function updateUser(e) {
    e.preventDefault();

    const accessToken = getAccessTokenOrRedirect(),
        username = document.getElementById("username").value,
        first_name = document.getElementById("first_name").value,
        last_name = document.getElementById("last_name").value;


    fetch(`/api/users/${getUserIdFromPath()}`, {
        method: 'PUT',
        headers: {
            'Authorization': accessToken ? 'Bearer ' + accessToken : '',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            first_name: first_name,
            last_name: last_name
        })
    }).then(function (response) {
        if (response.ok) {
            fetchUser();
        }
        return response.json()

    }).then(function (data) {
        const errors = document.getElementById("errors");

        errors.innerText = data && data.detail
    })
}

document.addEventListener('DOMContentLoaded', function () {
    fetchUser();
    document.getElementById("delete_user").addEventListener("click", deleteUser);
    document.getElementById("user_form").addEventListener("submit", updateUser);

    getCurrentUserData().then(
        function (data) {
            if (!data.is_admin) {
                document.getElementById("delete_user").style.display = 'none';
                document.getElementById("sumbit").style.display = 'none';

            }
        }
    )
});