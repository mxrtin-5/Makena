import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import './App.css'
import Home from '../src/Pages/Home/Home'
import ItemListContainer from './Components/ItemListContainer/ItemListContainer';
import CrearFunda from '../src/Pages/CrearFunda/CrearFunda'
import Xiaomi from '../src/Components/Xiaomi/Xiaomi'

function App() {



  return (
    <div>
      <BrowserRouter>

      <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/crear-funda/seleccion' element={<CrearFunda />}/>
          <Route path='/crear-funda/seleccion/:marca' element={<ItemListContainer/>} />
          <Route path='/detail/:item' element={<Xiaomi />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
