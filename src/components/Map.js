import React from 'react'
import PropTypes from 'prop-types'
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({ text }) =>
  <div>
    <h1>
      {text}
    </h1>
  </div>

AnyReactComponent.propTypes = {
  text: PropTypes.string
}

const somewhereAroundCapetown = {
  lat: -33.55,
  lng: 18.25
}

const SimpleMap = () =>
  // Important! Always set the container height explicitly
  <div style={{ height: '100%', width: '100%' }}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: 'AIzaSyCTKcRP25mN9r3L-KaeysDE62uMneEaY9U' }}
      defaultCenter={somewhereAroundCapetown}
      defaultZoom={11}
    >
      <AnyReactComponent
        lat={somewhereAroundCapetown.lat}
        lng={somewhereAroundCapetown.lng}
        text={'Africa! Wakawaka!'}
      />
    </GoogleMapReact>
  </div>

export default SimpleMap
