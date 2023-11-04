import HamburgerMenu from './HamburgerMenu';

function Header(props) {
    let title = <h1 style={{ marginLeft: '10px', fontSize: '200%' }}>{props.title}</h1>;

    if (props.backToIndex) {
        title = <a href='/search.html' style={{ textDecoration: 'none', 'color': 'black' }}>{title}</a>
    }

    return (<>
        <header>
            {title}
            <HamburgerMenu/>
        </header>
       </>);

}

export default Header