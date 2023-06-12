import { ProjectModel } from "../models/Project.js";
import jwt from "jsonwebtoken";
export const projectController = {
  //GET PROJECT
  getAll: async (req, res) => {
    try {
      const project = await ProjectModel.find();
      res.status(200).json({
        data: project,
        success: "success",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getOne: async (req, res) => {
    try {
      const project = await ProjectModel.findOne({ _id: req.params.id });
      res.status(200).json({
        data: project,
        success: "success",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //ADD PROJECT
  create: async (req, res) => {
    try {
      const project = await new ProjectModel({
        name_leader: req.body.name_leader,
        name_project: req.body.name_project,
        team_size: req.body.team_size,
        budget: req.body.budget,
        expense: req.body.expense,
      });
      const result = await project.save();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //UPDATE PROJECT
  update: async (req, res) => {
    try {
      const result = await ProjectModel.updateOne(
        { _id: req.params.id },
        {
          name_leader: req.body.name_leader,
          name_project: req.body.name_project,
          team_size: req.body.team_size,
          budget: req.body.budget,
          expense: req.body.expense,
        }
      );
      res.status(200).json({ message: "success", data: result });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //DELETE PROJECT
  delete: async (req, res) => {
    ProjectModel.findByIdAndRemove(req.params.id)
    .then(data=>{
      if(data){
        res.status(200).json({
          message: 'Project deleted successfully',
          data:data
        });
      }else{
        res.status(403).json({
          message: 'Project deleted failed',
        });
      }
    })
    .catch((err)=>{
      res.status(500).json(err)
    })
  },
};
