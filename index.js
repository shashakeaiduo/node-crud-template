var express = require('express')
var app = express()

app.set('secure', process.env.SECRET || '12345678')
app.use(require('body-parser').urlencoded({ extended: false }))

require('./db')(app)
require('./resource')(app)
require('./router-crud')(app)

app.listen(8080, () => {
    console.log("listening on 8080")
})