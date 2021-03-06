const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const dbConnection = require('./server/database') 
const MongoStore = require('connect-mongo')(session)
const passport = require('./server/passport');
const app = express()
const PORT = process.env.PORT || 8080
// Route requires
const user = require('./server/routes/api/user')
const yelpLocation = require('./server/routes/api/locations')
const routes = require('./server/routes')

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// MIDDLEWARE
app.use(morgan('dev'))
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json())

// Sessions
app.use(
	session({
		secret: 'fraggle-rock', //pick a random string to make the hash that is generated secure
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false, //required
		saveUninitialized: false //required
	})
)

// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser

// Routes
app.use(routes)

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
/* app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname+'/client/build/index.html'));
  }); */

// Starting Server 
app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})
