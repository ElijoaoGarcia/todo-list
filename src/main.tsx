import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import Fallback from './components/Fallback'
import './index.css'

const App = lazy(async () => await import('./App'))

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<Fallback />}>
      <App />
    </Suspense>
  </React.StrictMode>
)
