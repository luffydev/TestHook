window.Twitch.ext.onAuthorized(function(e)
{
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://tp.prod.stinkstudios.la/users");
  xhr.setRequestHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1Mzc4NTI1NTksIm9wYXF1ZV91c2VyX2lkIjoiVWhMM3lWd2xuTEloWW9ZRnp6RGFBIiwidXNlcl9pZCI6IjEyNzYzMzAxNyIsImNoYW5uZWxfaWQiOiIyMzM0MDM3MDAiLCJyb2xlIjoidmlld2VyIiwicHVic3ViX3Blcm1zIjp7Imxpc3RlbiI6WyJicm9hZGNhc3QiLCJ3aGlzcGVyLVVoTDN5VndsbkxJaFlvWUZ6ekRhQSIsImdsb2JhbCJdfX0.rYZTZ5gGLKbItDMKNZxQsNe6AgucHtEeamfU1m52vM8");
  xhr.send('{"opaqueId":"UhL3yVwlnLIhYoYFzzDaA","channelId":"233403700"}');
});

