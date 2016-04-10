var React = require('react');
var ReactDOM = require('react-dom');

var BugAdd = React.createClass({
  _handleSubmit: function(event) {
    event.preventDefault();
    var bug = {status: this.refs.bugStatus.value, priority: this.refs.bugPriority.value, owner: this.refs.bugOwner.value, title: this.refs.bugTitle.value}
    //pass 'bug' back to the BugList
    this.props.addBug(bug);
    this.refs.bugForm.reset();
  },
  render: function() {
    return (
      <form className="bugForm" ref="bugForm" onSubmit={this._handleSubmit}>
        <input
          ref="bugStatus"
          type="text"
          placeholder="Bug status"
          required
        />
        <input
          ref="bugPriority"
          type="text"
          placeholder="Bug priority"
          required
        />
        <input
          ref="bugOwner"
          type="text"
          placeholder="Bug owner"
          required
        />
        <input
          ref="bugTitle"
          type="text"
          placeholder="Bug title"
          required
        />
      <input type="submit" value="Add bug" />
      </form>
    );
  }
});

module.exports = BugAdd;
