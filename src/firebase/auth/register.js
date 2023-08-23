import {
    createUserWithEmailAndPassword,
    getAuth
} from 'firebase/auth';
import firebase_app from '../config';

const auth = getAuth(firebase_app);

const register = async (
    email,
    password
) => {
    if (!email && !password) {
        throw new Error('Email and password are required');
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth, email, password
        );
        return { result: userCredential };
    } catch (error) {
        return { error: error.message };
    }
};

export default register;