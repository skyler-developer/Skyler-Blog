function setToken(token) {
    localStorage.setItem("token", token);
}
function getToken() {
    return localStorage.getItem("token");
}
function setRefreshToken(refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
}
function getRefreshToken() {
    return localStorage.getItem("refreshToken");
}

export { setToken, getToken, setRefreshToken, getRefreshToken };
