const moment = require('moment');
let datetime = {}

datetime.getDates = async function (req, res) {
    try {
        const { referenceDate } = req.body;
        if (!referenceDate) {
            throw new Error("Reference date is required");
        }

        const date = moment(referenceDate, 'D MMMM YYYY');

        if (!date.isValid()) {
            throw new Error("Reference date is invalid");
        }

        const startOfWeek = moment(date).startOf('week');
        const endOfWeek = moment(date).endOf('week');
        let dates = [];
        let currentDate = moment(startOfWeek);
        while (currentDate <= endOfWeek) {
            dates = [...dates, currentDate.format('dddd D MMMM YYYY')];
            currentDate = moment(currentDate).add(1, 'days');
        }

        res.status(200).json({
            dates,
        });
    } catch (exception) {
        console.error("Get dates error", exception);
        res.status(400).json({
            message: exception.message,
        });
    }
}

module.exports = datetime;