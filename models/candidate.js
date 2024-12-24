const mongoose = require('mongoose')
const { type } = require('os')
const { boolean } = require('webidl-conversions');
const User = require('./user');

const candidateSchema = new mongoose.Schema({
    name:{
        type:String,
        required :true
    },
    party:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    votes:[
        {
            user:{
                type:  mongoose.Schema.Types.ObjectId,
                ref:User,
                required:true
            },
            votedAt:{
                type:Date,
                default:Date.now()
            }
        }
    ],
    voteCount:{
        type:Number,
        default :0 
    }

});
const Candidate = mongoose.model('candiate',candidateSchema)
module.exports = Candidate