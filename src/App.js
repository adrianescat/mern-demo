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
        <BugRow key= {bug.id} bug= {bug}/>
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
      <td>{this.props.bug.id}</td>
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
    return {data: []}
  },
  _addBug: function(bug) {
    var bugs = this.state.data.slice();
    bug.id = this.state.data.length + 1;
    bugs.push(bug);
    this.setState({data: bugs});
  },
  render: function() {
    return (
      <div>
        <h1>Bug Tracker</h1>
        <BugFilter />
        <hr />
        <BugTable bugs={this.state.data}/>
        <hr />
        <BugAdd addBug={this._addBug}/>
      </div>
    );
  }
});
ReactDOM.render(<BugList />, document.getElementById('main'));
