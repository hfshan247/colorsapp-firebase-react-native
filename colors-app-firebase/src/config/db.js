// db.js

import Firebase from 'firebase';
import 'firebase/auth';

let config = {

};
export let app = Firebase.initializeApp(config);
export const db = app.database();