// import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/App.css'
import './styles/RecipeSearch.css'

import RecipeContainer from './components/RecipeContainer';
import TabletBoundingBox from './components/TabletBoundingBox'
import Header from './components/Header'

import React from 'react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TabletBoundingBox>
      <Header title='Smart Cookbook'/>
      <h2 id='RecipeSearchHeader' style={{ margin: '5px' }}>Saved Recipes:</h2>
      <RecipeContainer sort='saved'/>
    </TabletBoundingBox>
  </React.StrictMode>,
)