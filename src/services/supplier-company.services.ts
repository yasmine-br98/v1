import { SupplierCompany } from '@prisma/client';
import prisma from "../config/database/db";

class SupplierCompanyService {

    async getAll(): Promise<SupplierCompany[]> {
        return prisma.supplierCompany.findMany();
    }

    async getOne(id: string): Promise<SupplierCompany | null> {
        return prisma.supplierCompany.findUnique({ where: { id } });
    }


    async create(data: any): Promise<SupplierCompany> {

        return prisma.supplierCompany.create({ data: data });
    }

    async update(id: string, updatedSupplierCompany: SupplierCompany): Promise<SupplierCompany> {
        return prisma.supplierCompany.update({ where: { id }, data: updatedSupplierCompany });
    }

    async delete(id: string): Promise<SupplierCompany> {
        return prisma.supplierCompany.delete({ where: { id } });
    }
}

export default SupplierCompanyService;
