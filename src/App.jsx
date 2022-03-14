//importamos React
import React from "react";
//importamos el firebase que esta en el firebase.js
import {firebase} from './firebase'
//importamos el css
import './App.css';

function App() {

  /*-------Estados------*/

  //1)Pintar lista
  const [playlist, setPlaylist]=React.useState([])

  //2)vincular los valores ungresados en input
  const [vincular, setVincular]=React.useState('')

  //3)Editar los campos
  const[Btnedicion,setBtnEdicion]=React.useState(false)

  //4) estado de ID
  const[id, setId]=React.useState('')

  //funcion traerdatos firestore
  React.useEffect(()=>{

    //funcion que Trae los datos del fireStore
    const llamadoDatos = async () => {
      try {

        //llamado al fireStore
        const db= firebase.firestore()

        //llamado de la coleccion
        const datos= await db.collection('playList').get()

        //Trae los campos id y los campos de la coleccion 
        const arrayDatos=  datos.docs.map(doc =>({id:doc.id, ...doc.data()}))
  
        console.log(arrayDatos);

        //enviamos los datos al cambio de estado
        setPlaylist(arrayDatos)
        
      } catch (error) {
        console.log(error);
      }
    }
    llamadoDatos()

  },[])

  //Funcion para agregar los elementos del input a la bd
  const agregar= async (e) =>{

    e.preventDefault()

    //validamos el campo
    if(!vincular.trim()){
      console.log('esta vacio')
      return
    }
    console.log(vincular);

    //agregar al firebase
    try {
      
      const db = firebase.firestore()

      //creamos un objeto para los campos en la base de datos
      const listadb ={
        Cancion:vincular,
        fechaCreacion:Date.now()
      }
      const datos= await db.collection('playList').add(listadb)
      
      setPlaylist([
        ...playlist,
        {...listadb, id:datos.id}
      ])

      setVincular('')



    } catch (error) {
      console.log(error);
    }
  }

  //Funcion eliminar

  const eliminar = async (id) =>{
    try {

      /*----Eliminar del fireStore---*/

      //llamamos al fireStore
      const db = firebase.firestore()

      //llamamos a la coleccion y funcion delete
      await db.collection('playList').doc(id).delete()

      /*---Elimnar del visualizacion del app----*/  

      const arrayFiltrado = playlist.filter(item =>item.id !==  id)
      setPlaylist(arrayFiltrado)

      
    } catch (error) {
      console.log(error);
    }
  }

  //Funcion Editar

  const activarEdicion = (item)=>{
    
    //cambiamos Formulario
    setBtnEdicion(true)

    //ponemos en el estado el elemento Cancion
    setVincular(item.Cancion)

    //ponemos eñ id 
    setId(item.id)
  }

  const editar = async (e) =>{

    //modificamos en formulario
    e.preventDefault()

    //validamos los campos del form
    if(!vincular.trim()){
      console.log('esta vacio')
      return
    }
    console.log(vincular);

    //modificamos en la base de datos
    try {
      
      const db = firebase.firestore()

      await db.collection('playList').doc(id).update({
        Cancion: vincular
      })
      const arrayEditado = playlist.map(item =>(
        item.id === id ? {id:item.id, fecha: item.fechaCreacion, Cancion:vincular} : item
      ))

      setPlaylist(arrayEditado)
      
      //cambiamos Formulario
      setBtnEdicion(false)

      //ponemos en el estado el elemento Cancion
      setVincular('')

      //ponemos eñ id 
      setId('')

    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div>
      <div className="container-fluid py-5  cabecera">
          
          <h1 className=" text-white  text-center py-5 my-3">C R U D F I R E B A S E <i class="bi bi-headphones" id="logo"></i></h1>
          <i class="bi bi-moon-stars-fill lg" id="mode"></i>
      </div>
      <div className="container-fluid  probar  ">
        <div className="row d-flex justify-content-center">
            <div className="col-md-6">
                <h4 className="text-white py-1">
                  {
                    Btnedicion ? 'Editar playList' : 'playList'
                  }
                </h4>
                <form onSubmit={Btnedicion ? editar : agregar}>
                    <input 
                    type="text" 
                    placeholder="Ingrese Canción"
                    className="form-control mb-2 formulario"
                    onChange={e=> setVincular(e.target.value)}
                    value={vincular}
                    /> 
                    <button 
                    className=
                    {
                      Btnedicion ? 'btn botonB btn-block':'btn  btn-block botonA'
                    }
                    type="submit"
                    >
                      {
                        Btnedicion ? 'Editar' : 'Agregar'
                      }
                    </button>
                </form>
              </div>
          </div>
        <div className="row d-flex justify-content-center ">
          <div className="col-md-6  filaScrol">
            
            <ul className="list-group lista my-4">
              {
                playlist.map(item =>(
                  <li className="list-group-item lista my-1" key={item.id}>
                    {item.Cancion}

                    <button 
                    className="btn btn-sm float-right botonD"
                    onClick={()=>eliminar(item.id)}
                    >
                      Eliminar
                    </button>
                    <button 
                    className="btn  btn-sm float-right mx-2 botonEdi"
                    onClick={()=>activarEdicion (item)}
                    >
                      Editar
                    </button>

                  </li>

                ))
              }

            </ul>
          </div>
        </div> 
      </div>
  </div>
    
  );
}

export default App;
