import React from 'react'
import PropTypes from 'prop-types'

import Oscillator from './Oscillator'
import FrequencySelector from './FrequencySelector'

class OscillatorGroup extends React.Component {
  constructor(props) {
    super(props)
    
    this.gain = props.context.createGain()
    this.gain.connect(props.destination)
    
    const frequencies = Array(props.count).fill(props.frequency)
    const detuningFactor = 100
    const detunings = this.generateDetunings(detuningFactor)
    
    this.state = {
      frequencies,
      muted: false,
      detuningFactor,
      detunings,
    }
  }
  
  generateDetunings(factor) {
    return Array(this.props.count).fill().map(() => (
      Math.floor(Math.random() * factor) * (Math.floor(Math.random() * 2) == 1 ? 1 : -1)
    ))
  }
  
  render() {
    const enumeration = [...Array(this.props.count).keys()]
    
    return (
      <div className="oscillator-group">
        <div className="oscillators">
          {enumeration.map((_, i) => (
            <Oscillator
              key={i}
              context={this.props.context}
              destination={this.gain}
              frequency={this.state.frequencies[i]}
              onFrequencyChange={(freq) => this.setFrequency(i, freq)}
              detune={this.state.detunings[i]}
              gain={this.state.muted ? 0 : 1}
            />
          ))}
        </div>
      
        <div>
          <label>Detune</label>
          <input
            type="range"
            min={0}
            max={1000}
            value={this.state.detuningFactor}
            onChange={(event) => this.onDetuningChange(event.target.value)}
          />
          <FrequencySelector
            onFrequencyChange={(freq) => this.onFrequencyChange(freq)}
          />
        </div>
        <input
          type="checkbox"
          checked={!this.state.muted}
          onChange={(event) => this.setState({ muted: !event.target.checked })}
        />
      </div>
    )
  }
  
  onFrequencyChange(frequency) {
    console.log(frequency)
    this.setState({
      frequencies: Array(this.props.count).fill(frequency)
    })
  }
  
  onDetuningChange(value) {
    this.setState(() => {
      return {
        detuningFactor: value,
        detunings: this.generateDetunings(value),
      }
    })
  }
  
  setFrequency(index, frequency) {
    this.setState((state) => {
      const frequencies = state.frequencies.map((freq, i) => (
        i === index ? frequency : freq
      ))
      
      return { frequencies }
    })
  }
}

OscillatorGroup.propTypes = {
  count: PropTypes.number,
  frequency: PropTypes.number,
  context: PropTypes.instanceOf(AudioContext).isRequired,
  destination: PropTypes.instanceOf(AudioNode).isRequired,
}

OscillatorGroup.defaultProps = {
  count: 5,
  frequency: 420 // better than A 440hz
}

export default OscillatorGroup