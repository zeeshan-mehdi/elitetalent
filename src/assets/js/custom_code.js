var db = firebase.firestore();

var name;
var image;
var contact;
var userType;



db.collection("users").get().then((querySnapshot) => {
    $('#usersCount').text(querySnapshot.docs.length);
    let agencyCount = 0;
    let freeCount = 0;
    let limit = 10;
    querySnapshot.forEach((doc) => {
        var data = doc.data();
        name = data.nickname;
        image = data.photoUrl;
        contact = data.telephone;
        userType = data.userType;
        if (userType == 'agency') {
            agencyCount++;
        } else if (userType == 'Free') {
            freeCount++;
        }

        if (limit > 0) {
            var element = '<tr><td class="pr-0 pl-4"><img class="profile-img img-sm" src="' + image + '" alt="image"></td>' + '<td class="pl-md-0"><small class="text-black font-weight-medium d-block">' + name + '</small><span class="text-gray"><span class="status-indicator rounded-indicator small bg-primary"></span>Available</span></td><td><small>' + contact + '</small></td><td> ' + userType + ' </td><td><button class="btn btn-danger user" id="' + doc.id + '">Delete</button></td></tr>';
            $('#usersTable').append(element);
        }
        limit--;

        //console.log(`${doc.id} => ${data.nickname}`);
    });

    addtoev();
    $('#agency').text(agencyCount);
    $('#free').text(freeCount);
    $('#paid').text(querySnapshot.docs.length - (agencyCount + freeCount));
});

db.collection("jobs").doc('user').collection('jobs').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        var data = doc.data();
        var project = '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start "><h5 class="mb-1 ">' + data.title + '</h5><small>' + data.category + '</small><p class="mb-1">' + data.description + '</p><button class="btn btn-danger project" id="' + doc.id + '">Delete</button></a>';
        $('#projects').append(project);
    });
    //addtoev();
    deleteProj();
});

function addtoev() {
    $('button.user').click(function () {
        console.log('clicked');
        let id = this.id;
        console.log(id);
        deleteUser(id);
    });
}

function deleteProj(){
    $('button.project').click(function () {
        console.log('clicked');
        let id = this.id;
        console.log(id);
        db.collection("jobs").doc('user').collection('jobs').doc(id).delete().then(function(){
            Notifier.success('Job successfully deleted');
            window.location.reload();
        })
        .catch((e)=>{
            Notifier.error(e)
        });


    });
}

window.addEventListener("load", function () {
    //addtoev();
});

function deleteUser(id) {
    db.collection("users").doc(id).get().then(function (querySnapshot) {
        var val = querySnapshot.data();

        var email = val.email;
        var password = val.password;

        db.collection("users").doc(id).delete().then(function(){
            console.log('inside');
            firebase.auth().signInWithEmailAndPassword(email, password).then((val) => {
                firebase.auth().currentUser.delete().then(function(){
                    Notifier.success('User deleted successfully');
                    window.location.reload();
                });
            }).catch((err) => {
                console.log(err);
                Notifier.error(err);
            });
        }).catch((e)=>{Notifier.error(e)});

        

    });
}
