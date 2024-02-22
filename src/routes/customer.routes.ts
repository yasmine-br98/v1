import express from 'express';
import CustomerController from '../controllers/customer.controllers';

const router = express.Router();

router.get('/customer', CustomerController.getAll);
router.get('/customer/:id', CustomerController.getOne);
router.post('/customer', CustomerController.create);
router.put('/customer/:id', CustomerController.update);
router.delete('/customer/:id', CustomerController.delete);

export default router;
