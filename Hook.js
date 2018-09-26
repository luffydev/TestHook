
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
        modal.addFooterBtn('Button label', 'tingle-btn tingle-btn--primary', function() {
            // here goes some logic
            modal.close();
        });

// add another button
        modal.addFooterBtn('Dangerous action !', 'tingle-btn tingle-btn--danger', function() {
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

}).catch(function(pError, pErrorCode)
{
    PkmnMessageHandler.showMessage("Erreur lors de l'authentification auprès de l'extension de Badge. (Erreur " + pErrorCode +" )");
});
