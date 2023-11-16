import {
	collection,
	getDocs,
	getDoc,
	addDoc,
	updateDoc,
	deleteDoc,
	doc,
  } from "firebase/firestore";
// @ts-ignore
import { db } from "../../firebase-config";
import UserType from "../../Components/Type/UserType";

const userdataRef = collection(db, "userdata");
const getAllUserdata = async () => {
    console.log(`getting userdata`);
    const temp = await getDocs(userdataRef);
    const userArr = temp.docs.map(e => {
		let temp = e.data()
		temp.docId = e.id;
		return temp 
	});
    return userArr;
};

const addAllUserData = async (data: UserType[]) => {
    console.log(`adding userdata`);
	// const tempObj = {
	// 	"id": 2,
	// 	"first_name": "Aman",
	// 	"last_name": "Varma",
	// 	"email": "aman@webs.com",
	// 	"gender": "Female",
	// 	"address": "9960 Lindbergh Park",
	// 	"mobile": "758-111-2553"
	// }
	try {
		// data = data.slice(0,10); //testing
		data.forEach(async (e) => {
    		await addDoc(userdataRef, e);
		})
		console.log('Data added successfully');
		return true;
	} catch (error) {
		console.error(`Failed to add data: ${error}`);
		return false;
	}
    // return userArr;
}

const deleteUserdata = async () => {
    console.log(`getting userdata`);
	const allDocs = await getDocs(userdataRef);
	try {
		allDocs.forEach(async e => {
			const docRef = doc(db, "userdata", e.id);
			await deleteDoc(docRef);
		})
		console.log('Data deleted successfully');
		return true;
	} catch (error) {
		console.error(`Failed to delete data: ${error}`);
		return false;
	}

}

// {
//     "id": 1,
//     "first_name": "Chester",
//     "last_name": "Lannen",
//     "email": "clannen0@webs.com",
//     "gender": "Male",
//     "address": "9960 Lindbergh Park",
//     "mobile": "758-259-2553"
// // }

export { getAllUserdata, addAllUserData, deleteUserdata};