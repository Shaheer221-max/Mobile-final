const factory = require("./handlerFactory");

const Folder = require("../models/FolderModel")
const cloudinary = require("../Cloudinary/Cloudinary");


//This runs after deleting the reference from club, this deletes from the folders collection
exports.deleteFolder = async(req,res,next) => {
    try {
        const deletedFolder = await Folder.deleteOne({_id:req.params.F_id})
        res.status(200).json({
            status: "success",
          });

    }
    catch(err) {
        return res.status(404).json({
            status: "fail",
            message: err.message,
          });
    }
}

//AddFile in folder
exports.addFileinFolder = async(req,res,next) => {
    try {
        const folder = await Folder.findOne({_id:req.params.id})
        const file = req?.files?.file;
        if (folder) {
            const result = await cloudinary.uploader
        .upload(file.tempFilePath, {
          resource_type: "auto",
          upload_preset: "CPC_database",
        })
        .catch((err) => console.log("error", JSON.stringify(err, null, 2)));
            
            try {
                var obj = {
                    filename: file.name,
                    url: result.secure_url
                }
                const updatedFolder = await Folder.updateOne({_id:req.params.id},{
                    $push: {
                        Files:obj
                    }
                })
                res.status(200).json({
                    status:"success",
                    data: this.updatedFolder
                })

            }
            catch(err) {
                return res.status(404).json({
                    status: "fail",
                    message: err.message,
                  });
                
            }
        }

    }
    catch(err) {
        return res.status(404).json({
            status: "fail",
            message: err.message,
          });
    }
}
//Delete a file from a folder
exports.deleteFilefromFolder = async(req,res,next) => {
    try {
        const folder = await Folder.findOne({_id:req.params.id})
        if (folder) {
            try {
                let files = folder.Files
                let obj = files.find(o => o._id == req.body.id);
                console.log(obj)
                const updatedFolder = await Folder.updateOne({_id:req.params.id},{
                    $pull: {
                        Files:obj
                    }
                })
                res.status(200).json({
                    status:"success",
                    data: this.updatedFolder
                })

            }
            catch(err) {
                return res.status(404).json({
                    status: "fail",
                    message: err.message,
                  });
                
            }
        }

    }
    catch(err) {
        return res.status(404).json({
            status: "fail",
            message: err.message,
          });
    }
}

//Getting all files from a specific folder
exports.getAllfolderFiles = async(req,res, next) => {
    try {
        const folder = await Folder.findOne({_id: req.params.id})
        const Files = folder.Files
        console.log(Files)
        res.status(200).json({
            status:"success",
            result:Files.length,
            data: Files
        })
  
    }
    catch (err) {
        return res.status(404).json({
            status:"Failed",
            message: err.message
        })
  
    }
  }