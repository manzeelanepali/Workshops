import React from 'react'

const Note = ({note}) => {
  console.log("hello")
  return (
    <li>{note.content}</li>
  )
}

export default Note