function logout(e) {
    window.localStorage.removeItem("access_token");
    window.location.href = '/auth'
}


document.addEventListener('DOMContentLoaded', function () {
    const accessToken = getAccessTokenOrRedirect();
    const table = document.getElementById("users_table")
    fetch("/api/users", {
            method: 'GET',
            headers: {
                'Authorization': accessToken ? 'Bearer ' + accessToken : ''
            },
        }).then(function (response) {
            if (response.ok) {
                return response.json();
            }
        }).then(function (data) {
            data.forEach(function(user) {
                let tr = document.createElement("tr"),
                    usernameTd = document.createElement("td"),
                    first_nameTd = document.createElement("td"),
                    last_nameTd = document.createElement("td"),
                    addUserBtnTd = document.createElement("td");

                usernameTd.innerText = user.username;
                first_nameTd.innerText = user.first_name;
                last_nameTd.innerText = user.last_name;
                addUserBtnTd.innerHTML = `<a href="/users/${user.id}"><button>View</button></a>`

                tr.appendChild(usernameTd);
                tr.appendChild(first_nameTd);
                tr.appendChild(last_nameTd);
                tr.appendChild(addUserBtnTd);
                table.appendChild(tr);
            })
        });

    document.getElementById("logout").addEventListener("click", logout);

    getCurrentUserData().then(
        function (data) {
            const userInfo = document.getElementById("user_info");
            userInfo.innerHTML = userInfo.innerHTML + data.username;

            if (!data.is_admin) {
                document.getElementById("create_user_action").style.display = 'none';
            }
        }
    )

});