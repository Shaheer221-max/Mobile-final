const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupConversationSchema = new Schema({
  groupimage: {
    type:String,
    default:"https://res.cloudinary.com/vehiclebuddy/image/upload/v1665413220/rgyax6nangke0c7ssg5c.jpg"

  },
  Members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  messages: [
    {
      sender: { type: Schema.Types.ObjectId, ref: 'User' },
      content: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    }
  ],
  name: { type: String, required: true },
});

GroupConversationSchema.methods.sendMessage = function(sender, content) {
    this.messages.push({ sender, content });
    return this.save();
  };
  
GroupConversationSchema.methods.getMessages = function() {
    return this.messages;
  };

GroupConversationSchema.pre(/^find/, function (next) {
    // This middleware lets you get user details who posted it
    this.populate({
      path: "Members",
    });
    next();
  });

const GroupConversation = mongoose.model('GroupConverstaion', GroupConversationSchema);
module.exports = GroupConversation