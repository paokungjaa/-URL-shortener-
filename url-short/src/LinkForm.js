import React, { useState } from 'react'

const LinkForm = () => {
  const [shortenLink, setShotenLink]= useState("Hello world");
  return (
    <div className="result"> 
        <p>{shortenLink}</p>
        <button>Copy the link</button>
    </div>
  )
}

export default LinkForm