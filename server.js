const express = require('express')

const app = express()
// const path = require('path')

app.set("view engine", "ejs")
app.set("views", "views")

app.use(express.static('public'));


  // Home Route
    
app.use('/', require('./routes/home'));
app.use('/about', require('./routes/about'));
app.use('/departemen', require('./routes/departemen'));
app.use('/berita', require('./routes/berita'));
app.use('/proker', require('./routes/proker'));
   


app.listen(8000, () => {
    console.log("server siap di http://localhost:8000");
});