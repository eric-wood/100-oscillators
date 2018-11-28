const React = require('react')
const PropTypes = require('prop-types')

const FREQUENCIES = require('../frequencies')

class FrequencySelector extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      octave: 3,
      note: 'A',
    }
  }
  
  onOctaveChange(octave) {
    const frequency = FREQUENCIES[octave][this.state.note]  
    this.props.onFrequencyChange(frequency)

    this.setState({ octave })
  }
  
  onNoteChange(note) {
    const frequency = FREQUENCIES[this.state.octave][note]
    this.props.onFrequencyChange(frequency)
      
    this.setState({ note })
  }
  
  render() {
    const octaves = [...Array(Object.keys(FREQUENCIES[0]).length).keys()]
    const notes = FREQUENCIES[this.state.octave]
    
    return (
      <div>
        <label>Octaves</label>
        <select
          value={this.state.octave}
          onChange={(event) => this.onOctaveChange(event.target.value)}
        >
          {octaves.map((octave) => (
            <option value={octave}>{octave}</option>
          ))}
        </select>
        
        <label>Note</label>
        <select
          value={this.state.note}
          onChange={(event) => this.onNoteChange(event.target.value)}
        >
          {Object.keys(notes).map((note) => (
            <option value={note}>{note}</option>
          ))}
        </select>
      </div>
    )
  }
}

FrequencySelector.propTypes = {
  onFrequencyChange: PropTypes.func,
}

FrequencySelector.defaultProps = {
  onFrequencyChange: () => {}
}

module.exports = FrequencySelector