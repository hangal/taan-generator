
import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var uid = user.uid;
    var phoneNumber = user.phoneNumber;
    var providerData = user.providerData;
    user.getIdToken().then(function(accessToken) {
        document.getElementById('sign-in-status').textContent = 'Signed in';
        document.getElementById('sign-in').textContent = 'Sign out';
        document.getElementById('account-details').textContent = JSON.stringify({
            displayName: displayName,
            email: email,
            emailVerified: emailVerified,
            phoneNumber: phoneNumber,
            photoURL: photoURL,
            uid: uid,
            accessToken: accessToken,
            providerData: providerData
        }, null, '  ');
    });
} else {
    // User is signed out.
    document.getElementById('sign-in-status').textContent = 'Signed out';
    document.getElementById('sign-in').textContent = 'Sign in';
    document.getElementById('account-details').textContent = 'null';
}
}, function(error) {
    console.log(error);
});

function setupFirebase() {
// Set the configuration for your app
// TODO: Replace with your project's config object
    var config = {
        apiKey: "apiKey",
        authDomain: "gathub.web.app",
        // For databases not in the us-central1 location, databaseURL will be of the
        // form https://[databaseName].[region].firebasedatabase.app.
        // For example, https://your-database-123.europe-west1.firebasedatabase.app
        databaseURL: "https://gathub-default-rtdb.asia-southeast1.firebasedatabase.app/",
        storageBucket: "gathub.appspot.com"
    };
    firebase.initializeApp(config);

// Get a reference to the database service
    var database = firebase.database();
}
