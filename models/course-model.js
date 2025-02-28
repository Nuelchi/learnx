const mongoose = require('mongoose');

const cousrseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'please enter the title of the book'],
            unique: true
        },
        author: {
            type: String,
            required: [true, 'please enter the author']
        },
        category: {
            type: String,
            enum:['backend', 'frontend','artificial intelligence','product design', 'digital marketing', 'business and consulting', 'design and development', 'financial management','marketing and communication'],
            required: [true, 'please enter the category of the course'],
            lowercase: true
        },
        type: {
            type: String,
            enum:['Video','Book'],
            required: [true, 'please enter the type of the course']
        },
        quantity: {
            type: Number,
            required: [true, 'please enter the number of copies available']
        },
    } 
);

const Course = mongoose.model('Course', cousrseSchema);
module.exports = Course;