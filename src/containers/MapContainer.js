import React from 'react'
import PropTypes from 'prop-types'
import Map from '../components/Map'
import { getClient, ObjectId } from '../db'

const google = window.google
// needed for mysterious Google reasons
const fakeElement = document.createElement('div')

const convertPlaceIdToLongLat = placeId =>
  new Promise((resolve, reject) => {
    const service = new google.maps.places.PlacesService(fakeElement)
    service.getDetails({ placeId }, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        resolve(place)
      }
    })
  })

const somewhereAroundCapetown = {
  lat: -33.55,
  lng: 18.25,
}

class MapContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      places: [],
      center: somewhereAroundCapetown,
      zoom: 5
    }
  }

  componentDidMount() {
    getClient()
      .then(db =>
        db
          .collection('trips')
          .find({ _id: ObjectId('5bb8a294bc0c7b396d6b8abb') }, { limit: 1 })
          .asArray()
      )
      .then(trip => trip[0].destinations.map(dest => dest.place_id))
      .then(placeIds => Promise.all(placeIds.map(convertPlaceIdToLongLat)))
      .then(places => this.setState({ places }))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.zoomToPlaceId) {
      convertPlaceIdToLongLat(nextProps.zoomToPlaceId).then(place => {
        this.setState({
          center: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          },
          zoom: 10
        })
      })
    }
  }

  render() {
    return (
      <div>
        <Map
          places={this.state.places}
          center={this.state.center}
          height={this.props.height}
          zoom={this.state.zoom}
        />
      </div>
    )
  }
}

MapContainer.propTypes = {
  zoomToPlaceId: PropTypes.string,
  height: PropTypes.any,
}

export default MapContainer
