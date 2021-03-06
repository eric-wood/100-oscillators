import React from 'react'
import PropTypes from 'prop-types'

import OscillatorGroup from './OscillatorGroup'

class Synth extends React.Component {
  constructor(props) {
    super(props)
    
    this.gain = props.context.createGain()
    this.gain.gain.value = 0.0
    
    this.left = props.context.createStereoPanner()
    this.left.pan.value = -1
    
    this.right = props.context.createStereoPanner()
    this.right.pan.value = 1
    
    this.left.connect(this.gain)
    this.right.connect(this.gain)
    this.gain.connect(props.context.destination)
  }
  
  render() {
    const enumeration = [...Array(10).keys()]

    return (
      <div className="controls--oscillators">
        <section>
          {enumeration.map((_, i) => (
            <OscillatorGroup
              context={this.props.context}
              destination={this.left}
              key={`left-${i}`}
            />
          ))}
        </section>
        
        <section>
          {enumeration.map((_, i) => (
            <OscillatorGroup
              context={this.props.context}
              destination={this.right}
              key={`right-${i}`}
            />
          ))}
        </section>
      </div>
    )
  }
}

Synth.propTypes = {
  context: PropTypes.instanceOf(AudioContext),
}

Synth.defaultProps = {
  context: new (window.AudioContext || window.webkitAudioContext)()
}

export default Synth