import React, { Component } from 'react'
import './App.css'
import db from './db.js'
import Map from './components/Map'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'

console.log('db', db)

db.getClient().then(db =>
  db.collection('trips').find({}, { limit: 100 }).asArray().then(docs => {
    console.log('Found docs', docs)
  }))

class App extends Component {
  render () {
    return (
      <div className="App">
        <div style={{ height: '500px', display: 'flex' }}>
          <Sidebar />
          <Map />
        </div>
        <Footer style={{ width: '100%' }}/>
      </div>
    )
  }
}

export default App
