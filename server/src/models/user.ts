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
        }
    },
    {
        timestamps: true
    }
);
const userModel = mongoose.model('User', UserSchema);

export default userModel;