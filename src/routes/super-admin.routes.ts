import express from 'express';
import SuperAdminController from '../controllers/super-admin.controllers';

const router = express.Router();

router.get('/super-admins', SuperAdminController.getAll);
router.get('/super-admins/:id', SuperAdminController.getOne);
router.post('/super-admins', SuperAdminController.create);
router.put('/super-admins/:id', SuperAdminController.update);
router.delete('/super-admins/:id', SuperAdminController.delete);

export default router;
