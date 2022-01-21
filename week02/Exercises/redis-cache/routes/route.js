const studentRouter = require('./student.route');

const route = app => {
    app.use('/api/student', studentRouter);
}

module.exports = route;