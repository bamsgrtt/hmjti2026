const express = require('express')
const path = require('path')
const dotenv = require('dotenv')

dotenv.config();
const app = express()
// const path = require('path')

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(express.static(path.join(__dirname, 'public')));


// ===== Middleware =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

  // Home Route
    
app.use('/', require('./routes/home'));
app.use('/about', require('./routes/about'));
app.use('/berita', require('./routes/berita'));
app.use('/proker', require('./routes/proker'));
   
app.use((req, res) => {
    res.status(404).render('404', { title: '404 - Page Not Found' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log("server siap di http://localhost:8000");
});