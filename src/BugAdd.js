var React = require('react');
var ReactDOM = require('react-dom');

var Panel = require('react-bootstrap/lib/Panel');
var Input = require('react-bootstrap/lib/Input');
var ButtonInput = require('react-bootstrap/lib/ButtonInput');

var BugAdd = React.createClass({
  _handleSubmit: function(e) {
    e.preventDefault();
    var form = document.forms.bugAdd;
    this.props.addBug({owner: form.owner.value, title: form.title.value, status: 'New', priority: form.priority.value});
    // clear the form for the next input
    form.reset();
  },
  render: function() {
    return (
      <Panel header="Add Bug">
        <form name="bugAdd">
          <Input type="text" name="priority" label="Priority" />
          <Input type="text" name="owner" label="Owner" />
          <Input type="text" name="title" label="Bug Title" />
          <ButtonInput value="Add" bsStyle="primary" onClick={this._handleSubmit} />
        </form>
      </Panel>
    );
  }
});

module.exports = BugAdd;
