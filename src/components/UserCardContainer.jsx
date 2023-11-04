import userData from '../data/users.json'

import getCookie from '../functions/GetCookie'

function setCookie(name, value) {
    value = JSON.stringify(value)
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + (10 * 24 * 60 * 60 * 1000));
    const expires = "expires=" + expirationDate.toUTCString();
    document.cookie = name + "=" + value + "; " + expires + "; path=/";
}

function UserCardContainer() {
    let userDataCopy = userData;

    const UserSelect = (event) => {
        if (getCookie('userData')) {
            userDataCopy = getCookie('userData')
        }

        userDataCopy.Selected = event.target.id;

        setCookie('userData', userDataCopy)

        window.location.href = '/search.html'
    }

    return (
        <div className='UserCardContainer'>
            {userData.Users.map((user, index) => {
                return (<div>
                    <button id={index} onClick={UserSelect}>
                        <div id={index}>
                            <img id={index} src={user.Photo} />
                        </div>
                        <p id={index}>{user.UserName}</p>
                    </button>
                </div>)
            })}
        </div>
    )
}

export default UserCardContainer;