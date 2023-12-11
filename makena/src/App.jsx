import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from '../src/Pages/Home/Home'
import ItemListContainer from './Components/ItemListContainer/ItemListContainer';
import CrearFunda from '../src/Pages/CrearFunda/CrearFunda'
import DistribucionImg from './Pages/DistribucionImg/DistribucionImg';
import Detail from './Pages/Detail/Detail';
import CartProvider from './context/cartContext';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import GrillasProvider from './context/grillasContext';
import Checkout from './Components/Checkout/Checkout';
import DetalleProds from './Pages/DetalleProds/DetalleProds';
import Contacto from './Pages/Contacto/Contacto';
import Footer from './Components/Footer/Footer';
import { BsWhatsapp } from "react-icons/bs";
import DataProvider from './context/dataContext';
import ButtonMP from './Components/buttonMP/ButtonMP';
import Login from './Pages/Login/Login';
import Admin from './Pages/Admin/Admin';
import { UserProvider } from './context/userContext';
import Devs from './Components/Devs/Devs';
import CheckoutSucces from './Components/CheckoutComponents/CheckoutSucces/CheckoutSucces';
import { Navigate } from 'react-router-dom';
import Catalogo from './Pages/Catalogo/Catalogo';
import ItemDetailContainer from './Components/ItemDetailContainer/ItemDetailContainer';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';


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

                  <ScrollToTop />

                  <Routes>
                    <Route path='/home' element={<Home />} />
                    <Route path="*" element={<Navigate to="/home" />} />
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path='/crear-funda/seleccion' element={<CrearFunda />} />
                    <Route path='/crear-funda/seleccion/:marca' element={<ItemListContainer />} />
                    <Route path='/crear-funda/seleccion/:marca/:id' element={<Detail />} />
                    <Route path='/crear-funda/seleccion/distribucion' element={<DistribucionImg />} />
                    <Route path='/checkout' element={<Checkout />} />
                    <Route path='/detail/:id' element={<ItemDetailContainer />} />
                    <Route path='/detail-destacado/:id' element={<DetalleProds />} />
                    <Route path='/contacto' element={<Contacto />} />
                    <Route path='/prueba2' element={<ButtonMP />} />
                    <Route path="/login" element={<Login />} />
                    <Route path='/admin' element={<Admin />} />
                    <Route path="/devs" element={<Devs />} />
                    <Route path="/catalogo" element={<Catalogo />} />
                    <Route path='/order/completed' element={<CheckoutSucces />} />
                  </Routes>

                  <a className="wpp" target='_blank' href="https://api.whatsapp.com/send?phone=5491122444188"><BsWhatsapp /></a>

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
