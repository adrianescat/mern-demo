var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

//components
var BugFilter = require('./BugFilter');
var BugAdd = require('./BugAdd');

var BugTable = React.createClass({
  render: function() {
    var bugs = this.props.bugs.map(function(bug) {
      return (
        <BugRow key= {bug._id} bug= {bug}/>
      );
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Owner</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {bugs}
        </tbody>
      </table>
    );
  }
});

var BugRow = React.createClass({
  render: function() {
    return (
    <tr>
      <td>{this.props.bug._id}</td>
      <td>{this.props.bug.status}</td>
      <td>{this.props.bug.priority}</td>
      <td>{this.props.bug.owner}</td>
      <td>{this.props.bug.title}</td>
    </tr>
    );
  }
});

var BugList = React.createClass({
  getInitialState: function() {
    return {bugs: []}
  },
  componentDidMount: function() {
    this._loadData({});
  },
  _loadData: function(filter) {
    $.ajax('/api/bugs', {data: filter}).done(function(data) {
      this.setState({bugs: data});
    }.bind(this));
  },
  _addBug: function(bug) {
    $.ajax({
      type: 'POST', url: '/api/bugs', contentType: 'application/json',
      data: JSON.stringify(bug),
      success: function(data) {
        var bug = data;
        // We're advised not to modify the state, it's immutable. So, make a copy.
        var bugsModified = this.state.bugs.concat(bug);
        this.setState({bugs: bugsModified});
      }.bind(this),
      error: function(xhr, status, err) {
        // ideally, show error to user.
        console.log("Error adding bug:", err);
      }
    });
  },
  render: function() {
    return (
      <div>
        <h1>Bug Tracker</h1>
        <BugFilter submitHandler={this._loadData}/>
        <hr />
        <BugTable bugs={this.state.bugs}/>
        <hr />
        <BugAdd addBug={this._addBug}/>
      </div>
    );
  }
});

module.exports = BugList;
