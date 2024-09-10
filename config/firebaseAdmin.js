import admin from "firebase-admin";
import serviceAccount from "./kreeshee-service.json" assert { type: "json" };
// import serviceAccount from "/etc/secrets/kreeshee-service.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
