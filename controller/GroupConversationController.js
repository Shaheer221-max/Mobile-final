const factory = require("./handlerFactory");


const GroupConversation = require("../models/GroupConversationModel");
const Users = require("../models/UserModel")
const GeneralNotification = require("../models/GeneralNotificationModel")

exports.deleteGroupChat = factory.deleteOne(GroupConversation)

exports.createGroupChat = async(req,res) => {
  try {
    var body = req.body
    var coaches_admin = await Users.find({$or:[{ role: "Admin"}, {role: "Coach"}]},{_id:1})
    if (req.body.Members) {
      var fulldata = coaches_admin.concat(req.body.Members)
    }
    else {
      var fulldata = coaches_admin
    }
    body['Members'] = coaches_admin
    const groupchat = await GroupConversation.create({
      name: req.body.title,
      Members : fulldata,
      groupimage: req.body.groupimage,
  })

  res.status(201).json({
      status: "success",

      data: {
        groupchat,
      },
    });
  }
  catch(err) {
    return res.status(404).json({
      status:"Failed to create group conversation",
      message: err.message
  })

  }
}

exports.sendMessage = async (req, res) => {
    try {
      const { sender, content } = req.body;
      const groupChat = await GroupConversation.findById(req.params.id);
      await groupChat.sendMessage(sender, content);
      res.json({ message: 'message sent' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.getMessages = async (req, res) => {
    try {
      const groupChat = await GroupConversation.findById(req.params.id);
      res.json(groupChat.getMessages());
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.getGroupConversation = async (req, res, next) => {
    try {
      console.log(req.params.id);
      const getConversation = await GroupConversation.find({
        Members: { $in: [req.params.id] },
      });
  
      res.status(200).json({
        result: getConversation.length,
        data: getConversation,
        currentUser: req.params.id,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  };

  // Get Conversation by id
exports.getGroupConversationById = async (req, res, next) => {
  try {
    const getConversation = await GroupConversation.findById(req.params.id);
    res.status(200).json({
      result: getConversation.length,
      data: getConversation,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};


  exports.addMemberInGroupChat = async(req,res,next) => {
    try {
        //First we find the group
        const groupchat = await GroupConversation.findOne({_id:req.params.G_id})
        if (groupchat) {
            //This is to check whether the member is already in the group or not
            const already = groupchat.Members.some(member => member._id == req.params.U_id)
            if(already){
                
                return res.status(404).json({
                    status:"Failed",
                    msg: 'This User is already a member of groupchat'
                })
            }
            try {
                //We push/add the group id in the group members array
                const updateGroupChat = await GroupConversation.updateOne({_id:req.params.G_id},{
                    $push:{
                        Members: req.params.U_id
                    }
                    
                })
                const notification = await GeneralNotification.create({
                    refOfUser:req.params.U_id,
                    Content:`You have been added to a new groupchat`,
                })

                res.status(200).json({
                    status:"success",
                    data: this.updateGroupChat
                })

            }
            catch (err) {
                return res.status(404).json({
                    status:"Failed",
                    message: err.message
                })
            }
        }

    }
    catch (err) {
        return res.status(404).json({
            status:"Failed",
            message: err.message
        })
    }
}


exports.removeMemberfromGroupChat = async(req,res,next) => {
  try {
      //First we find the group
      const groupchat = await GroupConversation.findOne({_id:req.params.G_id})
      
      if (groupchat) {
          //This is to check whether the member is already in the group or not
          const already = groupchat.Members.some(member => member._id == req.params.U_id)
          if(!already){
              
              return res.status(404).json({
                  status:"Failed",
                  msg: 'This User is not in this groupchat'
              })
          }
          try {
              //We pull/delete the group id in the group members array
              const updateGroupchat = await GroupConversation.updateOne({_id:req.params.G_id},{
                  $pull:{
                      Members: req.params.U_id
                  }
              
                  
              })
              
              res.status(200).json({
                  status:"success",
                  data: this.updateGroupchat
              })

          }
          catch (err) {
              return res.status(404).json({
                  status:"Failed",
                  message: err.message
              })
          }
      }

  }
  catch (err) {
      return res.status(404).json({
          status:"Failed",
          message: err.message
      })
  }
}

