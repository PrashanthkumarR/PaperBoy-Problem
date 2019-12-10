const mongoose = require('mongoose');

const options = {
	useNewUrlParser: true,
    useFindAndModify:false,
    useUnifiedTopology: true ,
	useCreateIndex:true,
};

mongoose.connect('mongodb://localhost:27017/paper-boy', options)
	.then(() => {
		console.log('Connected to database!');
	})
	.catch((err) => {
		console.log('Connection failed!',err);
	});
	process.on('unhandledRejection', (error, p) => {
	  });

module.exports = mongoose;
