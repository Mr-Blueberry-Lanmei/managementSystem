
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './store'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)
