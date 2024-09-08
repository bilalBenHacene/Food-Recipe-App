
import { Route, Routes } from 'react-router-dom';
import './App.css'
import Navbar from './component/Navbar';
import Details from './pages/details/details';
import Home from './pages/home/home';
import Favorites from './pages/favorites/favorites';
function App() {

  return (
    <div className='app h-screen w-full'>
      <Navbar />
      <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/recipe/:id' element={<Details />}/>
      <Route path='/favorites' element={<Favorites />}/>
      </Routes>
      
      
    </div>
  )
}

export default App
