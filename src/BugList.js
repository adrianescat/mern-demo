var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Link = require('react-router').Link;

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
      <table className="table table-striped table-bordered table-condensed">
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
      <td>
        <Link to={'/bugs/' + this.props.bug._id}>{this.props.bug._id}</Link>
      </td>
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
  componentDidUpdate: function(prevProps) {
    var oldQuery = prevProps.location.query;
    var newQuery = this.props.location.query;
    if (oldQuery.priority === newQuery.priority &&
        oldQuery.status === newQuery.status) {
      console.log("BugList: componentDidUpdate, no change in filter, not updating");
      return;
    } else {
      console.log("BugList: componentDidUpdate, loading data with new filter");
      this._loadData();
    }
  },
  _loadData: function(filter) {
    var query = this.props.location.query || {};
    var filter = {priority: query.priority, status: query.status};

    $.ajax('/api/bugs', {data: filter}).done(function(data) {
      this.setState({bugs: data});
    }.bind(this));
  },
  _changeFilter: function(newFilter) {
    this.props.history.push({search: '?' + $.param(newFilter)});
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
        <BugFilter submitHandler={this._changeFilter} initFilter={this.props.location.query}/>
        <BugTable bugs={this.state.bugs}/>
        <BugAdd addBug={this._addBug}/>
      </div>
    );
  }
});

module.exports = BugList;
