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
  render: function() {
    return (
    <div>a form to add a new bug</div>
    );
  }
});

var BugList = React.createClass({
  getInitialState: function() {
    var bugs = [
      {id: 1, status: "closed", priority: "urgent", owner: "Federico", title: "Unknow first() method for NIL class"},
      {id: 2, status: "open", priority: "urgent", owner: "Federico", title: "Can't assing attributes"}
    ];
    return {data: bugs}
  },
  render: function() {
    return (
      <div>
        <h1>Bug Tracker</h1>
        <BugFilter />
        <hr />
        <BugTable bugs={this.state.data}/>
        <hr />
        <BugAdd />
      </div>
    );
  }
});
ReactDOM.render(<BugList />, document.getElementById('main'));
