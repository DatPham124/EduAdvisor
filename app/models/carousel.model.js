const mongoose = require('mongoose');

const carouselSchema = new mongoose.Schema({
    img: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Carousel = mongoose.model('Carousel', carouselSchema);

module.exports = Carousel;