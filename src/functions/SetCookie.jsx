function setCookie(name, value) {
    value = JSON.stringify(value)
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + (10 * 24 * 60 * 60 * 1000));
    const expires = "expires=" + expirationDate.toUTCString();
    document.cookie = name + "=" + value + "; " + expires + "; path=/";
}

export default setCookie