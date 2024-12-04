import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './Header.css'

function Header(props) {
 const colorThemes = ['monochrome','monochrome-dark','monochrome-light','analogic','complement','analogic-complement','triad','quad']
 const [colorVal, setColorVal] = useState('');
 const [colorTheme, setColorTheme] = useState('');
 const renderOptions = colorThemes.map((theme, index)=><option key={index} value={theme}>{theme.charAt(0).toUpperCase() + theme.slice(1)}</option>)
  const handleButton =  (e) =>{
    e.preventDefault()
    props.buttonHandler(colorVal,colorTheme)
  }
 return (
    <div className='header'>
        <input type='color' name='picker' onInput={(e)=>{setColorVal(e.target.value)
        }}/>
        <select name='colorThemes'  onChange={(e)=> setColorTheme(e.target.value)}>
          {renderOptions}
        </select>
        <button name='getScheme' onClick={handleButton}>Get color scheme</button>
    </div>
  )
}

export default Header
