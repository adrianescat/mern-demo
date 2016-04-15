var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Link = require('react-router').Link;

var BugEdit = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
    this._loadData();
  },
  componentDidUpdate: function(prevProps) {
    console.log("BugEdit: componentDidUpdate", prevProps.params.id, this.props.params.id);
    if (this.props.params.id != prevProps.params.id) {
      this._loadData();
    }
  },
  _loadData: function() {
    $.ajax('/api/bugs/' + this.props.params.id).done(function(bug) {
      this.setState(bug);
    }.bind(this));
  },
  _onChangePriority: function(e) {
    this.setState({priority: e.target.value});
  },
  _onChangeStatus: function(e) {
    this.setState({status: e.target.value});
  },
  _onChangeOwner: function(e) {
    this.setState({owner: e.target.value});
  },
  _onChangeTitle: function(e) {
    this.setState({title: e.target.value});
  },
  _submit: function(e) {
    e.preventDefault();
    var bug = {
      status: this.state.status,
      priority: this.state.priority,
      owner: this.state.owner,
      title: this.state.title
    }
    $.ajax({
      url: '/api/bugs/' + this.props.params.id, type: 'PUT', contentType:'application/json',
      data: JSON.stringify(bug),
      dataType: 'json',
      success: function(bug) {
        this.setState(bug);
      }.bind(this),
    });
  },
  render: function() {
    return (
      <div>
        Edit bug: {this.props.params.id}
        <br/>
      <form onSubmit={this._submit}>
          Priority:
          <select name="priority" value={this.state.priority} onChange={this._onChangePriority}>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
            <option value="P3">P3</option>
          </select>
          <br/>
          Status:
          <select value={this.state.status} onChange={this._onChangeStatus}>
            <option>New</option>
            <option>Open</option>
            <option>Fixed</option>
            <option>Closed</option>
          </select>
          <br/>
        Owner: <input type="text" value={this.state.owner} onChange={this._onChangeOwner}/>
          <br/>
        Title: <input type="text" value={this.state.title} onChange={this._onChangeTitle}/>
          <br/>
          <button type="submit">Submit</button><Link to="/bugs">Back to bug list</Link>
        </form>
      </div>
    );
  }
});

module.exports = BugEdit;
