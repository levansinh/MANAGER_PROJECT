import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const schema = new Schema(
    {
        project_name: { type: String ,required:"true"},
        task_name: { type: String ,required:"true"},
        description: { type: String,required:"true" },
        assigned_to: { type: String,required:"true" },
        priority: {type: String,default:'normal'},
        status: { type: String,default:"hoding" },
        },
        {
            timestamps:true
        }
);

export const TaskModel = mongoose.model('Task',schema)