import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import { AuthContext } from './Context/AuthContext'
import { AdminContext } from './Context/AdminContext'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <AuthContext>
      <AdminContext>
        <App/>
      </AdminContext>
    </AuthContext>
    </BrowserRouter>
    
  
)
