var db = firebase.firestore();

db.collection("users").where('userType','==','agency').get().then((querySnapshot)=>{
    querySnapshot.forEach((user)=>{
        console.log(user.data().name);
        $('#selAgency').append('<option>'+user.data().name+'</option>');
    });
});

$('.submit').click(()=>{
    var email = $('#email').val();
var pass = $('#password').val();
    db.collection("jobs").doc('user').collection('jobs').add({
        title: $('#title').val(),
        description: $('#description').val(),
        details:$('#detail').val(),
        location:$('#address').val(),
        budget:$('#budget').val(),
        agency:$("#selAgency option:selected" ).text(),
        category:$("#selCategory option:selected" ).text(),
        saved:false
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
});
function clearForm(){
    $('#title').val(' ');
    $('#description').val('');
    $('#detail').val('');
    $('#address').val('');
    $('#budget').val('');
}


