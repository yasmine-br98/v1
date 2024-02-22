import express from 'express'
import superAdminRoutes from './super-admin.routes';

import utilsRoutes from './utils.routes';
import supplierRoutes from './supplier.routes';
import authRoutes from './auth.routes';
import customerRoutes from './customer.routes';

// Routes

const router = express.Router()

router.use(utilsRoutes);
router.use(superAdminRoutes);
router.use('/api', supplierRoutes);
router.use(customerRoutes);
router.use(authRoutes)

export default router
