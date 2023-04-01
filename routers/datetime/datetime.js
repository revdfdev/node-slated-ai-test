const moment = require('moment');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
let datetime = {}
const uuid = require('uuid');

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
            dates = [...dates, {
                id: uuid.v4(),
                date: currentDate.format('dddd D MMMM YYYY'),
            }];
            currentDate = moment(currentDate).add(1, 'days');
        }

        const csvWriter = createCsvWriter({
            path: __dirname + "/../../files/" + date.format("DD-MM-YYYY") + "-" + moment().format("hh:mm:ss") + '-dates.csv',
            header: [
                {
                    id: 'id',
                    title: 'ID'
                },
                {
                    id: 'date',
                    title: 'Date'
                },
            ]
        })

        await csvWriter.writeRecords(dates);

        console.log("The CSV file was written successfully");

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

datetime.getFirstDateLastDate = async function (req, res) {
    try {
        const { referenceDate } = req.body;

        if (!referenceDate) {
            throw new Error("Reference date is required");
        }

        const date = moment(referenceDate, 'D MMMM YYYY');

        if (!date.isValid()) {
            throw new Error("Reference date is invalid");
        }

        const firstDayOfMonth = date.clone().startOf('month');
        const lastDayOfMonth = date.clone().endOf('month');

        res.status(200).json({
            firstDayOfMonth: firstDayOfMonth.format('dddd D MMMM YYYY'),
            lastDayOfMonth: lastDayOfMonth.format('dddd D MMMM YYYY'),
        })
    } catch (exception) {
        console.error("Get first date last date error", exception);
        res.status(400).json({
            message: exception.message,
        });
    }
}

datetime.getFirstDateLastDateYear = async function (req, res) {
    try {
        const { referenceDate } = req.body;

        if (!referenceDate) {
            throw new Error("Reference date is required");
        }

        const date = moment(referenceDate, 'D MMMM YYYY');

        if (!date.isValid()) {
            throw new Error("Reference date is invalid");
        }

        const firstDayOfYear = date.clone().startOf('year');
        const lastDayOfYear = date.clone().endOf('year');

        res.status(200).json({
            firstDayOfYear: firstDayOfYear.format('dddd D MMMM YYYY'),
            lastDayOfYear: lastDayOfYear.format('dddd D MMMM YYYY'),
        })
    } catch (exception) {
        console.error("Get first date last date year error", exception);
        res.status(400).json({
            message: exception.message,
        });
    }
}

module.exports = datetime;