import mongoose, { Document, Schema } from 'mongoose';

export interface IMaterial extends Document {
  name: string;
  category: string;
  requiredQuantity: number;
  availableQuantity: number;
  orderedQuantity: number;
  deliveredQuantity: number;
  unitCost: number;
  unit: string;
  supplier: string;
  deliveryDate: Date;
  status: 'Pending' | 'Partial' | 'Complete';
  createdAt: Date;
  updatedAt: Date;
}

const MaterialSchema = new Schema<IMaterial>(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    requiredQuantity: { type: Number, required: true, min: 0 },
    availableQuantity: { type: Number, required: true, min: 0 },
    orderedQuantity: { type: Number, required: true, min: 0 },
    deliveredQuantity: { type: Number, required: true, min: 0, default: 0 },
    unitCost: { type: Number, required: true, min: 0 },
    unit: { type: String, required: true, default: 'units' },
    supplier: { type: String, required: true, trim: true },
    deliveryDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ['Pending', 'Partial', 'Complete'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

export default mongoose.model<IMaterial>('Material', MaterialSchema);
