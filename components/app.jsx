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
      })
      return (
        <div>
          <form className="pure-form">
            <fieldset>
              <legend>Mischungsverhältnis eingeben</legend>
              <input type="number" placeholder="1" name="1" onChange={this.updateDilInput} value={this.state.dilution1} /> : 
              <input type="number" placeholder="2" name="2" onChange={this.updateDilInput} value={this.state.dilution2} />
            </fieldset>
          </form>
          <h4>Beliebte Mischungsverhältnisse:</h4>
          {renderDil}
          <h3>{this.state.dilution1 !== 0 && this.state.dilution2 !== 0 ? this.state.dilution1 + ':' + this.state.dilution2 : ''}
          {this.state.bottle !== 0 ? this.state.bottle : ''}</h3>
          {renderBottle}
          <h4>{calc !== 0 ? 'Dein Mischungsverhältnis: ' + calc : ''}</h4>
        </div>
      
      );
  }
});
function calculateDil(part1, part2, bottle) {  
  var parts = parseInt(part1) + parseInt(part2);
  return parts
}
var Dillution = React.createClass({
  dilClickHandler: function() {
    this.props.updateDil(this.props.part1, this.props.part2);
  },
  render: function() {
    return(
      <button className="pure-button" onClick={this.dilClickHandler}>
        {this.props.name}
      </button>
    )
  }
});
var Bottle = React.createClass({
  bottleClickHandler: function() {
    this.props.updateBottle(this.props.size);
  },
  render: function() {
    return(
      <button className="pure-button" onClick={this.bottleClickHandler}>
        {this.props.name}
      </button>
    );
  }
});

var popularDil = [
  {name: '1:2', part1: 1, part2: 2},
  {name: '1:4', part1: 1, part2: 4},
  {name: '1:5', part1: 1, part2: 5}
];
var bottles = [
  {name: '100ml', size: 100},
  {name: '200ml', size: 200},
  {name: '500ml', size: 500},
];

React.render(
  <Mischungsrechner dil={popularDil} bottle={bottles} />,
  document.querySelectorAll(".render")[0]
);