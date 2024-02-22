import { Prisma, PrismaClient, Supplier } from '@prisma/client';
import prisma from '../config/database/db';

class SupplierService {


    getAll(): Promise<Supplier[]> {
        return prisma.supplier.findMany();
    }

    getOne(id: string): Promise<Supplier | null> {
        return prisma.supplier.findUnique({ where: { id } });
    }

    create(data: any): Promise<Supplier> {
        return prisma.supplier.create({ data });
    }

    update(id: string, data: Partial<Supplier>): Promise<Supplier | null> {
        return prisma.supplier.update({ where: { id }, data });
    }

    delete(id: string): Promise<Supplier | null> {
        return prisma.supplier.delete({ where: { id } });
    }

    findFirst(email: any): Promise<any | null> {
        return prisma.supplier.findFirst({ where: email });
    }

}

export default SupplierService;
