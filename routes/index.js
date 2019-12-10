const stateRoutes = require('../routes/readcsv');

module.exports = (app) => {

    app.use('/api', stateRoutes);
}