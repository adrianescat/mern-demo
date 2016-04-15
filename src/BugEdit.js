var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Link = require('react-router').Link;

var Panel = require('react-bootstrap/lib/Panel');
var Input = require('react-bootstrap/lib/Input');
var Button  = require('react-bootstrap/lib/Button');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var Alert = require('react-bootstrap/lib/Alert');

var BugEdit = React.createClass({
  getInitialState: function() {
    return {successVisible: false};
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
        this._showSuccess();
      }.bind(this),
    });
  },
  _dismissSuccess: function() {
    this.setState({successVisible: false});
  },
  _showSuccess: function() {
    this.setState({successVisible: true});
  },
  render: function() {
    var success = (
      <Alert bsStyle="success" onDismiss={this._dismissSuccess} dismissAfter={5000}>
        Bug saved to DB successfully.
      </Alert>
    );
    return (
      <div style={{maxWidth: 600}}>
        <Panel header={"Edit bug: " + this.props.params.id}>
          <form onSubmit={this._submit}>
            <Input type="select" label="Priority" value={this.state.priority} onChange={this._onChangePriority}>
              <option value="P1">P1</option>
              <option value="P2">P2</option>
              <option value="P3">P3</option>
              <option value="P4">P4</option>
              <option value="P5">P5</option>
              <option value="P6">P6</option>
            </Input>
            <Input type="select" label="Status" value={this.state.status} onChange={this._onChangeStatus}>
              <option>New</option>
              <option>Open</option>
              <option>Closed</option>
              <option>Fixed</option>
              <option>Piola</option>
            </Input>
            <Input type="text" label="Title" value={this.state.title} onChange={this._onChangeTitle}/>
            <Input type="text" label="Owner" value={this.state.owner} onChange={this._onChangeOwner}/>
            <ButtonToolbar>
              <Button type="submit" bsStyle="primary">Submit</Button>
              <Link className="btn btn-link" to="/bugs">Back</Link>
            </ButtonToolbar>
          </form>
        </Panel>
        {this.state.successVisible ? success : null}
      </div>
    );
  }
});

module.exports = BugEdit;
