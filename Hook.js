window.Twitch.ext.onAuthorized(function(e)
{
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            debugger;
        }
    };

    xhr.open("POST", "https://tp.prod.stinkstudios.la/users");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + e.token);
    xhr.send('{"opaqueId":"'+e.userId+'","channelId":"' + e.channelId + '"}');
});
