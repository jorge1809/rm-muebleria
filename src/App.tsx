import { Route, Routes } from "react-router";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ScrollAlInicio from "./components/ScrollAlInicio/ScrollAlInicio";
import PaginaNoEncontrada from "./components/PaginaNoEncontrada/PaginaNoEncontrada";

import Inicio from "./pages/Inicio/Inicio";
import CategoriaProductosRuta from "./pages/CategoriaProductos/CategoriaProductosRuta";
import AmbienteProductosRuta from "./pages/AmbienteProductos/AmbienteProductosRuta";
import DetalleProductoRuta from "./pages/DetalleProducto/DetalleProductoRuta";
import DetalleInspiracionRuta from "./pages/DetalleInspiracion/DetalleInspiracionRuta";

import "./App.css";

function App() {
  return (
    <>
      <ScrollAlInicio />
      <Header />

      <Routes>
        <Route path="/" element={<Inicio />} />

        <Route path="/catalogo/:slug" element={<CategoriaProductosRuta />} />

        <Route path="/ambientes/:slug" element={<AmbienteProductosRuta />} />

        <Route path="/productos/:id" element={<DetalleProductoRuta />} />

        <Route path="/inspiracion/:slug" element={<DetalleInspiracionRuta />} />

        <Route path="*" element={<PaginaNoEncontrada />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
