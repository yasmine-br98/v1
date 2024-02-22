import { Customer } from '@prisma/client';
import prisma from '../config/database/prisma';


class CustomerService {

    getAll(): Promise<Customer[]> {
        return prisma.customer.findMany();
    }

    getOne(id: string): Promise<Customer | null> {
        return prisma.customer.findUnique({ where: { id } });
    }

    create(data: any): Promise<Customer> {
        return prisma.customer.create({ data });
    }
    update(id: string, data: Partial<Customer>): Promise<Customer | null> {
        return prisma.customer.update({ where: { id }, data });
    }

    delete(id: string): Promise<Customer | null> {
        return prisma.customer.delete({ where: { id } });
    }

    findFirst(filter: any): Promise<any | null> {
        return prisma.customer.findFirst({ where: filter });
    }

}

export default CustomerService;


