var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var BugFilter = React.createClass({
  render: function() {
    return (
    <div>Filter</div>
    );
  }
});

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

var BugList = React.createClass({
  getInitialState: function() {
    return {bugs: []}
  },
  componentDidMount: function() {
    $.ajax('/api/bugs').done(function(data) {
      this.setState({bugs: data});
    }.bind(this));
    // In production, we'd also handle errors.
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
        <BugFilter />
        <hr />
        <BugTable bugs={this.state.bugs}/>
        <hr />
        <BugAdd addBug={this._addBug}/>
      </div>
    );
  }
});
ReactDOM.render(<BugList />, document.getElementById('main'));
