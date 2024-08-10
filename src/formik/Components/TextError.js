import React from 'react'
import '../styles.css'

const TextError = (props) => {
  return (
    <div className='error' style={{color:"red"}}>
      {props.children}
    </div>
  )
}

export default TextError
