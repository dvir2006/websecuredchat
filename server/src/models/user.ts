import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            minlength: 3,
            maxlength:30
            },
        email: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 200,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 3,
            maxlength:1024
        },
        otpSecret: {
            type: String, 
            default: '123234' 
        },
        otpTimestamp: {
            type: Number, 
            default: 0 
        }
    },
    {
        timestamps: true
    }
);
const userModel = mongoose.model('User', UserSchema);

export default userModel;