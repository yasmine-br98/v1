
import { NextFunction, Request, Response } from 'express';
import prisma from '../config/database/db';
import SupplierService from '../services/supplier.services';
import CustomerService from '../services/customer.services';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import SupplierCompanyService from '../services/supplier-company.services';
import CustomerCompanyService from '../services/customer-company.services';
import TokenService from '../services/token.services';
import { error } from 'console';


export class AuthController {

    private supplierService: SupplierService;
    private customerService: CustomerService;
    private supplierCompanyService: SupplierCompanyService;
    private customerCompanyService: CustomerCompanyService;
    //private tokenService: TokenService;


    constructor() {
        this.supplierService = new SupplierService();
        this.customerService = new CustomerService();
        this.supplierCompanyService = new SupplierCompanyService();
        this.customerCompanyService = new CustomerCompanyService();
        //this.tokenService = new TokenService('your_access_token_secret', 'your_refresh_token_secret');
    }
    async registerSupplier(req: Request, res: Response): Promise<void> {
        try {
            const {
                taxIdentificationNumber,
                corporateName,
                tradeName,
                image,
                address,
                responsableName,
                responsablePosition,
                contactPhoneNumber,
                contactEmail,
                firstName,
                lastName,
                password,
                email,
                phoneNumber
            } = req.body;
            //const hashedPassword = await bcrypt.hash(password, 10);

            // Create supplierCompany
            const newSupplierCompany = await this.supplierCompanyService.create({
                taxIdentificationNumber,
                corporateName,
                tradeName,
                image,
                address,
                responsableName,
                responsablePosition,
                contactPhoneNumber,
                contactEmail
            });

            // Create supplier
            const newSupplier = await this.supplierService.create({
                firstName,
                lastName,
                password,
                email,
                phoneNumber,
                supplierCompanyId: newSupplierCompany.id
            });

            res.status(201).json({
                success: true,
                data: {
                    supplier: newSupplier,
                    company: newSupplierCompany
                }
            });
        } catch (error: any) {
            console.error('Error registering supplier:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to register supplier',
                message: error.message  // Ajout du message d'erreur spécifique
            });
        }
    }


    async registerCustomer(req: Request, res: Response): Promise<void> {
        try {
            const {
                taxIdentificationNumber,
                corporateName,
                tradeName,
                image,
                address,
                responsableName,
                responsablePosition,
                contactPhoneNumber,
                contactEmail,
                country,
                sector,
                businesSize,
                region,
                firstName,
                lastName,
                password,
                email,
                phoneNumber
            } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            // Create customerCompany
            const newCustomerCompany = await this.customerCompanyService.create({
                taxIdentificationNumber,
                corporateName,
                tradeName,
                image,
                address,
                responsableName,
                responsablePosition,
                contactPhoneNumber,
                contactEmail,
                country,
                sector,
                businesSize,
                region
            });

            // Create customer
            const newCustomer = await this.customerService.create({
                firstName,
                lastName,
                password,
                email,
                phoneNumber,
                customerCompanyId: newCustomerCompany.id
            });

            res.status(201).json({
                success: true,
                data: {
                    customer: newCustomer,
                    company: newCustomerCompany
                }
            });
        } catch (error: any) {
            console.error('Error registering customer:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to register customer',

            });
        }
    }



    // Login Endpoint 

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;

            // Search supplier in DB
            const supplier = await this.supplierService.findFirst({
                where: { email }
            });

            // Search customer in DB
            const customer = await this.customerService.findFirst({
                where: { email }
            });

            // Verify if user exists
            let user = null;
            if (supplier) {
                user = { ...supplier };
            } else if (customer) {
                user = { ...customer };
            }

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            // Verify password
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Invalid password' });
            }


            const accessToken = this.tokenService.generateAccessToken(user.id.toString());
            const refreshToken = this.tokenService.generateRefreshToken(user.id.toString());

            //The session cookie  the HTTPOnly flag
            res.cookie('session', { accessToken, refreshToken });
            res.json({
                success: true,

                data: {
                    user,
                    accessToken,

                },
            });
        } catch (error: any) {
            let statusCode = 500;
            let errorMessage = 'Internal Server Error';

            if (error.code === 'AUTH_FAILED') {
                statusCode = 401;
                errorMessage = 'Authentication failed. Invalid credentials.';
            } else if (error.code === 'USER_NOT_FOUND') {
                statusCode = 404;
                errorMessage = 'User not found.';
            }

            res.status(statusCode).json({
                success: false,
                message: errorMessage,
            });
        }
    }
}
export default AuthController;
