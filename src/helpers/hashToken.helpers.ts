import crypto from 'crypto';

//hash the token before saving it to the database
function hashToken(token: string) {
    return crypto.createHash('sha512').update(token).digest('hex');
}

export { hashToken };
