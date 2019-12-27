var db = firebase.firestore();
var id = 'FqZlseN0ouPIh21X8DgpGv1mz8E3';
var peerId = localStorage.getItem('id');
var groupChatId;
if (peerId !== null)
    groupChatId = createGroupId(id, peerId);

getMessages();


function createGroupId(id, peerId) {
    let groupChatId;

    if (id <= peerId) {
        groupChatId = id + '-' + peerId;
    } else {
        groupChatId = peerId + '-' + id;
    }
    console.log(groupChatId);
    return groupChatId;
}

async function getMessages() {
    var avatar;
    var time;
    var userName;
    


    db.collection('messages')
        .doc(groupChatId)
        .collection(groupChatId)
        .orderBy('timestamp', 'asc')
        .limit(20)
        .onSnapshot(async (snapshot) => {
            snapshot.docs.forEach(async function (val) {
                var content;
                val = val.data();
                console.log(val);
                console.log(val.content);

                content = val.content;
                time = val.timestamp;
                time = getTime(time);
                userName = val.name;
                try{
                //i sent this message
                if (val.idFrom == id) {

                    console.log('inside first');
                    await db.collection('users').doc(val.idFrom).get().then((val) => {
                        val = val.data();
                        avatar = val.photoUrl;
                    });
                    //avatar = '../images/logo.jpg';
                    var reply = '<li><div class="comment-avatar"><img src="' + avatar + '" alt=""></div><div class="comment-box"><div class="comment-head"><h6 class="comment-name"><a href="#">Elite Talent Support</a></h6><span>' + time + '</span><i class="fa fa-reply"></i><i class="fa fa-heart"></i></div><div class="comment-content">' + content + '</div></div></li>';
                    $('.reply-list').last().append(reply);
                } else {
                    await db.collection('users').doc(val.idFrom).get().then((val) => {
                        val = val.data();
                        userName = val.nickname;
                        avatar = val.photoUrl;
                    });
                    var mainComment = '<li><div class="comment-main-level"><div class="comment-avatar"><img src="' + avatar + '" alt=""></div><div class="comment-box"><div class="comment-head"><h6 class="comment-name by-author"><a href="#">' + userName + '</a></h6><span>' + time + '</span><i class="fa fa-reply"></i><i class="fa fa-heart"></i></div><div class="comment-content">' + content + '</div></div></div><ul class="comments-list reply-list"></ul></li>';
                    $('#comments-list').append(mainComment);
                    //i received this message     
                }
            }catch(e){
                console.log(e);
            }

            });
        });


}

function getTime(unix_timestamp) {
    var date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
}

$('.send').click( async function(){
    var message = $('.reply-text').val();

    const now = new Date()  
    const secondsSinceEpoch = now.getTime();  
    let reply = {
        'idFrom': id,
        'idTo': peerId,
        'timestamp': secondsSinceEpoch.toString(),
        'content': message,
        'type': 0
      }

    await db.collection('messages').doc(groupChatId).collection(groupChatId).doc(secondsSinceEpoch.toString()).set(reply);  

    $('.reply-text').val('');
    window.location.reload();
});

