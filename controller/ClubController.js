const factory = require("./handlerFactory");

const Club = require("../models/ClubModel")
const Folder = require("../models/FolderModel")

//This is one time only thats why i am not making update and delete routes
exports.createClub = factory.createOne(Club)
exports.getClub = factory.getAll(Club)
exports.getFolders = factory.getAll(Folder)


//Creating a folder in the club
exports.createFolder = async(req,res,next) => {
    try {
        //First we find the group
        const club = await Club.findOne({_id:req.params.id})
        if (club) {
            const folder = await Folder.create(req.body)
            try {
                //We push/add the group id in the group members array
                const updateClub = await Club.updateOne({_id:req.params.id},{
                    $push:{
                        Folders: folder._id
                    }
                    
                })
                res.status(200).json({
                    status:"success",
                    data: this.updateClub
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

// Editing a folder
exports.editFolder = async(req,res,next) => {
    try {
        const res = await Folder.findByIdAndUpdate(req.params.F_id,req.body)
        res.status(200).json({
            status:"success",
            data: res
        })
    }
    catch (err) {
        return res.status(404).json({
            status:"Failed",
            message: err.message
        })
    }
}


//Deleting a folder
exports.deleteFolder = async(req,res,next) => {
    try {
        //First we find the group
        const club = await Club.findOne({_id:req.params.C_id})
        if (club) {
            const already = club.Folders.some(folder => folder._id == req.params.F_id)
            if(!already){
                
                return res.status(404).json({
                    status:"Failed",
                    msg: 'Folder does not exist in the club'
                })
            }
            try {
                //We push/add the group id in the group members array
                const updateClub = await Club.updateOne({_id:req.params.C_id},{
                    $pull:{
                        Folders: req.params.F_id
                    }
                    
                })
                next()

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