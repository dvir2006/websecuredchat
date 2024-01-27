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
        admin_uid: {
            id:{type: mongoose.Schema.Types.ObjectId,ref: 'User',minlength: 3,maxlength:30 ,},
            default: {},
            newMessages:[
                {
                  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                  content: String,
                  timestamp: { type: Date, default: new Date()}
                }
            ], 
        },
        users: [{
            id:{type: mongoose.Schema.Types.ObjectId,ref: 'User',minlength: 3,maxlength:30 , required: true},
            newMessages:[
                {
                  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                  content: String,
                  timestamp: { type: Date, default: new Date()}
                }
            ],
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