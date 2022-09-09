import React from 'react'

export default function Busqueda({filtrarAves}) {
  return (          
    <input type="text" placeholder='Busca aves' onChange={filtrarAves}></input>    
  )
}