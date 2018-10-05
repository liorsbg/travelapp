import React from 'react'
import PropTypes from 'prop-types'
import './Sidebar.css'

const fakeData = {
  tripName: 'Croatia2003',
  itinerary: [
    {
      destinations: [
        {
          name: 'Paris',
          activities: [
            { name: 'Mud fight' },
            { name: 'Frog steak galore' }
          ]
        }
      ]
    },
    {
      destinations: [
        {
          name: 'Antarctica',
          activities: [
            { name: 'Penguin slide' },
            { name: 'Compass chasing' }
          ]
        }
      ]
    }
  ]
}

const Sidebar = ({ tripData = fakeData }) =>
  <div className='sidenav'>
    <ul>
      {tripData.itinerary.map((day, dayNumber) =>
        <li key={`day-${dayNumber}`}>
          Day {dayNumber + 1}
          <ul>
            {day.destinations.map(dest =>
              <li key={dest.name}>
                <a href='#'>{dest.name}</a>
                <ul>
                  {dest.activities.map(act =>
                    <li key={act.name}>
                      <a href='#'>{act.name}</a>
                    </li>)}
                </ul>
              </li>)}
          </ul>
        </li>)}
    </ul>
  </div>

Sidebar.propTypes = {
  tripData: PropTypes.any
}

export default Sidebar
