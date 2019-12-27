var db = firebase.firestore();


db.collection('notifications').get().then((snapshot)=>{
    let len = snapshot.docs.length;
    $('.number').text('you have '+len.toString()+' unread notifications');
    snapshot.forEach((el)=>{
        let id = el.id;
        el = el.data();
        name = el.name;

        var noti = '<div class="dropdown-list" id="'+id+'" ><div class="icon-wrapper rounded-circle bg-inverse-primary text-primary"><i class="mdi mdi-message-outline"></i></div><div class="content-wrapper"><small class="name">'+name+'</small><small class="content-text">Sent Message</small></div></div>';

        $('.dropdown-body').append(noti);
    });
    addListner();
});

function addListner(){
    $('.dropdown-list').click(function(){
        console.log('clicked');
       let id =  this.id;
       console.log(id);
       db.collection('notifications').doc(id).delete().catch(function(e){
           console.log(e);
           window.location = 'pages/support_messages.html';
       })
       .then(function(resp){
            console.log(resp);
           window.location = 'pages/support_messages.html';
           
       });
    });
}