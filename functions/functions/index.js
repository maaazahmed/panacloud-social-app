const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);



// function LoadTokens(){
//     let refee = admin.database().ref('/groupToken');
//     let token = new Promise((resolve, reject) => {
//         refee.once('value').then((data) => {
//             console.log(data)
//             return resolve(data);
//         }).catch((err) => {
//             return reject(err);
//         })
//     })
//     return token;
// }

// exports.sendNotification = functions.database.ref('/Groups/{groupId}/groupToken').onWrite(() => {
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



function LoadGroupTokens(){
    let refee = admin.database().ref('/Groups');
    console.log("REFEE",refee)
    let token = new Promise((resolve, reject) => {
        refee.once('value').then((data) => {
            console.log("DATA",data)
            return resolve(data);
        }).catch((err) => {
            return reject(err);
        })
    })
    return token;
}

exports.sendGroupNotification = functions.database.ref('message').onWrite(() => {
    const payload = {
        data: {
            priority: 'high'
        },
        notification: {
            title: "New Message",
            body: "New Message in Group",
            sound: 'default'
        }
    }

    return LoadGroupTokens().then(token => {
        const snapshot = token.val();
        const tokens = [];
        for (let key in snapshot) {
            tokens.push(snapshot[key]['fcmToken']);
        }
        return admin.messaging().sendToDevice(tokens, payload);
    })

})