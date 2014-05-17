Trellino.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST['boards/show'],

  initialize: function() {
    this.listenTo(this.model, "sync", this.addAllLists);
    this.listenTo(this.model.lists(), "sync", this.addAllLists);
    this.listenTo(this.model.members(), "sync", this.render);

    // TODO: come back to this; is fetch necessary??
    this.model.lists().fetch();
    this.model.lists().each(this.addList.bind(this));
    this.model.members().fetch();

    var newListView = new Trellino.Views.NewList({
      board: this.model
    });
    this.addSubview(".list-new", newListView);
  },

  render: function() {
    var renderedContent = this.template({
      board: this.model,
      members: this.model.members()
    });

    this.$el.html(renderedContent);
    this.renderSubviews();
    return this;
  },

  addList: function (list) {
    var listShowView = new Trellino.Views.ListShow({
      model: list
    });

    this.addSubview(".lists", listShowView);
    listShowView.render();
  },

  removeAllLists: function() {
    _(this.subviews()['.lists']).each(function (subview) {
      subview.remove();
    })
  },

  addAllLists: function() {
    if (this.subviews()['.lists']) {
      this.removeAllLists();
    }
    var listShowView = this;
    var lists = this.model.lists();
    lists.each(function (list) {
      listShowView.addList(list);
    });
  }
});