import { useState } from 'react'
import './Header.css'

const COLOR_THEMES = [
  'monochrome',
  'monochrome-dark',
  'monochrome-light',
  'analogic',
  'complement',
  'analogic-complement',
  'triad',
  'quad',
]

// "analogic-complement" -> "Analogic complement"
const formatTheme = (theme) => {
  const words = theme.replace(/-/g, ' ')
  return words.charAt(0).toUpperCase() + words.slice(1)
}

function Header({ buttonHandler, defaultColor, defaultTheme }) {
  // Seeded to match what the controls actually display, so submitting without
  // touching them sends the visible values rather than empty strings.
  const [colorVal, setColorVal] = useState(defaultColor)
  const [colorTheme, setColorTheme] = useState(defaultTheme)

  const handleButton = (e) => {
    e.preventDefault()
    buttonHandler(colorVal, colorTheme)
  }

  return (
    <div className="header">
      <input
        type="color"
        name="picker"
        aria-label="Base color"
        value={colorVal}
        onChange={(e) => setColorVal(e.target.value)}
      />

      <select
        name="colorThemes"
        aria-label="Color theme"
        value={colorTheme}
        onChange={(e) => setColorTheme(e.target.value)}
      >
        {COLOR_THEMES.map((theme) => (
          <option key={theme} value={theme}>
            {formatTheme(theme)}
          </option>
        ))}
      </select>

      <button name="getScheme" onClick={handleButton}>
        Get color scheme
      </button>
    </div>
  )
}

export default Header
