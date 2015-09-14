var calc = 0;
var Mischungsrechner = React.createClass({displayName: "Mischungsrechner",
  getInitialState: function() {
    return {
      dil: 0,
      bottle: 0,
      calc: 0
    }
  },
  updateDil: function(e) {
    this.setState({
      dil: e
    });
  },
  updateBottle: function(e) {
  this.setState({
    bottle: e
  });
  },
  render: function() {
  if(this.state.dil !== 0 && this.state.bottle !== 0) {
      calc = calculateDil(this.state.dil, this.state.bottle);
    }
  var self = this;
    var renderDil = this.props.dil.map(function(l) {
      return React.createElement(Dillution, {name: l.name, part1: l.part1, part2: l.part2, updateDil: self.updateDil})
    });
    var renderBottle = this.props.bottle.map(function(l) {
      return React.createElement(Bottle, {name: l.name, size: l.size, updateBottle: self.updateBottle})
    })
    return (
      React.createElement("div", null, 
        React.createElement("h4", null, "Beliebte Mischungsverhältnisse:"), 
        renderDil, 
        React.createElement("h3", null, this.state.dil !== 0 ? this.state.dil : '', " ", this.state.bottle !== 0 ? this.state.bottle : ''), 
        renderBottle, 
        React.createElement("h4", null, calc !== 0 ? 'Dein Mischungsverhältnis: ' + calc : '')
      )
    
    );
  }
});
function calculateDil(dil, bottle) {
  dil = dil.split(":");
  part1 = dil[0];
  part2 = dil[1];
  
  return part1 + part2 + bottle;
}
var Dillution = React.createClass({displayName: "Dillution",
  getInitialState: function() {
    return {
      thedil: 0
    }
  },
  dilClickHandler: function() {
    this.props.updateDil(this.props.name);
  },
  render: function() {
    return(
      React.createElement("div", {className: "dilbtn", onClick: this.dilClickHandler}, 
        this.props.name
      )
    )
  }
});
var Bottle = React.createClass({displayName: "Bottle",
  bottleClickHandler: function() {
    this.props.updateBottle(this.props.size);
  },
  render: function() {
    return(
      React.createElement("div", {className: "dilbtn", onClick: this.bottleClickHandler}, 
        this.props.name
      )
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
  React.createElement(Mischungsrechner, {dil: popularDil, bottle: bottles}),
  document.querySelectorAll(".render")[0]
);