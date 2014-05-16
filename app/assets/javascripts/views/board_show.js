Trellino.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST['boards/show'],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);

    var newListView = new Trellino.Views.NewList({
      board: this.model
    });
    this.addSubview(".list-new", newListView);
  },

  render: function() {
    // TODO: show lists in order of rank --> override comparator
    var renderedContent = this.template({
      board: this.model
    });

    this.$el.html(renderedContent);
    this.renderSubviews();
    return this;
  },

  // listNew: function() {
  //   var list = new Trellino.Models.List();
  //   var view = new Trellino.Views.NewList({
  //     model: list
  //   })
  //   this.$el.append(view.render().$el);
  //   return this;
  // }
});