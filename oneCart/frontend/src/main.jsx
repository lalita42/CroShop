import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'
import { BrowserRouter } from 'react-router-dom'
import { AuthContext } from './Context/AuthContext'
import { UserContext } from './Context/UserContext'
import  {ShopContext}  from './Context/ShopContext'



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthContext>
    <UserContext>
      <ShopContext>
    <App/>
    </ShopContext>
    </UserContext>
    </AuthContext>
  </BrowserRouter>
)
