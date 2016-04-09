var BugFilter = React.createClass({
  render: function() {
    return (
    <div>Filter</div>
    );
  }
});

var BugTable = React.createClass({
  render: function() {
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
          <BugRow id={1} status="closed" priority="urgent" owner="Federico" title="Unknow first() method for NIL class"/>
          <BugRow id={2} status="open" priority="urgent" owner="Federico" title="Can't assing attributes"/>
        </tbody>
      </table>
    );
  }
});

var BugRow = React.createClass({
  render: function() {
    return (
    <tr>
      <td>{this.props.id}</td>
      <td>{this.props.status}</td>
      <td>{this.props.priority}</td>
      <td>{this.props.owner}</td>
      <td>{this.props.title}</td>
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
  render: function() {
    return (
      <div>
        <h1>Bug Tracker</h1>
        <BugFilter />
        <hr />
        <BugTable />
        <hr />
        <BugAdd />
      </div>
    );
  }
});
ReactDOM.render(<BugList />, document.getElementById('main'));
