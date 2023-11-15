import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
		name: { type: String, required: true },
		rating: {
			type: Number,
			required: true,
			default: 0,
			min: 0,
			max: 5,
		},
		comment: { type: String, required: true },
	},
	{ timestamps: true }
)

const productSchema = new mongoose.Schema(
	{
		image: { type: String, required: true },
		name: { type: String, required: true },
		rating: { 
			stars:{type: Number, default: 0.0, required: true },
			count: {type: Number, default: 0, required: true },
		},
		priceCents: { type: Number, default: 0.0, required: true },
		keywords: [{ type: String, required: true }],
		type: { type: String },
		sizChartLink: [{ type: String, required: true }],

		// description: { type: String, required: true },
		// category: { type: String, required: true },
		// brand: { type: String, required: true },
		// countInStock: { type: Number, default: 0, required: true },
		numReviews: { type: Number, default: 0, required: true },
		reviews: [reviewSchema],
	},
	{ timestamps: true }
)
const Product = mongoose.model('Product', productSchema)
export default Product
