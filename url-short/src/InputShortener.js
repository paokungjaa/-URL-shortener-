import { useState } from "react"


const InputShortener = ({setinputValue}) => {
  const[value, setValue] = useState("");
  const handleClick = () => {
    setinputValue(value);
    setValue("")
  }

  return (
    <div className="inputcontainer">
        <h1>URL<span> Shortener<span> Web application</span></span></h1>
        <div>
          <input type="text" placeholder="Paste a link here"
          value={value} onChange={e =>setValue(e.target.value)}
          />
        <button onClick={handleClick}>Shorten</button>
        </div>
    </div>
  )
}

export default InputShortener