import { useState, useEffect } from 'react'
import Header from './Header.jsx'
import ColorDisplay from './ColorDisplay.jsx'

const API_BASE = 'https://www.thecolorapi.com/scheme'
const DEFAULT_COLOR = '#ffffff'
const DEFAULT_THEME = 'monochrome'

function App() {
  // Seeded with real defaults rather than empty strings, so the first request
  // is already valid and the effect never has to correct itself mid-run.
  const [rootColor, setRootColor] = useState(DEFAULT_COLOR)
  const [colorTheme, setColorTheme] = useState(DEFAULT_THEME)
  const [colorsHex, setColorsHex] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Abort the in-flight request if the inputs change again before it lands,
    // so a stale response can't overwrite a newer palette.
    const controller = new AbortController()

    const fetchScheme = async () => {
      setLoading(true)
      setError('')

      try {
        const query = `${API_BASE}?hex=${rootColor.slice(1)}&mode=${colorTheme}`
        const response = await fetch(query, { signal: controller.signal })

        if (!response.ok) {
          throw new Error(`The color API returned ${response.status}.`)
        }

        const data = await response.json()

        // The API answers 200 even for a malformed query, just without colors.
        if (!Array.isArray(data.colors)) {
          throw new Error('The color API returned no colors for that combination.')
        }

        setColorsHex(data.colors)
      } catch (err) {
        if (err.name === 'AbortError') return
        console.error('Error fetching color data:', err)
        setColorsHex([])
        setError(err.message || 'Could not reach the color API.')
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    fetchScheme()
    return () => controller.abort()
  }, [rootColor, colorTheme])

  const buttonHandler = (colorVal, theme) => {
    setRootColor(colorVal)
    setColorTheme(theme)
  }

  return (
    <>
      <Header
        buttonHandler={buttonHandler}
        defaultColor={DEFAULT_COLOR}
        defaultTheme={DEFAULT_THEME}
      />
      <ColorDisplay colorsHex={colorsHex} loading={loading} error={error} />
    </>
  )
}

export default App
