const express = require('express');
const router = express.Router();
const stateController = require('../controller/readcsv');

router.post('/create-state', (req, res) => {
    stateController.createAddress(req).then((data) => {
        res.status(201).send(data);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

router.get("/state/:value", (req, res) => {
    stateController.getStates(req).then((data) => {
        res.status(201).send(data);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

router.get("/town/:value", (req, res) => {
    stateController.getCities(req).then((data) => {
        res.status(201).send(data);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

router.get("/district/:value", (req, res) => {
    stateController.getDistricts(req).then((data) => {
        res.status(201).send(data);
    }).catch((err) => {
        res.status(500).send(err);
    });
});


module.exports = router;