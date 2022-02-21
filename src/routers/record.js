const express = require('express')
const Record = require('../models/record')
const router = new express.Router()
const _ = require('lodash')
const moment = require('moment')

const validInputParams = ['startDate', 'endDate', 'minCount', 'maxCount']

router.post('/records', async (req, res) => {
    try {
        var reqParams = Object.keys(req.body)
        var resultObject = {}
        if (_.xor(validInputParams, reqParams).length > 0) {  //Check if the request body has valid arguments
            _.set(resultObject, 'code', 9)
            _.set(resultObject, 'msg', "Invalid Arguments")
            _.set(resultObject, 'records', [])
        } else {
            let startDate = moment(_.get(req, ['body', 'startDate']), 'YYYY-MM-DD').toDate()
            let endDate = moment(_.get(req, ['body', 'endDate']), 'YYYY-MM-DD').toDate()
            let minCount = _.get(req, ['body', 'minCount'])
            let maxCount = _.get(req, ['body', 'maxCount'])
            //Aggregate query to fetch data based on above filters
            let query = [
                {
                    $project: {
                        _id: 0,
                        key: 1,
                        createdAt: 1,
                        totalCount: { $sum: "$counts" }
                    }
                }, {
                    $match: {
                        createdAt: {
                            $gte: startDate,
                            $lte: endDate
                        },
                        totalCount: {
                            $gte: minCount,
                            $lte: maxCount
                        }
                    }
                }
            ]
            let records = await Record.aggregate(query)
            if (records.length > 0) {
                _.set(resultObject, 'code', 0)
                _.set(resultObject, 'msg', "Success")
                _.set(resultObject, 'records', records)
            } else {
                _.set(resultObject, 'code', 1)
                _.set(resultObject, 'msg', "No Record Found")
                _.set(resultObject, 'records', [])
            }
        }
        res.status(200).send(resultObject)
    } catch (e) {
        _.set(resultObject, 'code', 10)
        _.set(resultObject, 'msg', "Internal Server Error")
        _.set(resultObject, 'records', [])
        res.status(500).send(resultObject)
    }
})

module.exports = router