const factory = require("./handlerFactory");

const Group = require("../models/GroupModel")
const GroupConversation = require("../models/GroupConversationModel")
const Users = require("../models/UserModel")
const GeneralNotification = require("../models/GeneralNotificationModel")

// exports.createGroup = factory.createOne(Group)
exports.updateGroup = factory.updateOne(Group)
exports.deleteGroup = factory.deleteOne(Group)
exports.getAllGroups = factory.getAll(Group)
exports.getGroup = factory.getOne(Group)

exports.createGroup = async(req, res, next) => {
    try {
        var body = req.body
        var coaches_admin = await Users.find({$or:[{ role: "Admin"}, {role: "Coach"}]},{_id:1})
        if (req.body.Members) {
            var fulldata = coaches_admin.concat(req.body.Members)
          }
          else {
            var fulldata = coaches_admin
          }
        body['Members'] = fulldata
        const group = await Group.create(body)
        if (group) {
            try {
                const groupchat = await GroupConversation.create({
                    _id: group._id,
                    name: group.title,
                    Members : fulldata

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

    }
    catch (err){
        return res.status(404).json({
            status:"Failed to create group",
            message: err.message
        })
    }

    
}

exports.createGroupOnly = async(req, res, next) => {
    try {
        var body = req.body
        var coaches_admin = await Users.find({$or:[{ role: "Admin"}, {role: "Coach"}]},{_id:1})
        if (req.body.Members) {
            var fulldata = coaches_admin.concat(req.body.Members)
          }
          else {
            var fulldata = coaches_admin
          }
        body['Members'] = fulldata
        console.log(body)
        const group = await Group.create(body)

        res.status(201).json({
            status: "success",
      
            data: {
              group,
            },
          });
        
        

    }
    catch (err){
        return res.status(404).json({
            status:"Failed to create group",
            message: err.message
        })
    }

    
}



//get groups of the specific user who created the group
exports.getAllUserGroups = async(req,res, next) => {
    try {
        const AllGroups = await Group.find({refOfUser: req.params.id})
        res.status(200).json({
            status:"success",
            result:AllGroups.length,
            data: AllGroups
        })

    }
    catch (err) {
        return res.status(404).json({
            status:"Failed",
            message: err.message
        })

    }
}
//get groups of player in which he is a member
exports.getAllPlayerGroups = async(req,res,next) => {
    try {
        const AllGroups = await Group.find({Members: req.params.id})
        res.status(200).json({
            status:"success",
            result:AllGroups.length,
            data: AllGroups
        })

    }
    catch (err) {
        return res.status(404).json({
            status:"Failed",
            message: err.message
        })

    }
}


//Add a member in group
exports.addMemberInGroup = async(req,res,next) => {
    try {
        //First we find the group
        const group = await Group.findOne({_id:req.params.G_id})
        const groupchat = await GroupConversation.findOne({_id:req.params.G_id})
        if (group && groupchat) {
            //This is to check whether the member is already in the group or not
            const already = group.Members.some(member => member._id == req.params.U_id)
            && groupchat.Members.some(member => member._id == req.params.U_id)
            if(already){
                
                return res.status(404).json({
                    status:"Failed",
                    msg: 'This User is already a member of group'
                })
            }
            try {
                //We push/add the group id in the group members array
                const updateGroup = await Group.updateOne({_id:req.params.G_id},{
                    $push:{
                        Members: req.params.U_id
                    }
                    
                })
                const updateGroupcaht = await GroupConversation.updateOne({_id:req.params.G_id},{
                    $push:{
                        Members: req.params.U_id
                    }
                    
                })
                const notification = await GeneralNotification.create({
                    refOfUser:req.params.U_id,
                    Content:`You have been added to a new group`
                })

                res.status(200).json({
                    status:"success",
                    data: this.updateGroup
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

//Remove a member from group
exports.removeMemberfromGroup = async(req,res,next) => {
    try {
        //First we find the group
        const group = await Group.findOne({_id:req.params.G_id})
        const groupchat = await GroupConversation.findOne({_id:req.params.G_id})
        
        if (group && groupchat) {
            //This is to check whether the member is already in the group or not
            const already = group.Members.some(member => member._id == req.params.U_id)
            && groupchat.Members.some(member => member._id == req.params.U_id)
            if(!already){
                
                return res.status(404).json({
                    status:"Failed",
                    msg: 'This User is not in this group'
                })
            }
            try {
                //We pull/delete the group id in the group members array
                const updateGroup = await Group.updateOne({_id:req.params.G_id},{
                    $pull:{
                        Members: req.params.U_id
                    }
                
                    
                })
                const updateGroupcaht = await GroupConversation.updateOne({_id:req.params.G_id},{
                    $pull:{
                        Members: req.params.U_id
                    }
                    
                })
                res.status(200).json({
                    status:"success",
                    data: this.updateGroup
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