const mongoose = require('mongoose')
const { type } = require('os')
const { boolean } = require('webidl-conversions')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required :true
    },
    age:{
        type:Number,
        required:true
    },
    email:{
        type:String,
    },
    mobile:{
        type:String,
    },
    address:{
        type:String,
        required:true
    },
    adharNumber:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['voter','admin'],
        default:'voter'
    },
    isVoted:{
        type:Boolean,
        default:false
    }
});
userSchema.pre('save',async function(next){
    const person = this;
    if(!person.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(person.password,salt);
        person.password = hashedPassword;
        next();
    } catch (error) {
        return next(error)
    }
})
userSchema.methods.comparePassword = async function(candidatePassword){
    try {
        const isMatch = await bcryprt.compare(candidatePassword,this.password);
        return isMatch
    } catch (error) {
        throw error
    }
}
const User = mongoose.model('user',userSchema)
module.exports = User