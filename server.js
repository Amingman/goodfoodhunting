const express = require("express")
const method_override = require(`./middlewares/method_override`)
const logger = require('./middlewares/logger')
const dishController = require("./controllers/dish_controller")
const sessionController = require(`./controllers/session_controller`) 
const session = require(`express-session`)
const viewHelpers = require(`./middlewares/view_helpers`)

// const db = require(`./middlewares/db`)

const app = express()
const port = process.env.PORT || 8070

// const {Client} = require(`pg`) // Not using this anymore

const { name } = require("ejs")
const setCurrentUser = require("./middlewares/setCurrentUser")

// const pool = new Pool() // This is pool of connection --> automatically give and release connection

// const client = new Client({
//     database: `goodfoodhunting`,
// })



app.use(express.static("public"))

app.set(`view engine`, `ejs`)

/* EVERYTHING IN BELOW HERE BLOCK IS MOVED INTO THE dish_controller.js EXCEPT THE app.use(s)
THE app from app.get becomes router --> router.get, router.post etc..
*/

app.use(express.urlencoded({ extended: true})) // use this to get body --> It is called middleware

// HTTP methods - get post put patch delete
// time -
/**
 * CRUD             database        http
 * --------------------------------------
 * Create           insert          post
 * Read             select          get
 * Update           update          put/patch
 * Destroy          delete          delete
 * 
 * right now we only use app.get for everything.
 * However it is the same as using <div> for everything.
 * Wrong semantics
 * 
 * 
 * 
 * MVC - model view controllers - separation of concerns
 * e.g. views, public
 */





// Below is a middleware CALLBACK function. it has a signature syntax. Will be run if the request has not been found up to this line. Everything else (such as /dishes will not run this). Commented out because we are making it in a separate file that we need to export. Look at logger.js
// app.use((req, res, next) => {
//     // console.log(req.url);
//     // console.log(req.method);
//     // console.log(new Date());
//     console.log(`${req.method} ${req.url} ${new Date().toLocaleDateString()}`);
//     next()
// })
app.use(logger)


/*
This is the middleware for delete method
*/
app.use(method_override)

// This create session
app.use(session({
    secret: process.env.SESSION_SECRET || `keyboard cat`,
    resave: false,
    saveUninitialized: true
}))

// This will be used to display username at home

app.use(setCurrentUser)
app.use(viewHelpers)



app.use(`/`, sessionController) // session


// Creating a middleware to ensure we are logged in
// app.use(ensureLoggedIn)

// This one below + is to add all "/" with the controller file path
//                |
//                v
app.use(`/`, dishController) 



// MVC - Model view Controllers - Separation of concerns
// Resources you are working with - dishes, comments etc.
// Might want to split the dishes out of the server. Same with comments. Make its own file that handle those "resources"


app.listen(port, () => {
    console.log(`listening on port ${port}`);
})