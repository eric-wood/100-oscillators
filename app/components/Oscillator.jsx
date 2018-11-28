const React = require('react')
const PropTypes = require('prop-types')

class Oscillator extends React.Component {
  constructor(props) {
    super(props)
    
    this.oscillator = props.context.createOscillator()
    this.oscillator.frequency.value = props.frequency
    this.oscillator.detune.value = props.detune
    
    this.gain = props.context.createGain()
    this.gain.gain.value = props.gain
    
    this.oscillator.connect(this.gain)
    this.gain.connect(props.destination)
    this.oscillator.start()
  }
  
  render() {
    return (
      <div>
        <input
          type="range"
          value={this.props.frequency}
          onChange={(event) => this.onFrequencyChange(event.target.value)}
          min={0}
          max={10000}
        />
        <h3>{this.props.frequency}hz</h3>
      </div>
    )
  }
  
  onFrequencyChange(frequency) {
    this.props.onFrequencyChange(frequency)
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.frequency !== this.props.frequency) {
      this.oscillator.frequency.value = this.props.frequency
    }
    
    if (prevProps.destination !== this.props.destination) {
      this.oscillator.disconnect(prevProps.destination)
      this.oscillator.connect(this.props.destination)
    }
    
    if (prevProps.gain !== this.props.gain) {
      this.gain.gain.value = this.props.gain
    }
    
    if (prevProps.detune !== this.props.detune) {
      this.oscillator.detune.value = this.props.detune
    }
  }
  
  componentWillUnmount() {
    this.oscillator.stop()
    this.oscillator.disconnect(this.props.destination)
  }
}

Oscillator.propTypes = {
  gain: PropTypes.number,
  context: PropTypes.instanceOf(AudioContext).isRequired,
  frequency: PropTypes.number.isRequired,
  detune: PropTypes.number,
  destination: PropTypes.instanceOf(AudioNode).isRequired,
  onFrequencyChange: PropTypes.func,
}

Oscillator.defaultProps = {
  gain: 1,
  frequency: 420, // way better than A 440
  onFrequencyChange: () => {},
  detune: 0,
}

module.exports = Oscillator