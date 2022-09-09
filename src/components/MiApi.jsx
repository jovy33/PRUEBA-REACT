import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Busqueda from './Busqueda';
import Tarjeta from './Tarjeta';

export default function MiApi() {
    // birdsFiltrada guardará los valores traídos desde la API
    const [birdsFiltrada, setBirdsFiltrada] = useState([]);
    const [birdsOriginal, setBirdsOriginal] = useState([]);

    // LLamamos la función que consume la API al momento de montar el componente
    useEffect(() => {
        consultarInformacion();
    }, []);

    // Función que consulta la API
    const consultarInformacion = async () => {
        const url = 'https://aves.ninjas.cl/api/birds';
        const response = await fetch(url)
        const respuestaApi = await response.json()

        // con setBirdsFiltrada actualizamos el estado
        setBirdsFiltrada(respuestaApi);
        setBirdsOriginal(respuestaApi);
    }

    /* Función para filtrar listado de aves. */
    const filtrarAves = (e) => {
        // Se obtiene el valor del input.
        const buscarAve = e.target.value

        // Si existe texto en el input de búsqueda, se procede a aplicar filtro.
        if (buscarAve.length > 0) {

            // Se realiza búsqueda en listado de aves, de acuerdo con la búsqueda ingresada.
            // Se considera si son mayúsculas o minúsculas, en la búsqueda.
            const listaAvesFiltrada = birdsOriginal.filter(ave => ave.name.spanish.toLocaleLowerCase().includes(buscarAve.toLocaleLowerCase()))

            // Si se encuentran resultados según la búsqueda, se actualiza el listado de aves.
            if (listaAvesFiltrada) {

                // Se actualiza el listado de aves filtradas.
                setBirdsFiltrada(listaAvesFiltrada)
            }
        } else {

            // Se actualiza el listado de aves, con las aves iniciales cargadas al inicio.
            setBirdsFiltrada(birdsOriginal)
        }
    }

    const funcionOrdenadora = () => {
        /* Se copia lista 'birdsFiltrada' a una constante llamada 'lista'. Para proceder con el ordenamiento. */
        const lista = [...birdsFiltrada];

        /*
            Devuelve la lista ordenada.
            Si el valor de 'a' va antes que el valor de 'b', entonces devuelve valor negativo.
            Si el valor de 'a' va después que el valor de 'b', entonces devuelve valor positivo.
            Si el valor de 'a' es igual que el valor de 'b', entonces devuelve 0.
        */
        return lista.sort((a, b) => a.name.spanish.localeCompare(b.name.spanish))
    }

    /* Función dedicada a obtener la lista ordenada ascendente y actualizar la lista */
    const ordenarListadoAsc = () => {       
        const listaOrdenada = funcionOrdenadora()
        setBirdsFiltrada(listaOrdenada)
    }
    /* Función dedicada a obtener la lista ordenada ascendente y actualizar la lista función reverse, para que sea 'desendente' */
    const ordenarListadoDesc = () => {
        const listaOrdenada = funcionOrdenadora()      
        setBirdsFiltrada(listaOrdenada.reverse())
    }

    return (
        <Container>
            <div className='divTitleBuscar'>
                <h1>Aves Chilenas</h1>
            </div>
            <div className='divFiltrar'>
                <Busqueda filtrarAves={filtrarAves} />
                <button onClick={ordenarListadoAsc}>(↑)</button>
                <button onClick={ordenarListadoDesc}>(↓)</button>
            </div>
            <br />
            <div className='divListado'>
                {birdsFiltrada.map(bird => <Tarjeta key={bird.uid} bird={bird} />)}
            </div>
        </Container>
    )
}
