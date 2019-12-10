const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new Schema({
    states: {
        statesName: {type: String},
        urbanStatus:{type:String},
        stateCode:{type:String},
        districts: {
            districtName: {type: String },
            districtCode:{type:String},
            cities: {
                cityName: { type: String}
            }
        }
    }
});

module.exports = mongoose.model('stateSchema', stateSchema);