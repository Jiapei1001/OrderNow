import express from 'express'
import {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
} from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleWare.js'

const router = express.Router()
router.route('/').post(protect, addOrderItems)

/* the sequence of myorders and :id is important!!!
Hi,

Can someone explain to me why if I set the routes in this order it works :

router.route("/").post(protect, addOrderItems);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
But if I change the 2nd and the 3rd one, it break :

router.route("/").post(protect, addOrderItems);
router.route("/:id").get(protect, getOrderById);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id/pay").put(protect, updateOrderToPaid);
The error message is Cast to ObjectId failed for value "myorders" at path "_id" for model "Order"


Answer:
in second case when you send this request:
/api/orders/myorders
then this API responds:
router.route("/:id").get(protect, getOrderById);
because it suppose `myorders` and `:id` and do not run this one:
router.route("/myorders").get(protect, getMyOrders);   */

// get user's orders
router.route('/myorders').get(protect, getMyOrders)

// get order by id's route
router.route('/:id').get(protect, getOrderById)

// put paid order to data base, and route to payment
router.route('/:id/pay').put(protect, updateOrderToPaid)

export default router
