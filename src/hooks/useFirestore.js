import React, {useState} from 'react';
import {db} from '../firebase/config';


const useFirestore = (collection, condition) => {

    const [documents, setDocuments] = useState([]);

    React.useEffect(() => {
        let collectionRef = db.collection(collection)//.orderBy('createdAt');
        // condition
        if (condition) {
            if (!condition.compareValue || !condition.compareValue.length){
                setDocuments([]);
                return;
            } 
            collectionRef = collectionRef.where(condition.fieldName, condition.operator, condition.compareValue);
        }
        
        const unsubcribed = collectionRef.onSnapshot((snapshot) => {
            const documents = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));

            setDocuments(documents);
        });

        return unsubcribed;
    }, [collection, condition]);
    
    return documents;
}

export default useFirestore;