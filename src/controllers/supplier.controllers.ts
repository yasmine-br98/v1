import { Request, Response } from 'express';
import SupplierService from '../services/supplier.services';

const supplierServices = new SupplierService();

class SupplierController {

    getAll = async (req: Request, res: Response) => {
        const suppliers = await supplierServices.getAll();
        res.status(200).json(suppliers);
    };

    getOne = async (req: Request, res: Response) => {
        const { id } = req.params;
        const supplier = await supplierServices.getOne(id);
        if (supplier) {
            res.status(200).json(supplier);
        } else {
            res.status(404).json({ message: 'Supplier not found' });
        }
    };

    create = async (req: Request, res: Response) => {
        try {
            const newSupplier = await supplierServices.create(req.body);
            res.status(201).json(newSupplier);
        } catch (error) {
            res.status(400).json({ error: 'Error creating supplier', err: error });
        }
    };

    update = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const updatedSupplier = await supplierServices.update(id, req.body);
            res.status(200).json(updatedSupplier);
        } catch (error) {
            res.status(404).json({ message: 'Supplier not found' });
        }
    };

    delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            await supplierServices.delete(id);
            res.json({ message: 'Supplier deleted successfully' });
        } catch (error) {
            res.status(404).json({ message: 'Supplier not found' });
        }
    };

}

export default SupplierController;
