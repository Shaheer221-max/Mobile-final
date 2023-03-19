const factory = require("./handlerFactory");

const Attendance = require("../models/AttendanceModel")
const GeneralNotification = require("../models/GeneralNotificationModel")

// exports.createAttendance = factory.createOne(Attendance)

exports.createAttendance = async(req,res) => {
    try {
        const doc = await Attendance.create(req.body);
        const notification = await GeneralNotification.create({
            refOfUser:null,
            Content:`Attendance Marked. Please Check for Validation`,
            for:"Player"
        })
        res.status(201).json({
          status: "success",
    
          data: {
            doc,
          },
        });
      } catch (err) {
        console.log(err);
        res.status(404).json({
          status: "fail",
          message: err.message,
        });
      }
    
}
exports.getAttendance = factory.getOne(Attendance)
exports.getAllAttendance = factory.getAll(Attendance)

exports.getAttendanceofPlayer = async(req,res) => {
  try {
    const attendance = await Attendance.find({
      attendance: {$elemMatch:{refOfPlayer:req.params.id}}
    })

    res.status(201).json({
      status: "success",
      result:attendance.length,
      data: {
        attendance,
      },
    });



  }
  catch(err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });


  }
}

