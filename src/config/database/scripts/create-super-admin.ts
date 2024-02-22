import bcrypt from 'bcrypt';
import { PrismaClient, SuperAdmin } from '@prisma/client';

const prisma = new PrismaClient();

interface SuperAdminData {
    email: string;
    password: string;
}

const createSuperAdmin = async (superAdminData: SuperAdminData): Promise<SuperAdmin> => {
    const existingSuperAdmin = await prisma.superAdmin.findFirst();

    if (existingSuperAdmin) {
        throw new Error('Super admin already exists.');
    }

    const hashedPassword = await bcrypt.hash(superAdminData.password, 10);

    return prisma.superAdmin.create({
        data: {
            email: superAdminData.email,
            password: hashedPassword,
            firstName: 'DefaultFirstName',
            lastName: 'DefaultLastName',
            phoneNumber: 'DefaultPhoneNumber'
        },
    });
}

export default createSuperAdmin;
