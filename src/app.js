// START Initialize Firebase
var config = {
    apiKey: "AIzaSyD_XzrKlRO8qJivTMoG7TSawkeh4t2WLjs",
    authDomain: "chattest-fb1bd.firebaseapp.com",
    databaseURL: "https://chattest-fb1bd.firebaseio.com",
    projectId: "chattest-fb1bd",
    storageBucket: "chattest-fb1bd.appspot.com",
    messagingSenderId: "483696650892"
};
firebase.initializeApp(config);

//Document Ready
$(document).ready(function () {
    var commentsRef = firebase.database().ref('posts');
    commentsRef.on('child_added', function (data) {
        AddInfo(data.key, data.val().text, data.val().username);
    });
    /*commentsRef.on('child_changed', function (data) {
        AddInfo(data.key, data.val().text, data.val().username);
    });*/
    commentsRef.on('child_removed', function (data) {
        DeleteInfo(data.key);
    });
    $('#textbox').keypress(function (event) {
        if (event.keyCode === 13) {
            SendMessage();
        }
    });
});

// UI Functions
function SendMessage() {
    var userbox = $("#userbox").val();
    var textbox = $("#textbox").val();

    writeMessage(userbox, textbox);

    $("#textbox").val("");
}
function ClearAllMessages() {
    firebase.database().ref().remove();
}

// Aux Functions
function writeMessage(username, text) {
    // Actual date time
    var _datet = new Date().getTime();

    // A chat message entry.
    var postData = {
        username: username,
        text: text,
        datet: _datet
    };

    // Get a key for a new chat message.
    var newPostKey = firebase.database().ref().child('posts').push().key;

    // Write the new chat message data 
    var updates = {};
    updates['/posts/' + newPostKey] = postData;

    firebase.database().ref().update(updates);
}
function AddInfo(key, text, username) {
    $('#chatBox').val($('#chatBox').val() + username + ": " + text + "\n");
}
function DeleteInfo() {
    $('#chatBox').val('');
}


