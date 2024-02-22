import { Prisma, PrismaClient, SuperAdmin } from '@prisma/client';
import prisma from '../config/database/prisma';


class SuperAdminService {

    getAll(): Promise<SuperAdmin[]> {
        return prisma.superAdmin.findMany();
    }

    getOne(id: string): Promise<SuperAdmin | null> {
        return prisma.superAdmin.findUnique({ where: { id } });
    }

    create(data: any): Promise<SuperAdmin> {
        return prisma.superAdmin.create({ data });
    }

    update(id: string, data: Partial<SuperAdmin>): Promise<SuperAdmin | null> {
        return prisma.superAdmin.update({ where: { id }, data });
    }

    delete(id: string): Promise<SuperAdmin | null> {
        return prisma.superAdmin.delete({ where: { id } });
    }
}

export default SuperAdminService;


