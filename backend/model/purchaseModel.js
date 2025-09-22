const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  purchaseDate: { type: Date, default: Date.now },
  price: { type: Number, required: true },
});

// Export as named object (preferred)
const PurchaseModel = mongoose.model("purchase", purchaseSchema);
module.exports = { PurchaseModel };
