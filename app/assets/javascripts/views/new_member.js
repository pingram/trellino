Trellino.Views.NewMember = Backbone.View.extend({
  template: JST['members/new'],

  events: {
    'submit .new-member-form' : 'submit'
  },

  initialize: function (options) {
    this.board = options.board;
  },

  render: function() {
    var renderedContent = this.template({
    });
    this.$el.html(renderedContent);
    return this;
  },

  submit: function (event) {
    event.preventDefault();
    var board = this.board;
    var params = $(event.currentTarget).serializeJSON();
    board.set('newMemberEmail', params['newMemberEmail']);
    board.save({}, {
      success: function (resp) {
        var isIncluded = false;
        _(resp.members().models).each(function (member) {
          if (member.get('email') === params['newMemberEmail']) {
            console.log('Board updated to include ' + member.get('email'));
            isIncluded = true;
          }
        })

        if (!isIncluded) {
          alert('Email ' + params['newMemberEmail'] + ' is not in database')
          console.log(params['newMemberEmail'] + " not in DB");
        }

        $(event.currentTarget).find('.new-member-email').val('');
      }
    });
  }
});