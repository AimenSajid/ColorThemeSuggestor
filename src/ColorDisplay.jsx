import './ColorDisplay.css'

function ColorDisplay({ colorsHex, loading, error }) {
  if (error) {
    return <p className="color-message" role="alert">{error}</p>
  }

  if (loading) {
    return <p className="color-message">Loading palette…</p>
  }

  // colorsHex starts as an empty array, which is truthy — check the length.
  if (!colorsHex?.length) {
    return <p className="color-message">Select a color or theme to get a color palette.</p>
  }

  return (
    <main className="color-display">
      {colorsHex.map((newColor, index) => (
        <div className="color-div" key={`${newColor.hex.value}-${index}`}>
          <div
            className="color-body"
            style={{ backgroundColor: newColor.hex.value }}
          ></div>
          <div className="color-code">
            <span>{newColor.hex.value.toUpperCase()}</span>
          </div>
        </div>
      ))}
    </main>
  )
}

export default ColorDisplay
