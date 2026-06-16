const express = require('express');
const path = require('path');
require('dotenv').config();
//this is a test comment

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'welcome.html'));
});

app.listen(PORT, () => {
    console.log(`MayRicet site running at http://localhost:${PORT}`);
});
