var React = require('react');
var ReactDOM = require('react-dom');

var BugFilter = React.createClass({
  getInitialState: function() {
    var initFilter = this.props.initFilter;
    return {status: initFilter.status, priority: initFilter.priority};
  },
  _submit: function(e) {
    this.props.submitHandler({priority: this.state.priority, status: this.state.status});
  },
  _onChangeStatus: function(e) {
    this.setState({status: e.target.value});
  },
  _onChangePriority: function(e) {
    this.setState({priority: e.target.value});
  },
  render: function() {
    console.log("Rendering BugFilter");
    return (
      <div>
        <h3>Filter</h3>
        Status:
        <select value={this.state.status} onChange={this._onChangeStatus}>
          <option value="">(Any)</option>
          <option value="New">New</option>
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
        </select>
        <br/>
        Priority:
        <select value={this.state.priority} onChange={this._onChangePriority}>
          <option value="">(Any)</option>
          <option value="P1">P1</option>
          <option value="P2">P2</option>
          <option value="P3">P3</option>
        </select>
        <br/>
        <button onClick={this._submit}>Apply</button>
      </div>
    )
  }
});

module.exports = BugFilter;
