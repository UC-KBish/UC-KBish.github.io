import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/App.css'
import './styles/RecipePage.css'

import Instructions from './components/Instructions';
import TabletBoundingBox from './components/TabletBoundingBox'
import Header from './components/Header'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TabletBoundingBox>
      <Header backToIndex='true' title='Burger' />
      <Instructions recipeIndex='0' />
      <div className='flex' style={{ position: 'fixed', top: 0, left: 0, alignItems: 'center', width: '100%', zIndex: 110 }}>
        <div hidden id='voice-screen' className='recipe-instruction-card'>
          <h3>How May I Help?</h3>
          <div />
          <p id='voice-screen-text'>Recognised: </p>
        </div>
      </div>
    </TabletBoundingBox>
  </React.StrictMode>,
)

let active = false;

function scrollToElement(id) {
  let blur_screen = document.getElementById('blur-screen');
  let voice_screen = document.getElementById('voice-screen');
  let voice_screen_text = document.getElementById('voice-screen-text');

  voice_screen.style.display = 'none'

  blur_screen.style.top = '-100vh';
  blur_screen.style.backdropFilter = 'blur(0px)';
  blur_screen.style.backgroundColor = '#ffffff00';

  voice_screen_text.innerText = 'Recognised: '

  active = false

  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// Check if the browser supports the SpeechRecognition API
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
  let blur_screen;
  let voice_screen;
  let voice_screen_text;

  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  // Configure recognition settings (optional)
  recognition.continuous = true; // Continuous listening
  recognition.interimResults = true; // Get interim results

  // Event listeners for speech recognition
  recognition.onstart = () => {
    blur_screen = document.getElementById('blur-screen');
    voice_screen = document.getElementById('voice-screen');
    voice_screen_text = document.getElementById('voice-screen-text');

    voice_screen.style.width = (0.8 * parseInt(document.getElementById('tablet-bounding').style.width)).toString() + 'px'
    console.log('Listening...');
  };

  recognition.onresult = (event) => {
    const result = event.results[event.results.length - 1][0].transcript.toLowerCase();
    console.log('Recognized:', result);

    const regex = /[ ]*okay cookbook(.*)/.exec(result)

    if (regex || active) {

      active = true

      voice_screen.style.display = 'block'
      blur_screen.style.top = '0vh';
      blur_screen.style.backdropFilter = 'blur(0.5px)';
      blur_screen.style.backgroundColor = '#ffffff70';

      let query = result;

      if (regex) {
        if (regex.length > 0) {
          query = regex[1]
        }
      }

      voice_screen_text.innerText = 'Recognised: ' + query

      let subquery = /.*step (\w+)/.exec(query)
      if (subquery) {
        subquery[1] = subquery[1].replace('one', '1');
        subquery[1] = subquery[1].replace('two', '2');
        subquery[1] = subquery[1].replace('three', '3');
        subquery[1] = subquery[1].replace('four', '4');
        subquery[1] = subquery[1].replace('five', '5');
        subquery[1] = subquery[1].replace('six', '6');
        subquery[1] = subquery[1].replace('seven', '7');
        subquery[1] = subquery[1].replace('eight', '8');
        subquery[1] = subquery[1].replace('nine', '9');
        subquery[1] = subquery[1].replace('ten', '10');

        scrollToElement('step_' + subquery[1])
        return
      }
      subquery = /description/.test(query)
      if (subquery) {
        scrollToElement('description')
        return
      }

      subquery = /cookware/.test(query)
      if (subquery) {
        scrollToElement('cookware')
        return
      }

      subquery = /ingredients/.test(query)
      if (subquery) {
        scrollToElement('ingredients')
        return
      }

      subquery = /steps/.test(query)
      if (subquery) {
        scrollToElement('steps')
        return
      }

    }
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
  };

  recognition.start();
} else {
  console.error('Speech recognition not supported in this browser.');
  alert('Speech recognition not supported in this browser.');
}