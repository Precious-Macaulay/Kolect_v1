import { getFirestore, doc, updateDoc } from "firebase/firestore";
import firebase_app from "../config";

const db = getFirestore(firebase_app);

async function updateData(colllection, id, data) {
    let result = null;
    let error = null;

    try {
        result = await updateDoc(doc(db, colllection, id), data);
    } catch (e) {
        error = e;
    }

    return { result, error };
}
export default updateData;