// import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'

import RecipeContainer from './components/RecipeContainer';
import TabletBoundingBox from './components/TabletBoundingBox'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import HamburgerMenu from './components/HamburgerMenu';

import React from 'react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TabletBoundingBox>
      <div className='blurred-element'>
      <Header title='Smart Cookbook'/>
      <div>
        <img src='Ingredients2.jpg' style={{ width: '100%' }}></img>
        <SearchBar/>
      </div>
      <h2 id='RecipeSearchHeader' style={{ margin: '5px' }}>Popular Recipes:</h2>
      <RecipeContainer />
      </div>
    </TabletBoundingBox>
  </React.StrictMode>,
)