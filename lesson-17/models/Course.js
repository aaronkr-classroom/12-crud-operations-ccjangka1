// models/Course.js
"use strict";

/**
 * Listing 17.6 (p. 249)
 * 새로운 스키마와 모델의 생성
 */
const mongoose = require("mongoose"),
  courseSchema = mongoose.Schema({
    _id: { //warning:
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    prince: {
      type: Number,
      required: true,
      min: 0
    },
    courseImg: {
      type: String
    }
  });

  courseSchema.method.getINfo = () => {
    return `Title: ${this.title} Description: ${this.description}`
  };

  courseSchema.method.findSamePrice = () => {
    return this.model("Course")
    .find({price : this.price})
    .exec();
  };

  courseSchema.method.findDiscountPrice = (price) => {
    return this.model("Course")
    .find({price : {$lt: price}})
    .exec();
  };

  courseSchema.virtual("subscribers",{
    ref: "Subscriber",
    locaField: "_id",
    foreignField: "courses"
  });

  courseSchema.set("toObject", {virtual:true });
  courseSchema.set("toJSON", {virtual:true });

module.exports = mongoose.model("Course", courseSchema);
