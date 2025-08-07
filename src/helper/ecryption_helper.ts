import { genSalt, hash, compare } from 'bcrypt'

// encrypting password
export const encryptPassword = async (password: string): Promise<string> => {
    const salt: string = await genSalt(10);
    const encryptedPass = await hash(password, salt);
    return encryptedPass;
}
export const decryptPassword = async (reqPass: string, dbPass: string): Promise<boolean> => {
    const decryptedPass = await compare(reqPass, dbPass);
    return decryptedPass;
}