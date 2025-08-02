const mongoose = require("mongoose");

// Schema for form element options (radio, checkbox, dropdown)
const optionSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

// Base schema for form elements
const formElementSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: [
        "textInput",
        "emailInput",
        "numberInput",
        "textarea",
        "checkbox",
        "radioGroup",
        "dropdown",
        "rating",
        "linearScale",
        "date",
      ],
    },
    label: {
      type: String,
      required: true,
    },
    placeholder: String,
    required: {
      type: Boolean,
      default: false,
    },
    description: String,

    // For text inputs
    minLength: Number,
    maxLength: Number,

    // For number inputs
    min: Number,
    max: Number,
    step: Number,

    // For textarea
    rows: Number,

    // For date inputs
    minDate: String,
    maxDate: String,

    // For rating elements
    maxRating: {
      type: Number,
      default: 5,
    },
    ratingType: {
      type: String,
      enum: ["star", "number"],
      default: "star",
    },

    // For linear scale
    minValue: Number,
    maxValue: Number,
    minLabel: String,
    maxLabel: String,

    // For elements with options (radio, checkbox, dropdown)
    options: [optionSchema],
  },
  { _id: false }
);

// Form settings schema
const formSettingsSchema = new mongoose.Schema(
  {
    allowMultipleSubmissions: {
      type: Boolean,
      default: false,
    },
    requireAuth: {
      type: Boolean,
      default: false,
    },
    collectEmail: {
      type: Boolean,
      default: false,
    },
    showProgressBar: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

// Main form schema
const formSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    elements: [formElementSchema],
    settings: {
      type: formSettingsSchema,
      default: () => ({}),
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    submissionCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better performance
formSchema.index({ createdBy: 1, createdAt: -1 });
formSchema.index({ isActive: 1 });
formSchema.index({ title: "text", description: "text" });

// Instance methods
formSchema.methods.incrementSubmissionCount = function () {
  this.submissionCount += 1;
  return this.save();
};

formSchema.methods.toJSON = function () {
  const form = this.toObject();
  return form;
};

export const Form = mongoose.model("Form", formSchema);
