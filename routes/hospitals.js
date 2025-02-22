const express = require('express');
const { getHospitals, getHospital, createHospital, updateHospital, deleteHospital } = require('../controllers/hospitals');

// Include other resource routers
const appointmentRouter = require('./appointments');

const router = express.Router();

const { protect,authorize } = require('../middleware/auth');

// Re-route into other resource routers
router.use('/:hospitalId/appointments', appointmentRouter);

/*router.get('/', (req, res) => {
    res.status(200).json({ success: true, msg: 'Show all hospitals' });
});

router.get('/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `Show hospital ${req.params.id}` });
});

router.post('/', (req, res) => {
    res.status(200).json({ success: true, msg: 'Create new hospitals' });
});

router.put('/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `Update hospital ${req.params.id}` });
});

router.delete('/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `Delete hospital ${req.params.id}` });
});*/

router.route('/').get(getHospitals).post(protect, authorize('admin'),createHospital);
router.route('/:id').get(getHospital).put(protect, authorize('admin'), updateHospital).delete(protect, authorize('admin'),deleteHospital);

module.exports = router;