const csv = require('csv-parser')
const path = require('path')
const fs = require('fs');
const stateModel = require('../models/address');

module.exports = class csvClasscontroller {
    static createAddress(requestdata) {
        return new Promise(async (resolve, reject) => {
            let filePath = path.join(__dirname + '/../files/citylist.csv');
            try {
                await fs.createReadStream(filePath)
                    .pipe(csv())
                    .on('data', async (row) => {
                        if (row) {
                            // for (let state of row) {
                                const State = new stateModel({
                                    'states.statesName': row.State,
                                    'states.urbanStatus': row['Urban Status'],
                                    'states.stateCode': row['State Code'],
                                    'states.districts.districtName': row['District'],
                                    'states.districts.districtCode': row['District Code'],
                                    'states.districts.cities.cityName': row['City/Town']
                                });
                                State.save().then((res) => {
                                    resolve(res);
                                }).catch((e) => {
                                    reject(e);
                                });
                           // }
                        }
                    })
            } catch (e) {
                console.log(e, 'error');
            }       
        });
    }

  static getStates(requestObject){
    return new Promise(async (resolve, reject) => {
        stateModel.aggregate([{$match: {'states.statesName':{$regex:requestObject.params.value} }},
        {$group: {_id: null, 'States': {$push: { State:'$states.statesName' ,
            District_code:'$states.districts.districtCode' , District:'$states.districts.districtName' }}}},
     ]).then((res)=>{
         resolve({message:'Successfully retrived all states ', result:res},
         (err)=>{
             reject({message:'Unable to retrive states'})
         })
     })
    })
  }

  static getCities(requestObject){
    return new Promise(async (resolve, reject) => {
        stateModel.aggregate([{$match: {'states.districts.cities.cityName':{$regex:requestObject.params.value} }},
        {$group: {_id: null, Towns: {$push: {
            town:'$states.districts.cities.cityName' ,State:'$states.statesName' , District:'$states.districts.districtName' }}}},
     ]).then((res)=>{
         resolve({message:'Successfully retrived all cities ', result:res},
         (err)=>{
             reject({message:'Unable to retrive cities'})
         })
     })
    })
  }

  static getDistricts(requestObject){
    return new Promise(async (resolve, reject) => {
        stateModel.aggregate([{$match: {'states.districts.districtName':{$regex:requestObject.params.value} }},
        {$group: {_id: null, Districts: {$push: {
            town:'$states.districts.cities.cityName',Urban_Status:'$states.urbanStatus', StatusCode: '$states.stateCode' ,State:'$states.statesName' ,
           District_code:'$states.districts.districtCode', District:'$states.districts.districtName' }}}},
     ]).then((res)=>{
         resolve({message:'Successfully retrived all districts ', result:res},
         (err)=>{
             reject({message:'Unable to retrive districts'})
         })
     })
    })
  }
}


