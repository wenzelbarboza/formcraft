import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Form",
      required: true,
    },
    responses: {
      type: Map,
      of: mongoose.Schema.Types.Mixed, // Can store string, number, boolean, array
      required: true,
    },
    submitterEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    submitterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    ipAddress: String,
    userAgent: String,
  },
  {
    timestamps: true,
  }
);

// Indexes for submissions
submissionSchema.index({ formId: 1, submittedAt: -1 });
submissionSchema.index({ submitterEmail: 1 });
submissionSchema.index({ submitterId: 1 });

// Instance methods for submission
submissionSchema.methods.toJSON = function () {
  const submission = this.toObject();
  // Convert Map to regular object for JSON serialization
  submission.responses = Object.fromEntries(submission.responses);
  return submission;
};

export const FormSubmission = mongoose.model(
  "FormSubmission",
  submissionSchema
);
