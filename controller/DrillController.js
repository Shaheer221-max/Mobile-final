const factory = require("./handlerFactory");

const Drill = require("../models/DrillModel")
const cloudinary = require("../Cloudinary/Cloudinary");
const GeneralNotification = require("../models/GeneralNotificationModel")

exports.getAllDrills = factory.getAll(Drill)
exports.deleteDrill = factory.deleteOne(Drill)
exports.updateDrill = factory.updateOne(Drill)

exports.uploadDrill = async(req, res, next) => {
    const file = req?.files?.file;

    try {
        const result = await cloudinary.uploader
          .upload(file.tempFilePath, {
            resource_type: "auto",
            upload_preset: "CPC_database",
          })
          .catch((err) => console.log("error", JSON.stringify(err, null, 2)));
  
        const drill = new Drill({
          drilltitle: req.body.drilltitle,
          description: req.body.description,
          video: result.secure_url,
          refOfVideoCat: req.body.refOfVideoCat,
          refOfUser: req.body.refOfUser,
        });

        const notification = await GeneralNotification.create({
          refOfUser:null,
          Content:`New Drill Video Added`,
          for:"Player"
      })
  
        drill.save().then(
          res.status(200).json({
            msg: "psot",
            data: drill,
          })
        );
      } catch (err) {
        return res.status(404).json({
          status: "Failed",
          message: err.message,
        });
      }


  
}







