Trellino.Views.ListShow = Backbone.View.extend({
  tagName: "li",
  template: JST['lists/show'],

  render: function() {
    var renderedContent = this.template({
      list: this.model
    });

    this.$el.html(renderedContent);
    return this;
  }
});