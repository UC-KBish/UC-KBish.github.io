import userData from '../data/users.json'
import recipeData from '../data/recipes.json'

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

function DescriptionSegment(props) {
    return (
        <div id='description' className='recipe-instruction-card'>
            <h2>Description</h2>

            <div class='flex'>
                <img src={recipeData[props.recipeIndex].Image} style={{ width: '50%' }}></img>
                <p style={{ marginInline: '10px', marginBlock: 0, width: '50%', height: '170px', overflow: 'auto' }}>{recipeData[props.recipeIndex].Description}</p>
            </div>
        </div>
    )
}

function CookwareSegment(props) {
    return (
        <div id='cookware' className='recipe-instruction-card'>
            <h2>Cookware</h2>

            <ul>
                {recipeData[props.recipeIndex].Cookware.map(item => {
                    return <li>{item}</li>
                })}
            </ul>
        </div>
    )
}

function IngredientsSegment(props) {
    return (
        <div id='ingredients' className='recipe-instruction-card'>
            <h2>Ingredients</h2>
            
            <ul>
                {recipeData[props.recipeIndex].Ingredients.map(item => {
                    return <li>{item}</li>
                })}
            </ul>
        </div>
    )
}

function Step(props) {
    return (<>
        <h3 id={props.id} style={{ marginBottom: 0 }}>{'Step ' + (parseInt(props.index) + 1) + ': ' + recipeData[props.recipeIndex].Steps[props.index].Title}</h3>
        <div style={{ backgroundColor: '#303030', margin: 0, width: '100%', height: '0.125rem' }} />
        <p>{recipeData[props.recipeIndex].Steps[props.index].Instruction}</p>
    </>);
}

function StepsSegment(props) {
    return (
        <div id='steps' className='recipe-instruction-card'>
            <h2>Steps</h2>
            {recipeData[props.recipeIndex].Steps.map((step, index) => {
                return <Step recipeIndex={props.recipeIndex} id={'step_' + (index + 1)} index={index} />
            })}
        </div>)
}

function CompleteButton(props) {
    const handleClick = () => {
        let userDataCopy = userData

        if (getCookie('userData')) {
            userDataCopy = getCookie('userData')
        }
    
        userDataCopy.Users[parseInt(userDataCopy.Selected)]['Completed Recipes'].push(props.recipeIndex.toString())

        setCookie('userData', userDataCopy)

        window.location.href = '/Completed.html'
        
    };

    return (
        <button className='button recipe-complete' onClick={handleClick}>
            <h2>🎉 Complete 🎉</h2>
        </button>
    );
}

function Instructions(props) {
    return (<>
        <div className='recipe-instruction-card'>
            <h2>Voice Assistant Intro</h2>
            <p>Get started with your voice assistant by saying "Okay Cookbook..." If I get stuck, just say "hey" or refresh the page :)</p>
        </div>
        <DescriptionSegment recipeIndex={props.recipeIndex} />
        <CookwareSegment recipeIndex={props.recipeIndex} />
        <IngredientsSegment recipeIndex={props.recipeIndex} />
        <StepsSegment recipeIndex={props.recipeIndex} />
        <CompleteButton recipeIndex={props.recipeIndex} />
    </>)
}

export default Instructions
