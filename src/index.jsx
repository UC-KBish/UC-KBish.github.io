import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/App.css'
import './styles/UserSelection.css'

import TabletBoundingBox from './components/TabletBoundingBox'
import UserCardContainer from './components/UserCardContainer';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TabletBoundingBox>
      <h1>Welcome Chef...</h1>
      <UserCardContainer/>
    </TabletBoundingBox>
  </React.StrictMode>,
)
