
import './App.css'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Registration from './Pages/Registration/Registration'
import Homepage from './Pages/Homepage'

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Homepage/>}></Route>
        <Route path='/register' element={<Registration/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
