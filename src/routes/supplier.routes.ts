import express from 'express';
import SupplierController from '../controllers/supplier.controllers';

const supplierController = new SupplierController();
const router = express.Router();

router.get('/suppliers', supplierController.getAll);
router.get('/suppliers/:id', supplierController.getOne);
router.post('/suppliers', supplierController.create);
router.put('/suppliers/:id', supplierController.update);
router.delete('/suppliers/:id', supplierController.delete);

export default router;
