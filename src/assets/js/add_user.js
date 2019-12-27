var db = firebase.firestore();

$('.submit').click(()=>{
    var email = $('#email').val();
var pass = $('#password').val();
firebase.auth().createUserWithEmailAndPassword(email, pass)
.then((val)=>{
    db.collection("users").add({
        nickname: $('#name').val(),
        email: $('#email').val(),
        password:$('#password').val(),
        address:$('#address').val(),
        photoUrl:$('#photo').val(),
        telephone:$('#phone').val(),
        userType:$("#sel1 option:selected" ).text(),
        website:$('#website').val(),
        about:$('#about').val()
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        clearForm();
        Notifier.success('User registration successful');
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
        Notifier.error(error);

        clearForm();
    });
})

.catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    Notifier.error(errorMessage);

    clearForm();
    alert(errorMessage);
    // ...
  });
});

function clearForm(){
    $('#name').val(' ');
    $('#email').val('');
    ('#password').val('');
    $('#address').val('');
    $('#photo').val('');
    $('#phone').val('');
    $('#website').val('');
    $('#about').val('');
}


