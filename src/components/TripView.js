import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import EditableText from '../containers/EditableText'

export const destStyle = {
  float: 'left',
  display: 'inline-block',
  paddingLeft: '10px',
  width: '140px',
  borderWidth: '5px',
  borderStyle: 'solid',
  margin: '4px',
  padding: 0,
  textAlign: 'center'
}

const AddButton = ({ onClickAddDestination }) =>
  <div style={{ width: '140px', float: 'left', display: 'inline-block', paddingTop: '70px' }}>
    <Button onClick={onClickAddDestination} />
  </div>

AddButton.propTypes = {
  onClickAddDestination: PropTypes.func
}

const formatDate = tripInfo => {
  if (tripInfo && tripInfo.tripStartDate && tripInfo.tripEndDate) {
    return `${tripInfo.tripStartDate.format('MMM Do')} - ${tripInfo.tripEndDate.format('MMM Do')}`
  } else {
    return 'chickens!'
  }
}

const TripView = ({ destinations, onClickDestination, onClickAddDestination, height, tripInfo, onTitleChange }) =>
  <div style={{ height, width: '100%' }}>
    <div style={{ height: 40, textAlign: 'left', paddingLeft: '30px', paddingTop: '10px' }}>
      <EditableText
        value={tripInfo ? tripInfo.name : 'dummy'}
        onChange={value => onTitleChange(value)}
      />
      <h3 style={{ margin: 0, display: 'inline' }}>
        {`, ${tripInfo ? tripInfo.numberOfDays : 7} Days, ${formatDate(tripInfo)}`}
      </h3>
    </div>
    <div>
      {destinations.map((dest, destIndex) =>
        <div key={`${dest.name}-${destIndex}`} style={{ ...destStyle, height: height - 70 }} onClick={() => onClickDestination(dest, destIndex)}>
          <h1>{dest.name}</h1>
          <h2>{dest.duration}</h2>
        </div>)}
      <AddButton onClickAddDestination={onClickAddDestination} />
    </div>
  </div>

TripView.propTypes = {
  destinations: PropTypes.any,
  onTitleChange: PropTypes.func.isRequired,
  onClickDestination: PropTypes.func.isRequired,
  onClickAddDestination: PropTypes.func.isRequired,
  height: PropTypes.any,
  tripInfo: PropTypes.object
}

export default TripView
