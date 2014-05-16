window.Trellino = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Trellino.Routers.AppRouter();

    Backbone.history.start();
  }
};

$(document).ready(function(){
  Trellino.initialize();
});