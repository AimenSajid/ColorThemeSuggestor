import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './ColorDisplay.css'
function ColorDisplay(props){
    if (!props.colorsHex) {
        //If the API request isn't completed return "loading...""
       return <p>Select a color or theme to get a color palette.</p>;
     } else 
     {
        const colorsHex = props.colorsHex
        const renderColors = colorsHex.map((newColor, index)=>{
            const colorProp = {backgroundColor: newColor.hex.value}
            return (<div className='color-div'>
                <div key={index} className='color-body' style={colorProp}>
                </div>
                <div className='color-code'><span>{newColor.hex.value.toUpperCase()}</span></div>
            </div>)
    })
        return(
            <main className='color-display'>
                {renderColors}
            </main>
        )
    }
}
export default ColorDisplay