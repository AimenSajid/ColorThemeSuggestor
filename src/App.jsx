import React, { useState, useEffect } from 'react'
import Header from './Header.jsx'
import ColorDisplay from './ColorDisplay.jsx'
import './App.css'


function App() {
 
  const [rootColor, setRootColor] = useState('')
  const [colorTheme, setcolorTheme] = useState('')
  const [colorsHex, setcolorsHex] = useState([])  
  const initialQuery = 'https://www.thecolorapi.com/scheme?'
  useEffect(()=>{
    if(!rootColor || !colorTheme){
      setRootColor('#ffffff')
      setcolorTheme('monochrome')
    }
    const finalQuery = `${initialQuery}hex=${rootColor.slice(1)}&mode=${colorTheme}`
    fetch(finalQuery)
      .then(response => response.json())
      .then(data => setcolorsHex(data.colors))
      .catch(error => {
        console.error("Error fetching color data:", error);
      });
  },[rootColor, colorTheme])

  const buttonHandler = function(colorVal, theme){
    setRootColor(colorVal)
    setcolorTheme(theme)
  }

  return (
    <>
    <Header buttonHandler = {buttonHandler}/>
    <ColorDisplay  colorsHex = {colorsHex}/>
    </>
  )
}

export default App
