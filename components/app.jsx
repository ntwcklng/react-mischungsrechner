var calc = 0;
var Mischungsrechner = React.createClass({
  getInitialState: function() {
    return {
      dilution1: 0,
      dilution2: 0,
      bottle: 0,
      calc: 0
    }
  },
  updateDil: function(part1, part2) {
    this.setState({
      dilution1: part1,
      dilution2: part2
    });
  },
  updateBottle: function(bottleSize) {
    this.setState({
      bottle: bottleSize
    });
  },
  updateDilInput: function(e) {
    if(e.target.name == 1) {
      this.setState({
        dilution1: e.target.value
      });
    } else {
      this.setState({
        dilution2: e.target.value
      });
    }
  },
  render: function() {
    if(this.state.dilution1 !== 0 && this.state.dilution2 !== 0 && this.state.bottle !== 0) {
        calc = calculateDil(this.state.dilution1, this.state.dilution2, this.state.bottle);
    }
    var self = this;
      var renderDil = this.props.dil.map(function(l) {
        return <Dillution name={l.name} part1={l.part1} part2={l.part2} updateDil={self.updateDil} />
      });
      var renderBottle = this.props.bottle.map(function(l) {
        return <Bottle name={l.name} size={l.size} updateBottle={self.updateBottle} />
      });
      return (
        <div>
          <form className="form-inline">
            <div className="form-group">
              <legend>Mischungsverhältnis eingeben</legend>
              <input type="number" placeholder="1" name="1" onChange={this.updateDilInput} value={this.state.dilution1} /> : 
              <input type="number" placeholder="2" name="2" onChange={this.updateDilInput} value={this.state.dilution2} />
            </div>
          </form>
          <h5>Beliebte Mischungsverhältnisse:</h5>
          <div className="btn-group" role="group">
            {renderDil}
          </div>
          <h5>Flaschengröße:</h5>
          <div className="btn-group" role="group">
            {renderBottle}
          </div>
          <h2>{calc != 0 ? 'Dein Mischungsverhältnis: ' + calc : ''}</h2>
        </div>
      
      );
  }
});
function calculateDil(part1, part2, bottle) {  
  part1 = parseInt(part1);
  part2 = parseInt(part2);
  var parts = part1 + part2;
  var step = bottle / parts;
  var res1 = Math.round(step * part1).toFixed(2).split(".");
  var res2 = Math.round(step * part2).toFixed(2).split(".");
  var res = res1[0] + ":" + res2[0];
  return res;
  
}
var Dillution = React.createClass({
  getInitialState: function() {
    return {
      active: false
    }
  },
  dilClickHandler: function() {
    this.props.updateDil(this.props.part1, this.props.part2);
  },
  render: function() {
    return(
      <button type="button" className="btn btn-default" onClick={this.dilClickHandler}>
        {this.props.name}
      </button>
    )
  }
});
var Bottle = React.createClass({
  getInitialState: function() {
    return {
      active: false
    }
  },
  bottleClickHandler: function() {
    this.props.updateBottle(this.props.size);
    var active = !this.state.active;
    this.setState({
      active: active
    });
  },
  render: function() {
    return(
      <button type="button" className={this.state.active ? 'btn btn-default' : 'btn btn-default'} onClick={this.bottleClickHandler}>
        {this.props.name}
      </button>
    );
  }
});

var popularDil = [
  {name: '1:2', part1: 1, part2: 2},
  {name: '1:4', part1: 1, part2: 4},
  {name: '1:5', part1: 1, part2: 5},
  {name: '1:12', part1: 1, part2: 12},
  {name: '1:20', part1: 1, part2: 20}
];
var bottles = [
  {name: '100ml', size: 100},
  {name: '200ml', size: 200},
  {name: '500ml', size: 500},
  {name: '1000ml', size: 1000},
  {name: '1500ml', size: 1500},
  {name: '15l', size: 15000}
];

React.render(
  <Mischungsrechner dil={popularDil} bottle={bottles} />,
  document.querySelectorAll(".render")[0]
);