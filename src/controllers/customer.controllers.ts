import { Request, Response } from 'express';
import SupplierService from '../services/supplier.services';
import CustomerService from '../services/customer.services';

const customerServices = new CustomerService()


class CustomerController {

    static getAll = async (req: Request, res: Response) => {
        const customers = await customerServices.getAll();
        res.status(200).json(customers);
    };

    static getOne = async (req: Request, res: Response) => {
        const { id } = req.params;
        const customer = await customerServices.getOne(id);
        if (customer) {
            res.status(200).json(customer);
        } else {
            res.status(404).json({ message: 'Customer not found' });
        }
    };

    static create = async (req: Request, res: Response) => {
        try {
            const newCustomer = await customerServices.create(req.body);
            res.status(201).json(newCustomer);
        } catch (error) {
            res.status(400).json({ error: 'Error creating customer', err: error });
        }
    };

    static update = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const updateCustomer = await customerServices.update(id, req.body);
            res.status(200).json(updateCustomer);
        } catch (error) {
            res.status(404).json({ message: 'Customer not found' });
        }
    };

    static delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            await customerServices.delete(id);
            res.json({ message: 'Customer deleted successfully' });
        } catch (error) {
            res.status(404).json({ message: 'Customer not found' });
        }
    };



} export default CustomerController;