import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

class TokenService {
    private accessTokenSecret: string;
    private refreshTokenSecret: string;
    private refreshTokenStorage: Map<string, string>;

    constructor(accessTokenSecret: string, refreshTokenSecret: string) {
        this.accessTokenSecret = accessTokenSecret;
        this.refreshTokenSecret = refreshTokenSecret;
        this.refreshTokenStorage = new Map<string, string>();
    }
    generateAccessToken(userId: string): string {
        const token = jwt.sign({ userId }, this.accessTokenSecret, { expiresIn: '30m' });
        return token;
    }
    generateRefreshToken(userId: string): string {
        const token = jwt.sign({ userId }, this.refreshTokenSecret, { expiresIn: '7d' });
        const refreshToken = this.generateUniqueIdentifier();
        this.refreshTokenStorage.set(refreshToken, userId);
        return refreshToken;
    }
    verifyRefreshToken(refreshToken: string): string {
        try {
            const decoded = jwt.verify(refreshToken, this.refreshTokenSecret);
            if (typeof decoded === 'object' && decoded.hasOwnProperty('userId')) {
                const userId = this.refreshTokenStorage.get(refreshToken);
                if (userId) {
                    return userId;
                } else {
                    throw new Error('Invalid refresh token');
                }
            } else {
                throw new Error('Invalid refresh token');
            }
        } catch (error) {
            throw new Error('Invalid refresh token');
        }
    }
    private generateUniqueIdentifier(): string {
        const refreshToken = uuidv4();
        return refreshToken;
    }
}
export default TokenService;