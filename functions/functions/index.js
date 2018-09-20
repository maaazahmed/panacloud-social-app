// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// admin.initializeApp(functions.config().firebase);



// exports.sendNotification = functions.database.ref('/Groups/groupToken/{pushId}')
//     .onWrite(event => {
//         console.log("-=-=-=-=-=-=-", event)
//         const message = event.data.current.val();
//         const senderUid = message.from;
//         const receiverUid = message.to;
//         const promises = [];

//         if (senderUid === receiverUid) {
//             promises.push(event.data.current.ref.remove());
//             return Promise.all(promises);
//         }

//         const getInstanceIdPromise = admin.database().ref(`message`).once('value');
   
//         const getReceiverUidPromise = admin.auth().getUser(receiverUid);

//         return Promise.all([getInstanceIdPromise, getReceiverUidPromise]).then(results => {
//             const instanceId = results[0].val();
//             const receiver = results[1];

//             console.log('notifying ' + receiverUid + ' about ' + message.body + ' from ' + senderUid);

//             const payload = {
//                 notification: {
//                     title: receiver.displayName,
//                     body: message.body,
//                     icon: receiver.photoURL
//                 }
//             };

//             admin.messaging().sendToDevice(instanceId, payload)
//                 .then(function (response) {
//                   return  console.log("Successfully sent message:", response);
//                 })
//                 .catch(function (error) {
//                     console.log("Error sending message:", error);
//                 });
//             return console.log("success")
//         })
//     });












const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);



// function LoadTokens(){
//     let refee = admin.database().ref('/groupToken');
//     let token = new Promise((resolve, reject) => {
//         refee.once('value').then((data) => {
//             return resolve(data);
//         }).catch((err) => {
//             return reject(err);
//         })
//     })
//     return token;
// }

// exports.sendNotification = functions.database.ref('/message').onWrite(() => {
//     const payload = {
//         data: {
//             priority: 'high'
//         },
//         notification: {
//             title: "Online shopping",
//             body: "New Post in Online Shopping",
//             sound: 'default'
//         }
//     }

//     return LoadTokens().then(token => {
//         const snapshot = token.val();
//         const tokens = [];
//         for (let key in snapshot) {
//             tokens.push(snapshot[key]['fcmToken']);
//         }
//         return admin.messaging().sendToDevice(tokens, payload);
//     })

// })


