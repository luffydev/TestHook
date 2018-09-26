
const PKMN_BADGE_STATE = {

    ACCEPTED_STATE_1 : 200,
    ACCEPTED_STATE_2 : 201,
};

var PokemonHelper = function(){

    var mData = {};
    var mCurrUserID;

    this.setData = function(pData)
    {
        this.mData = pData;
    };

    this.getUserData = function()
    {
      var lContext = this;

      return Promise(function(pResolve, pReject)
      {

          window.Twitch.ext.onAuthorized(function(pTwitchInfos)
          {
              var lXhr = new XMLHttpRequest();

              lXhr.onreadystatechange = function() {

                  if (lXhr.readyState === XMLHttpRequest.DONE) {

                      if(lXhr.status === PKMN_BADGE_STATE.ACCEPTED_STATE_1 || lXhr.status === PKMN_BADGE_STATE.ACCEPTED_STATE_2) {

                        lContext.setData(JSON.parse(lXhr.response));

                        pResolve();

                        return true;

                      }

                      pReject(lXhr.responseText, lXhr.status);
                      return false;
                  }
              };

              lXhr.open("POST", "https://tp.prod.stinkstudios.la/users");
              lXhr.setRequestHeader("Content-Type", "application/json");
              lXhr.setRequestHeader("Authorization", "Bearer " + pTwitchInfos.token);
              lXhr.send('{"opaqueId":"'+pTwitchInfos.userId+'","channelId":"' + pTwitchInfos.channelId + '"}');

          });
      });

    };

    this.parsePokemon = function()
    {

    }
};

$("body");
debugger;

document.PkmnHelper = new PokemonHelper();

document.PkmnHelper.getUserData().then(function()
{

}).catch(function(pError, pErrorCode)
{

});
