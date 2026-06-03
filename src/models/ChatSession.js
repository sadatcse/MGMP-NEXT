import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const MessageSchema = new Schema({
  role: {
    type: String,
    required: true,
    enum: ['user', 'model']
  },
  text: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const ChatSessionSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: false
  },
  mobile: {
    type: String,
    required: [true, 'Mobile number is required']
  },
  ip: {
    type: String
  },
  messages: [MessageSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const ChatSession = mongoose.models.ChatSession || model('ChatSession', ChatSessionSchema);

export default ChatSession;
