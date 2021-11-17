import * as mongo from "mongodb"

class MongoInstance {
    db: mongo.Db = null
    public async connect(){
        let mongoURI = `mongodb+srv://${process.env.DB_ADMIN}:${encodeURIComponent(process.env.DB_PASSWORD)}@`;
        mongoURI += `${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
        // const options = {
        //     useUnifiedTopology: true,
        //     numberOfRetries: 10,
        //     poolSize: 10, // Maintain up to 10 socket connections
        //     // If not connected, return errors immediately rather than waiting for reconnect
        //     bufferMaxEntries: 0,
        //     useNewUrlParser: true,
        //   };
        const client = new mongo.MongoClient(mongoURI)
        client.connect()
        console.info(">>>> App successfully connected to database")
        this.db = client.db();
        return this.db;
    }
}

const MongoInst = new MongoInstance();
const db = MongoInst.connect()

export default db