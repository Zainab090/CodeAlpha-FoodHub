const express = require('express');
const cors = require('cors');

const foodRoutes = require('./routes/foodRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const reviewRoutes = require("./routes/reviewRoutes");
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/foods', foodRoutes);
app.use('/api/categories', categoryRoutes);
app.use("/api/reviews", reviewRoutes);

app.get('/', (req, res) => {

    res.json({
        message: 'Restaurant API Running 🚀'
    });

});

module.exports = app;

