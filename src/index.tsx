import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store/index'
import App from './App'
import React from 'react'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
    <BrowserRouter>
      <Provider store={store}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Provider>
    </BrowserRouter>
)