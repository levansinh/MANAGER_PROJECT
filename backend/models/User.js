import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const schema = new Schema(
    {
        username: { type: String ,required:"true"},
        password: { type: String ,required:"true"},
        email: { type: String,required:"true" },
        phone: { type: String,required:"true" },
        address: { type: String,required:"true" },
        image: { type: String,default:null},
        role: {type: Number,default:0}
        },
        {timestamps:true}
);

export const UserModel = mongoose.model('User',schema)