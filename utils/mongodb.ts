import { MongoClient } from "mongodb"

export default MongoClient(process.env.MONGODB_URL)
