import { db } from '../firebase-config';

import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const shoppingItemsRef = collection(db, "shoppingItems");
class ShoppingItemsService {
    addItem = (newItem) => {
        return addDoc(shoppingItemsRef, newItem);
    }
    updateItem = (id, updatedItem) => {
        const item = doc(db, "shoppingItems", id);
        return updateDoc(item , updatedItem);
    }
    deleteItem = (id) => {
        const item = doc(db, "shoppingItems", id);
        return deleteDoc(item);
    }
    getAllItems = () => {
        return getDocs(shoppingItemsRef);
    }
    getItem = (id) => {
        const item = doc(db, "shoppingItems", id);
        return getDoc(item);
    }
}

export default new ShoppingItemsService();