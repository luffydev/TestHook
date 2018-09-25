window.Twitch.ext.onAuthorized(function(e)
{
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://tp.prod.stinkstudios.la/users");
  xhr.send('{"opaqueId":"UhL3yVwlnLIhYoYFzzDaA","channelId":"233403700"}');
});

