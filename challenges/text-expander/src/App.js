import { useState } from 'react'
import './styles.css'
import PropTypes from 'prop-types'

function App() {
  return (
    <div>
      <TextExpander buttonColor="purple" className="box">
        Space travel is the ultimate adventure! Imagine soaring past the stars
        and exploring new worlds. It's the stuff of dreams and science fiction,
        but believe it or not, space travel is a real thing. Humans and robots
        are constantly venturing out into the cosmos to uncover its secrets and
        push the boundaries of what's possible.
      </TextExpander>

      <TextExpander
        collapsedNumWords={20}
        expandButtonText="Show text"
        collapseButtonText="Collapse text"
        buttonColor="#ff6622"
        className="box"
      >
        Space travel requires some seriously amazing technology and
        collaboration between countries, private companies, and international
        space organizations. And while it's not always easy (or cheap), the
        results are out of this world. Think about the first time humans stepped
        foot on the moon or when rovers were sent to roam around on Mars.
      </TextExpander>

      <TextExpander collapsedNumWords={3} expanded={true} className="box">
        Space missions have given us incredible insights into our universe and
        have inspired future generations to keep reaching for the stars. Space
        travel is a pretty cool thing to think about. Who knows what we'll
        discover next!
      </TextExpander>
    </div>
  )
}

TextExpander.propTypes = {
  collapsedNumWords: PropTypes.number,
  expandButtonText: PropTypes.string,
  collapseButtonText: PropTypes.string,
  buttonColor: PropTypes.string,
  expanded: PropTypes.bool,
  className: PropTypes.string,
}

function TextExpander({
  collapsedNumWords = 10,
  expandButtonText = 'Show more',
  collapseButtonText = 'Show less',
  buttonColor = 'blue',
  expanded = false,
  className = '',
  children,
}) {
  const [isExpanded, setIsExpanded] = useState(expanded)

  const buttonStyles = {
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    marginLeft: '6px',
    font: 'inherit',
    color: buttonColor,
  }
  const buttonText = isExpanded ? collapseButtonText : expandButtonText

  const words = children.split(' ')
  const textToDisplay = isExpanded
    ? `${children}`
    : `${words.slice(0, collapsedNumWords).join(' ')}...`

  function handleBtnClick() {
    setIsExpanded(currIsExpanded => !currIsExpanded)
  }

  return (
    <div className={className}>
      {textToDisplay}
      <button style={buttonStyles} onClick={handleBtnClick}>
        {buttonText}
      </button>
    </div>
  )
}

export default App
