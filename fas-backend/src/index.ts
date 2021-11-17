//loading env file
import "./preStart/"
import "./db/"
import "./db/CRUD"
import app from "./server"

const port = Number(process.env.PORT || 8000)
app.listen(port, () => {
    console.info(`>>>>Express server started at port ${port}`)
})