const factory = require("./handlerFactory");

const Event = require("../models/EventModel")
const GeneralNotification = require("../models/GeneralNotificationModel")

exports.deleteEvent = factory.deleteOne(Event)
exports.getEvents = factory.getAll(Event)
 //for scheduling an event
exports.createEvent = async(req,res, next) => {
    try {
        const date = new Date().getTime()
        const eventdate = new Date(req.body.date).getTime()
        if (eventdate <= date) {
            const event = new Event({
                title: req.body.title,
                description: req.body.description,
                date : req.body.date,
                isHistory: true,
                offDay: req.params.offDay
            })

            const notification = await GeneralNotification.create({
                refOfUser:null,
                Content:`A new Event has been scheduled`,
                for:"Player"
            })

            event.save().then(
                res.status(200).json({
                    msg:"Event Scheduled",
                    data: event
                })
            )
        }
        else if (eventdate > date) {
            const event = new Event({
                title: req.body.title,
                description: req.body.description,
                date : req.body.date,
                isHistory: false,
                offDay: req.params.offDay
            })

            const notification = await GeneralNotification.create({
                refOfUser:null,
                Content:`A new Event has been scheduled`,
                for:"Player"
            })

            event.save().then(
                res.status(200).json({
                    msg:"Event Scheduled",
                    data: event
                })
            )
        }
       
    }
    catch (err) {
        return res.status(404).json({
            status:"Failed",
            message: err.message
        })

    }
}

//for setting an offday
exports.createOffday = async(req, res, next) => {
    try {
        const event = new Event({
            date : req.body.date,
            offDay: true
        })

        event.save().then(
            res.status(200).json({
                msg:"Event Scheduled",
                data: event
            })
        )

    }
    catch (err) {
        return res.status(404).json({
            status:"Failed",
            message: err.message
        })
    }
}

//for updating an event
exports.updateEvent = async(req,res, next) => {
    try {
        const date = new Date().getTime()
        const eventdate = new Date(req.body.date).getTime()
        if (eventdate <= date) {
            const event = await Event.findByIdAndUpdate({_id:req.params.id},{
                title: req.body.title,
                description: req.body.description,
                date : req.body.date,
                isHistory: true,
                offDay: req.params.offDay
            })

            res.status(200).json({
                status:"Event Updated",
                data: this.event
            })

            
        }
        else if (eventdate > date) {
            const event = await Event.findByIdAndUpdate({_id:req.params.id},{
                title: req.body.title,
                description: req.body.description,
                date : req.body.date,
                isHistory: false,
                offDay: req.params.offDay
            })

            res.status(200).json({
                status:"Event Updated",
                data: this.event
            })

            
        }
       
    }
    catch (err) {
        return res.status(404).json({
            status:"Failed",
            message: err.message
        })

    }
}