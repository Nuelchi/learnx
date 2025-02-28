const Course = require('../models/course-model');



const addCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(200).json({ message: 'course added successfully!!', course });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};


const getCourse = async (req, res) => {
    try {
        const { name } = req.query; // Get course name from query parameters

        let courses;
        if (name) {
            // Search for courses by name (case-insensitive)
            courses = await Course.find({ name: { $regex: new RegExp(name, "i") } });
        } else {
            // If no name is provided, return all courses
            courses = await Course.find({});
        }

        if (!courses.length) {
            return res.status(404).json({ message: 'No courses found' });
        }

        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCourses = async (req, res) => {
    try {
        const course = await Course.find({});

        if (!course) {
            return res.status(404).json({ message: 'course with ID not found' });
        }
        res.status(200).json(course)

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// const getCourse = async (req,res)=> {
//     try {
//         const course = await Course.findById(req.params.id);

//         if (!course) {
//             return res.status(404).json({ message: 'No available course at the moment try again later' });
//         }
//         res.status(200).json(course)

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


const updateCourse = async (req, res) => {
    try {
        // Find the course by ID and update it
        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id,  // Get the course ID from the request parameters
            req.body,       // Data to update from the request body
            { new: true, runValidators: true } // Return updated document and validate inputs
        );

        // If no book is found with the given ID
        if (!updatedCourse) {
            return res.status(404).json({ message: 'Course with the specified ID not found!, please provide a valid id' });
        }

        // Return the updated book
        res.status(200).json({ message: 'course updated successfully!', course: updatedCourse });
    } catch (error) {
        // Handle errors, including invalid ObjectId or validation errors
        res.status(400).json({ message: error.message });
    }
};



module.exports = { addCourse, getCourse, getCourses, updateCourse };