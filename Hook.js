
const PKMN_BADGE_STATE = {

    ACCEPTED_STATE_1 : 200,
    ACCEPTED_STATE_2 : 201,
};

var PokemonHelper = function(){

    var mData = {};
    var mCurrUserID = 0;
    var mParsedPkm = {};

    this.setData = function(pData)
    {
        mData = pData.user;
        mCurrUserID = pData.user.userId;
    };

    this.getUserData = function()
    {
      var lContext = this;

      return new Promise(function(pResolve, pReject)
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
        var lPokemonStruct = {id : 0, collected:false, count:0};
        var lItems = mData.items;

        lItems.forEach(function(pItem)
        {
            if( !(pItem.itemId in mParsedPkm) )
            {
                if(pItem.collected)
                {
                    var lStruct = {id : 0, collected:false, count:0};

                    lStruct.id = pItem.itemId;
                    lStruct.count += 1;
                    lStruct.collected = true;

                    mParsedPkm[pItem.itemId] = lStruct;
                }

            }else
            {
                if(pItem.collected)
                    mParsedPkm[pItem.itemId].count +=1;
            }
        });
    }
};

PokemonMessageHandler = function()
{

    var modal = new tingle.modal({
        footer: true,
        stickyFooter: false,
        closeMethods: ['overlay', 'button', 'escape'],
        closeLabel: "Close",
        cssClass: ['custom-class-1', 'custom-class-2'],
        onOpen: function() {

        },
        onClose: function() {

        },
        beforeClose: function() {
            // here's goes some logic
            // e.g. save content before closing the modal
            return true; // close the modal
        }
    });

    this.showMessage = function(pMessage)
    {
        // set content
        modal.setContent(pMessage);

// add a button
        modal.addFooterBtn('OK', 'tingle-btn tingle-btn--primary', function() {
            // here goes some logic
            modal.close();
        });

// open modal
        modal.open();
    };
};

window.PkmnMessageHandler = new PokemonMessageHandler();
window.PkmnHelper = new PokemonHelper();

PkmnHelper.getUserData().then(function()
{
    PkmnMessageHandler.showMessage("Vous êtes connecté ! =)");
    PkmnHelper.parsePokemon();

}).catch(function(pError, pErrorCode)
{
    debugger;
    PkmnMessageHandler.showMessage("Erreur lors de l'authentification auprès de l'extension de Badge. (Erreur " + pErrorCode +" )");
});

$.ajax({
    url : 'http://178.32.106.194:4433/route/test', // La ressource ciblée
    type : 'GET', // Le type de la requête HTTP.
    data : 'utilisateur=test'
});
