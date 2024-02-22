import { Request, Response } from 'express';
import SuperAdminService from '../services/super-admin.service';

const superAdminServices = new SuperAdminService()


class SuperAdminController {

  static getAll = async (req: Request, res: Response) => {
    const superAdmins = await superAdminServices.getAll();
    res.status(200).json(superAdmins);
  };

  static getOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    const superAdmin = await superAdminServices.getOne(id);
    if (superAdmin) {
      res.status(200).json(superAdmin);
    } else {
      res.status(404).json({ message: 'SuperAdmin not found' });
    }
  };

  static create = async (req: Request, res: Response) => {
    try {
      const newSuperAdmin = await superAdminServices.create(req.body);
      res.status(201).json(newSuperAdmin);
    } catch (error) {
      res.status(400).json({ error: 'Error creating superAdmin', err: error });
    }
  };

  static update = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const updatedSuperAdmin = await superAdminServices.update(id, req.body);
      res.status(200).json(updatedSuperAdmin);
    } catch (error) {
      res.status(404).json({ message: 'SuperAdmin not found' });
    }
  };

  static delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await superAdminServices.delete(id);
      res.json({ message: 'SuperAdmin deleted successfully' });
    } catch (error) {
      res.status(404).json({ message: 'SuperAdmin not found' });
    }
  };



} export default SuperAdminController;