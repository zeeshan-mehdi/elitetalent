var db = firebase.firestore();

var name;
var image;
var contact;
var from;



db.collection("chat").where('to', '==', 'FqZlseN0ouPIh21X8DgpGv1mz8E3').get().then(async (querySnapshot) => {

    querySnapshot.forEach(async (doc) => {
        var data = doc.data();
        name = data.name;
        image = data.photoUrl;
        contact = data.telephone;
        from = data.from;
        await db.collection('users').doc(from).get().then((val) => {
            val = val.data();
            name = val.nickname;
            //image = val.photoUrl;
        });
        var element = '<tr><td class="pr-0 pl-4"><img class="profile-img img-sm" src="' + image + '" alt="image"></td>' + '<td class="pl-md-0"><small class="text-black font-weight-medium d-block">' + name + '</small><span class="text-gray"><span class="status-indicator rounded-indicator small bg-primary"></span>Available</span></td><td><button class="btn btn-success reply" id="' + from + '">See Message</button></td></tr>';
        $('#usersTable').append(element);

        console.log(`${doc.id} => ${data.name}`);
        addtoev();
    });

    
});


async function addtoev() {
    console.log('applying.....');
    $('button.reply').click(function () {
        console.log('clicked');
        let id = this.id;
        console.log(id);

        localStorage.setItem('id', id);

        peerId = id;
        window.location = '../../demo_1/pages/chat.html';
    });
}




