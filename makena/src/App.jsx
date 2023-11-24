import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import './App.css'
import Home from '../src/Pages/Home/Home'
import ItemListContainer from './Components/ItemListContainer/ItemListContainer';
import CrearFunda from '../src/Pages/CrearFunda/CrearFunda'
import DistribucionImg from './Pages/DistribucionImg/DistribucionImg';
import Detail from './Pages/Detail/Detail';
import CartProvider from './context/cartContext';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import GrillasProvider from './context/grillasContext';
import ImageCombiner from './Components/Prueba/Prueba';
import Checkout from './Components/Checkout/Checkout';
import DetalleProds from './Pages/DetalleProds/DetalleProds';
import Contacto from './Pages/Contacto/Contacto';
import Footer from './Components/Footer/Footer';
import { BsWhatsapp } from "react-icons/bs";
import ActualizarDatos from './Components/ActualizadDatos/ActualizarDatos';
import DataProvider from './context/dataContext';
import ButtonMP from './Components/buttonMP/ButtonMP';
import Login from './Pages/Login/Login';
import Admin from './Pages/Admin/Admin';
import { UserProvider } from './context/userContext';
import Devs from './Components/Devs/Devs';


function App() {

  return (
    <div>
      <DndProvider backend={HTML5Backend}>

        <CartProvider>

          <DataProvider>

            <UserProvider>

              <GrillasProvider>

                <BrowserRouter>

                  <Navbar />

                  <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/crear-funda/seleccion' element={<CrearFunda />} />
                    <Route path='/crear-funda/seleccion/:marca' element={<ItemListContainer />} />
                    <Route path='/crear-funda/seleccion/:marca/:id' element={<Detail />} />
                    <Route path='/crear-funda/seleccion/distribucion' element={<DistribucionImg />} />
                    <Route path='/prueba' element={<ImageCombiner />} />
                    <Route path='/checkout' element={<Checkout />} />
                    <Route path='/detail/:id' element={<DetalleProds />} />
                    <Route path='/contacto' element={<Contacto />} />
                    <Route path='/prueba2' element={<ButtonMP />} />
                    <Route path="/login" element={<Login />} />
                    <Route path='/admin' element={<Admin />} />
                    <Route path="/devs" element={<Devs />} />


                  </Routes>

                  <a className="wpp" target='_blank' href="https://api.whatsapp.com/send?phone=5491122444188"><BsWhatsapp /><div className='joinchat'><div className='text'>Podemos ayudarte?</div></div></a>

                  <Footer />

                </BrowserRouter>

              </GrillasProvider>

            </UserProvider>

          </DataProvider>

        </CartProvider>

      </DndProvider>



    </div >
  )
}

export default App
