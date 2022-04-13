import mongoose from 'mongoose';

const ProductSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please add a name'],
	},

	desc: {
		type: String,
		required: [true, 'Please add a description'],
	},

	price: {
		type: Number,
		required: [true, 'Please add a price'],
	},

	stock: {
		type: Number,
		required: [true, 'Please add a count in stock'],
	},

	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: [true, 'Please add a user object'],
		ref: 'User',
	},
}, {
	timestamps: true,
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;