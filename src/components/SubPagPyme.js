import React,{useState, useEffect} from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';

import {Link, useLocation} from 'react-router-dom';
import Producto from './producto.js';
import { propTypes } from 'react-bootstrap/esm/Image';


export default function SubPagPyme(){
  let location = useLocation();
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pyme, setPyme] = useState(0);
  useEffect(() => {
      fetch(location.pathname)
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result);
            setIsLoaded(true);
            setPyme(result);
          }
        )
    }, [])
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    fetch(location.pathname)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result.productos);
          setProductos(result.productos);
        }
      )
  }, [])


  function handleRemove(carro) {
    console.log(carro[0]);
    let newList = [];
    let count =0;
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i][0] != carro[0] && count ==0) {
            newList.push(carrito[i]);
        }else if (carrito[i][0] == carro[0] && count > 0 ){
          newList.push(carrito[i]);
          count++;
        }else if (carrito[i][0] == carro[0] && count == 0 ){
          count++;
        }
    }
    setCarrito(newList);


    setTotal(total-carro[1]);

  }
  const revisarDespacho=(despacho)=>{
    if (despacho===true){
        return "sí";
    }else{
        return "no";
    }
}
    const agregarCarrito = (nombre, precio)=>{
      setCarrito([...carrito, [nombre, precio]]);
      setTotal(total+precio);
    }


    const mostrarListaCarrito = carrito.map(
      (carro, i)=>{
        return (
          <li key = {i}>
            <div >
            {carro[0]}  (${carro[1]})
            <button onClick = {() => handleRemove(carro)} type="button" className="btn-close" aria-label="Close">

            </button>

            </div>
            
          </li>
        )
      }
      )

    const mostrarProductos = productos.map(
      (producto,i) => {
        return ( 
          <Col>
          <Producto
          nombre={producto.nombre}
          descripcion = {producto.descripcion}
          precio = {producto.precio}
          agregarCarrito = {()=>agregarCarrito(producto.nombre, producto.precio)}
          key = {i}
          imagen = {producto.imagen}
          >
          

          </Producto>
          </Col>  
        
        )}
    );



    if(!isLoaded){
      return 'loading...'
    }else{
    return (
        <div className='ContainerPyme'>
            <Row>
              
              
              <Col xs={8}>
              <Row>
              <Col>
                <img className="ImagenPyme" src={pyme.imagen}></img>
              </Col>
              
              <Col xs={6}>
              <h1><u>{pyme.nombre}</u></h1>
              Tipo de Pyme: {pyme.tipo}<br></br>
              Historia de la Pyme: <br></br>
              Ubicado en: {pyme.ubicacion}<br></br>
              Puntos reputación: <br></br>

              Ahorro esperado: <br></br>
              Teléfono:<br></br>
              Posibilidad de despacho: {revisarDespacho(pyme.despacho)}
              </Col>
              </Row>
              <h3 style={{color:'white'}}><u>Productos disponibles</u></h3>
             
              <Row>
              {mostrarProductos}

              </Row>
              </Col>





              <Col>
              <div className='ContainerCarrito'>
                <h2>Carrito</h2>
                <div style={{textAlign:'left'}}>
                    Incluir despacho: <input  type="checkbox"></input><br></br>
                    </div>
                <ul>
                  {mostrarListaCarrito}
                </ul>
                <h3>Total: {total}</h3>
                <Row>
                  <Container className='ContainerPymeBotones'>
                    
                    <Button className='ContainerPymeBotonesBoton'><Link style ={{color:'white'}}to='/success'>Ordenar</Link></Button>
                    <Button className='ContainerPymeBotonesBoton'>Chatear</Button>
                  </Container>
                </Row>
                
                
              </div>
              </Col>

            </Row>
            
            

           
            
        </div>
      )
    }
  
  }