function TabletBoundingBox(props) {
    let height = window.outerHeight - 10;
    let width = window.innerWidth;
    const SCREEN_RATIO = 1080 / 810; // iPad ratio

    // Get an iPad screen size
    if (width * SCREEN_RATIO > height) {
        width = height / SCREEN_RATIO;
    }
    else {
        height = width * SCREEN_RATIO;
    }

    return (
        <div id='tablet-bounding' style={{ height: height, width: width }}>
                {props.children}
        </div>
    );
}

export default TabletBoundingBox