import React from 'react'
import PropTypes from 'prop-types'
import TripView from '../components/TripView'
import AddDestinationDialogBox from '../components/AddDestinationDialogBox/index'
import ReactModal from 'react-modal'

ReactModal.setAppElement(document.getElementById('root'))

class TripViewContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalDialogOpen: false,
    }
  }
  onClickAddDestination() {
    this.setState({ modalDialogOpen: true })
  }
  onDestinationSelection(newPlace) {
    this.setState({ modalDialogOpen: false })
    this.props.addDestination(newPlace)
  }
  render() {
    console.log(this.props.tripInfo)
    return (
      <div>
        <TripView
          {...this.props}
          onClickAddDestination={this.onClickAddDestination.bind(this)}
          onClickDeleteDestination={this.props.onClickDeleteDestination}
          onTitleChange={this.props.onTitleChange}
          onDateChange={this.props.onDateChange}
        />
        <ReactModal isOpen={this.state.modalDialogOpen}>
          <h1
            onClick={() => {
              this.setState({ modalDialogOpen: false })
            }}
          >
            X
          </h1>
          <AddDestinationDialogBox
            onAdd={this.onDestinationSelection.bind(this)}
          />
        </ReactModal>
      </div>
    )
  }
}

TripViewContainer.propTypes = {
  destinations: PropTypes.any,
  onClickDestination: PropTypes.func.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
  height: PropTypes.any,
  tripInfo: PropTypes.object.isRequired,
}

export default TripViewContainer
