import React from 'react'

const Note = ({note}) => {
  
  return (
    <li>{note.content}<button>Make it not so importatnt</button></li>
  )
}

export default Note