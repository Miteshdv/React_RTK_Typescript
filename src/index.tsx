import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'



import './index.css'

import configureStore from './app/store';



// Create redux store with history
const initialState = {};
const store = configureStore(initialState);

const render = () => {
  const App = require('./app/App').default

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
}

render()

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./app/App', render)
}
