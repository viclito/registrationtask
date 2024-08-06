
import './App.css'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Registration from './Pages/Registration/Registration'
import Homepage from './Pages/Homepage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {
  const querClient = new QueryClient()

  return (
    <QueryClientProvider client={querClient}>
      <Router>
        <Routes>
          <Route path='/' element={<Homepage/>}></Route>
          <Route path='/register' element={<Registration/>}></Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
