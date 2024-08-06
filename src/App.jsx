
import './App.css'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Registration from './Pages/Registration/Registration'

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path='/register' element={<Registration/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
