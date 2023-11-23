import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["private", "group"],
            required: true,
            minlength: 5,
            maxlength:8    
        },
        name: {
            type: String,
            required: false,
            minlength: 3,
            maxlength:30  
        },
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        messages: [
            {
              sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
              content: String,
              timestamp: { type: Date, default: new Date()}
            }
        ],
    },
    {
        timestamps: true
    }
);
const chatModel = mongoose.model('Chat', ChatSchema);

export default chatModel;