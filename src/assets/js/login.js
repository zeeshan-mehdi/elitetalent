var email;
var pass;

$('.login').click(function(){
    email = $('.email').val();
    pass = $('.pass').val();
    firebase.auth().signInWithEmailAndPassword(email,pass).then((val)=>{
        let id = firebase.auth().currentUser.uid;

        firebase.firestore().collection('users').doc(id).get().then((value)=>{
            if(value.data().userType=='admin'){
                window.location = 'home.html';
            }else{
                alert('user not found');
            }
        });

    })
    .catch((err)=>{
        alert(err);
    });
});