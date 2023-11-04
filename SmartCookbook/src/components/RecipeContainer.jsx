import recipeData from '../data/recipes.json'
import userData from '../data/users.json'

import getCookie from '../functions/GetCookie'
import setCookie from '../functions/SetCookie'

function RecipeBottomBanner(props) {
    let userData = getCookie('userData')

    const handleClick = (event) => {
        userData = getCookie('userData')

        if (event.target.src == window.location.href.replace(window.location.pathname, '') + '/SaveForLaterTrue.png') {
            event.target.src = 'SaveForLaterFalse.png'

            // console.log(userData.Users[userData.Selected]["Saved Recipes"]);
            userData.Users[userData.Selected]["Saved Recipes"].splice(userData.Users[userData.Selected]["Saved Recipes"].indexOf(event.target.id.replace('save-for-later-', '')), 1)
            // console.log(userData.Users[userData.Selected]["Saved Recipes"]);


        } else {
            event.target.src = 'SaveForLaterTrue.png'

            userData.Users[userData.Selected]["Saved Recipes"].push(event.target.id.replace('save-for-later-', ''))
            // console.log(userData.Users[userData.Selected]["Saved Recipes"]);

        }

        setCookie('userData', userData)


    }

    let stars = []
    let starCount = recipeData[parseInt(props.id)].RatingVal

    for (let i = 0; i < 5; i++) {
        if (starCount > 0.75) {
            stars.push(<img src="star-full.png" style={{ height: '1.5rem', marginTop: '0.75rem' }}></img>)
        } else if (starCount > 0.25) {
            stars.push(<img src="star-half.png" style={{ height: '1.5rem', marginTop: '0.75rem' }}></img>)
        } else {
            stars.push(<img src="star-empty.png" style={{ height: '1.5rem', marginTop: '0.75rem' }}></img>)
        }
        starCount--;
    }

    return (
        <div style={{ backgroundColor: '#e8e8e8', width: '100%', bottom: '0' }}>
            <div className="flex">
                {stars}

                <p>{recipeData[parseInt(props.id)].hasOwnProperty("Ratings") ? '(' + recipeData[parseInt(props.id)].Ratings + ')' : '(0)'}</p>


                <button id={'save-for-later-button-' + props.id} className='save-for-later-button' onClick={handleClick}>
                    <img id={'save-for-later-' + props.id} class='save-for-later' src={(userData.Users[parseInt(userData.Selected)]["Saved Recipes"].indexOf(props.id.toString()) != -1) ? "SaveForLaterTrue.png" : "SaveForLaterFalse.png"}></img>
                </button>
            </div>
        </div>
    )
}

function RecipeCard(props) {

    return (

        <div className='RecipeCard' id={'recipe-' + props.id}>
            <a href='/burger.html' style={{ textDecoration: 'none', color: 'black' }}>
                <h3 style={{ padding: '10px', margin: 0 }}>{props.name}</h3>
                <img src={props.imageName} style={{ width: '90%', margin: '5%', borderRadius: '5px' }}></img>
            </a>

            <RecipeBottomBanner id={props.id} />

        </div>
    );
}

function RecipeContainer(props) {
    let left = []
    let right = []
    let column = 0;

    let userDataCopy = userData;

    if (getCookie('userData')) {
        userDataCopy = getCookie('userData')
    }

    let sortFunc = () => {
        return true;
    }

    if (props.sort) {
        if (props.sort === 'saved') {
            sortFunc = (index) => {
                return (userDataCopy.Users[userDataCopy.Selected]["Saved Recipes"].indexOf(index.toString()) != -1)
            }
        } else if (props.sort === 'completed') {
            sortFunc = (index) => {
                return (userDataCopy.Users[userDataCopy.Selected]["Completed Recipes"].indexOf(index.toString()) != -1)
            }
        }
    }

    let empty = true

    recipeData.map((recipe, index) => {
        if (sortFunc(index)) {
            empty = false
            if (column % 2 === 0) {
                left.push(<RecipeCard id={index} name={recipe.Name} imageName={recipe.Image} key={index}></RecipeCard>)
            } else {
                right.push(<RecipeCard id={index} name={recipe.Name} imageName={recipe.Image} key={index}></RecipeCard>)
            }
            column = (column + 1) % 2;
        }
    })

    let noRecipes = <h4 id='no-recipes' hidden style={{ textAlign: 'center' }}>Sorry, No Recpies Here</h4>

    if (empty) {
        noRecipes = <h4 id='no-recipes' style={{ textAlign: 'center' }}>Sorry, No Recpies Here</h4>
    }

    return (<>
        {noRecipes}

        <div id='RecipeContainer'>
            <div>
                {left}
            </div>
            <div>
                {right}
            </div>
            <div hidden>
            </div>
        </div>
    </>);

}

export default RecipeContainer; 