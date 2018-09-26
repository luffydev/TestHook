
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

$("body").append("<div class=\"modal\" tabindex=\"-1\" role=\"dialog\"> <div class=\"modal-dialog\" role=\"document\"> <div class=\"modal-content\"> <div class=\"modal-header\"> <h5 class=\"modal-title\">Modal title</h5> <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"> <span aria-hidden=\"true\">&times;</span> </button> </div><div class=\"modal-body\"> <p>Modal body text goes here.</p></div><div class=\"modal-footer\"> <button type=\"button\" class=\"btn btn-primary\">Save changes</button> <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button> </div></div></div></div>");

setTimeout(function()
{
    debugger;
    var modal = new tingle.modal({
        footer: true,
        stickyFooter: false,
        closeMethods: ['overlay', 'button', 'escape'],
        closeLabel: "Close",
        cssClass: ['custom-class-1', 'custom-class-2'],
        onOpen: function() {
            console.log('modal open');
        },
        onClose: function() {
            console.log('modal closed');
        },
        beforeClose: function() {
            // here's goes some logic
            // e.g. save content before closing the modal
            return true; // close the modal
            return false; // nothing happens
        }
    });

// set content
    modal.setContent('<h1>here\'s some content</h1>');

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

// close modal
    modal.close();
}, 3000);


document.PkmnHelper = new PokemonHelper();

document.PkmnHelper.getUserData().then(function()
{

}).catch(function(pError, pErrorCode)
{

});
