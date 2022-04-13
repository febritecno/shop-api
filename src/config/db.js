import mongoose from 'mongoose';

/// adapter connect mongodb
const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});
		console.log('Database connected');
	} catch (error) {
		console.log(error.message);
	}
};

export default connectDB;