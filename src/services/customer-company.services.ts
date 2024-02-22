import { CustomerCompany } from '@prisma/client';
import prisma from "../config/database/db";

class CustomerCompanyService {

    async getAll(): Promise<CustomerCompany[]> {
        return prisma.customerCompany.findMany();
    }

    async getOne(id: string): Promise<CustomerCompany | null> {
        return prisma.customerCompany.findUnique({ where: { id } });
    }



    async create(data: any): Promise<CustomerCompany> {
        return prisma.customerCompany.create({ data: data });
    }

    async update(id: string, updatedCustomerCompany: CustomerCompany): Promise<CustomerCompany> {
        return prisma.customerCompany.update({ where: { id }, data: updatedCustomerCompany });
    }

    async delete(id: string): Promise<CustomerCompany> {
        return prisma.customerCompany.delete({ where: { id } });
    }
}

export default CustomerCompanyService;
