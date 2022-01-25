function login(username, password) {

    // Option fetch data
    const fetchOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    // Post request for login
    return fetch(`${apiPathRoot}/api/v1/login`, fetchOption)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};