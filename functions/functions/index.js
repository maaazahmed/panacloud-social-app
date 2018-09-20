const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);



exports.sendNotification = functions.database.ref('/Groups/groupToken/{pushId}')
    .onWrite(event => {
        console.log("-=-=-=-=-=-=-", event)
        const message = event.data.current.val();
        const senderUid = message.from;
        const receiverUid = message.to;
        const promises = [];

        if (senderUid === receiverUid) {
            //if sender is receiver, don't send notification
            promises.push(event.data.current.ref.remove());
            return Promise.all(promises);
        }

        const getInstanceIdPromise = admin.database().ref(`message`).once('value');
        // /users/${receiverUid}/instanceId
        const getReceiverUidPromise = admin.auth().getUser(receiverUid);

        return Promise.all([getInstanceIdPromise, getReceiverUidPromise]).then(results => {
            const instanceId = results[0].val();
            const receiver = results[1];

            console.log('notifying ' + receiverUid + ' about ' + message.body + ' from ' + senderUid);

            const payload = {
                notification: {
                    title: receiver.displayName,
                    body: message.body,
                    icon: receiver.photoURL
                }
            };

            admin.messaging().sendToDevice(instanceId, payload)
                .then(function (response) {
                  return  console.log("Successfully sent message:", response);
                })
                .catch(function (error) {
                    console.log("Error sending message:", error);
                });
            return console.log("success")
        })
    });
