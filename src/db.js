import {
  Stitch,
  RemoteMongoClient,
  AnonymousCredential
} from 'mongodb-stitch-browser-sdk'

import { ObjectId } from 'bson'

const client = Stitch.initializeDefaultAppClient('travelapp-ewvje')
const db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('dev')
const anonymousCredential = new AnonymousCredential()

const getClient = () => client.auth.loginWithCredential(anonymousCredential)
  .then(() => db)

getClient().then(db =>
  Promise.all([
    db.collection('trips').find({ owner_id: client.auth.user.id }, { limit: 100 }).asArray()
  ])
).then(([nothing, docs]) => {
}).catch(err => {
  console.error(err)
})

const DUMMY_TRIP_ID = '5bb8a294bc0c7b396d6b8abb'

const getTrip = async (tripId = DUMMY_TRIP_ID) => {
  let trips = await getClient().then(
    db => db.collection('trips').find(
      { _id: ObjectId(tripId) },
      { limit: 1 }).asArray())
  return trips[0]
}

export { getClient, getTrip, ObjectId }
