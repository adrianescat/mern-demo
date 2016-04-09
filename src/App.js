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
    <div>a table to list all the bugs</div>
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
