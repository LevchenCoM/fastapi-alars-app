function getAccessTokenOrRedirect() {
    const token = window.localStorage.getItem("access_token")
    if (token) {
        return token
    } else {
        window.location.href = '/auth'
    }
}

async function getCurrentUserData() {
    const accessToken = getAccessTokenOrRedirect();
    const response =  await fetch("/api/me", {
        method: 'GET',
        headers: {
            'Authorization': accessToken ? 'Bearer ' + accessToken : '',
            'Content-Type': 'application/json'
        }
    })

    return await response.json();
}
