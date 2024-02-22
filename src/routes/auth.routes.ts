import express from 'express';
import AuthController from '../controllers/auth.controllers';
import { notEmpty, validate } from '../middlewares/validate.middlewares';

const authController = new AuthController();
const router = express.Router();
// Middleware de validation global
//router.use(validate);

router.post('/register/supplier', authController.registerSupplier);
router.post('/register/customer', authController.registerCustomer);
//router.post('/login', authController.login)

export default router;
