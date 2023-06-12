import mongoose from "mongoose";

const Schema = mongoose.Schema;

const schema = new Schema({
  name_leader: { type: String, required: "true" },
  name_project: { type: String, required: "true" },
  day_start: { type: Date, default: Date.now() },
  team_size: { type: String, required: "true" },
  budget: { type: Number, default: 0 },
  expense: { type: Number, default: 0 },
  status: { type: String, default: "Working" },
});

export const ProjectModel = mongoose.model("Project", schema);
