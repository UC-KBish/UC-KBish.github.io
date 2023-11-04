import userData from '../data/users.json'

import getCookie from '../functions/GetCookie'

import '../styles/Hamburger.css' 

function ListItem(props) {
    return (
    <li className='hamburger-list-li'>
        <a href={props.href}>
            <div className='flex'>
                <p>{props.text}</p>
                <img src={props.src}></img>
            </div>
        </a>
    </li>
    )
}

function HamburgerMenu() {
    const handleClick = () => {
        const menu = document.getElementById('menu');
        const menu_button = document.getElementById('menu-button');
        const menu_button_back = document.getElementById('menu-button-back');
        const blur_screen = document.getElementById('blur-screen');

        const tablet_bounding = document.getElementById('tablet-bounding')
        menu.style.width = parseInt(tablet_bounding.style.width) * 0.4 + 'px';

        if (menu.style.left === '60%') {
            menu.style.left = '100%';
            menu_button.style.right = '0.5rem';
            menu_button_back.style.right = '-2rem';
            blur_screen.style.top = '-100vh';
            blur_screen.style.backdropFilter = 'blur(0px)';
            blur_screen.style.backgroundColor = '#ffffff00';
        } else {
            menu.style.left = '60%';
            menu_button.style.right = '2.5rem';
            menu_button_back.style.right = '0.5rem';
            blur_screen.style.top = '0vh';
            blur_screen.style.backdropFilter = 'blur(5px)';
            blur_screen.style.backgroundColor = '#ffffff70';
        }
    };

    let userDataCopy = userData

    if (getCookie('userData')) {
        userDataCopy = getCookie('userData')
    }

    let user = userDataCopy.Users[parseInt(userDataCopy.Selected)]

    return (<div id='HamburgerContainer'>
        <div id='blur-screen' className='blur'></div>
        <div id='menu'>
            <a id='UserContainer' href='/'>
                <img id='UserPhoto' src={user.Photo} />
                <h3 id='UserName'>{user.UserName}</h3>
            </a>
            <ul id='hamburger-list'>
                <ListItem text='Search' href='/search.html' src='Search.png'/>
                <ListItem text='Saved' href='/saved.html' src='SaveForLaterFalse.png'/>
                <ListItem text='Completed' href='/completed.html' src='Finish.png'/>
            </ul>
        </div>
        <button id="menu-button" onClick={handleClick}>
            <img src='HamburgerMenu.png' />
        </button>
        <button id="menu-button-back" onClick={handleClick}>
            <img src='ArrowBack.png' />
        </button>
    </div>);
}

export default HamburgerMenu;