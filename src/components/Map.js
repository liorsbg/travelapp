import React from 'react'
import PropTypes from 'prop-types'
import GoogleMapReact from 'google-map-react'

const greatPlaceStyle = {
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
}

const radius = 50
const DestMarker = ({ text }) => (
  <div style={greatPlaceStyle}>
    <svg width={radius * 2} height={radius * 2}>
      <circle cx={radius} cy={radius} r={radius} fill="red" fillOpacity="0.2" />
    </svg>
  </div>
)

DestMarker.propTypes = {
  text: PropTypes.string,
}

const SimpleMap = ({ places, center, height, zoom }) => {
  // Important! Always set the container height explicitly
  return (
    <div style={{ height, width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: 'AIzaSyCTKcRP25mN9r3L-KaeysDE62uMneEaY9U',
        }}
        defaultZoom={zoom}
        center={center}
        zoom={zoom}
      >
        {places.map(place => (
          <DestMarker
            key={place.place_id}
            lat={place.geometry.location.lat()}
            lng={place.geometry.location.lng()}
            text={'Africa! Wakawaka!'}
          />
        ))}
      </GoogleMapReact>
    </div>
  )
}

SimpleMap.propTypes = {
  center: PropTypes.any,
  places: PropTypes.any,
  height: PropTypes.any,
  zoom: PropTypes.number,
}

export default SimpleMap
