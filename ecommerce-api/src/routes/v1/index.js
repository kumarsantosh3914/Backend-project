const express = require('express');

const {
    getAllOrders,
    getSingleOrder,
    getCurrentUserOrders,
    createOrder,
    updateOrder,
} = require('../../controllers/order-controller');

const {
    authenticateUser,
    authorizePermissions,
} = require('../../middleware/authentication');


const router = express.Router();


router.route('/')
    .post(authenticateUser, createOrder)
    .get(authenticateUser, authorizePermissions('admin'), getAllOrders);

router.route('/showAllMyOrders').get(authenticateUser, getCurrentUserOrders);

router.route('/:id')
    .get(authenticateUser, getSingleOrder)
    .patch(authenticateUser, updateOrder);

module.exports = router;


