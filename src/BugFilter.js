var React = require('react');
var ReactDOM = require('react-dom');

var BugFilter = React.createClass({
  _submit: function(e) {
    this.props.submitHandler({priority: "P1"});
  },
  render: function() {
    console.log("Rendering BugFilter");
    return (
      <button onClick={this._submit}>Test Filter</button>
    )
  }
});

module.exports = BugFilter;
