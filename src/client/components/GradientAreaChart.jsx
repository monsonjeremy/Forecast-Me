var Gradient = React.createClass({

  propTypes: {
    id: React.PropTypes.string,
    color1: React.PropTypes.string,
    color2: React.PropTypes.string

  },
  render: function() {
    return (
      <defs>
                <linearGradient is id={this.props.id} x1="0%" y1="100%" x2="0%" y2="0%" spreadMethod="pad">
                    <stop is offset="10%" stop-color={this.props.color1} stop-opacity={.4}/>
                    <stop is offset="80%" stop-color={this.props.color2} stop-opacity={1}/>
                </linearGradient>
            </defs>
    );
  }


});

window.D3Gradient = Gradient;

var resizeMixin = {
  componentWillMount: function() {

    var _self = this;

    $(window).on('resize', function(e) {
      _self.updateSize();
    });

    this.setState({
      width: this.props.width
    });

  },
  componentDidMount: function() {
    this.updateSize();
  },
  componentWillUnmount: function() {
    $(window).off('resize');
  },

  updateSize: function() {
    var node = ReactDOM.findDOMNode(this);
    var parentWidth = $(node).width();

    if (parentWidth < this.props.width) {
      this.setState({
        width: parentWidth - 20
      });
    } else {
      this.setState({
        width: this.props.width
      });
    }
  }
};

window.resizeMixin = resizeMixin;
var Axis = React.createClass({
  propTypes: {
    h: React.PropTypes.number,
    scale: React.PropTypes.func,
    axisType: React.PropTypes.oneOf(['x', 'y']),
    orient: React.PropTypes.oneOf(['left', 'top', 'right', 'bottom']),
    className: React.PropTypes.string,
    tickFormat: React.PropTypes.string,
    //,removeFirst:React.PropTypes.bool
    ticks: React.PropTypes.number
  },

  componentDidUpdate: function() {
    this.renderAxis();
  },
  componentDidMount: function() {
    this.renderAxis();
  },
  renderAxis: function() {

    var _self = this;

    this.axis = d3.svg.axis()
      .scale(this.props.scale)
      .orient(this.props.orient)
      .ticks(this.props.ticks);

    if (this.props.tickFormat != null && this.props.axisType === 'x')
      this.axis.tickFormat(d3.time.format(this.props.tickFormat));

    var node = ReactDOM.findDOMNode(this);
    d3.select(node).call(this.axis);

  },
  render: function() {

    var translate = "translate(0," + (this.props.h) + ")";

    return (
      <g className={this.props.className} transform={this.props.axisType=='x'?translate:""} >
            </g>
    );
  }

});

window.D3Axis = Axis;

var Grid = React.createClass({
  propTypes: {
    h: React.PropTypes.number,
    len: React.PropTypes.number,
    scale: React.PropTypes.func,
    gridType: React.PropTypes.oneOf(['x', 'y']),
    orient: React.PropTypes.oneOf(['left', 'top', 'right', 'bottom']),
    className: React.PropTypes.string,
    ticks: React.PropTypes.number
  },

  componentDidUpdate: function() {
    this.renderGrid();
  },
  componentDidMount: function() {
    this.renderGrid();
  },
  renderGrid: function() {

    this.grid = d3.svg.axis()
      .scale(this.props.scale)
      .orient(this.props.orient)
      .ticks(this.props.ticks)
      .tickSize(-this.props.len, 0, 0)
      .tickFormat("");

    var node = ReactDOM.findDOMNode(this);
    d3.select(node).call(this.grid);

  },
  render: function() {
    var translate = "translate(0," + (this.props.h) + ")";
    return (
      <g className={this.props.className} transform={this.props.gridType=='x'?translate:""}>
            </g>
    );
  }

});

window.D3Grid = Grid;

var ToolTip = React.createClass({
  propTypes: {
    tooltip: React.PropTypes.object,
    bgStyle: React.PropTypes.string,
    textStyle1: React.PropTypes.string,
    textStyle2: React.PropTypes.string,
    xValue: React.PropTypes.string,
    yValue: React.PropTypes.string

  },
  render: function() {

    var visibility = "hidden";
    var transform = "";
    var x = 0;
    var y = 0;
    var width = 150,
      height = 70;
    var transformText = 'translate(' + width / 2 + ',' + (height / 2 - 5) + ')';
    var transformArrow = "";

    if (this.props.tooltip.display == true) {
      var position = this.props.tooltip.pos;

      x = position.x;
      y = position.y;
      visibility = "visible";

      if (y > height) {
        transform = 'translate(' + (x - width / 2) + ',' + (y - height - 20) + ')';
        transformArrow = 'translate(' + (width / 2 - 20) + ',' + (height - .2) + ')';
      } else if (y < height) {

        transform = 'translate(' + (x - width / 2) + ',' + (Math.round(y) + 20) + ')';
        transformArrow = 'translate(' + (width / 2 - 20) + ',' + 0 + ') rotate(180,20,0)';
      }

    } else {
      visibility = "hidden"
    }

    return (
      <g transform={transform}>
                <rect class={this.props.bgStyle} is width={width} height={height} rx="5" ry="5" visibility={visibility}/>
                <polygon class={this.props.bgStyle} is points="10,0  30,0  20,10" transform={transformArrow}
                         visibility={visibility}/>
                <text is visibility={visibility} transform={transformText}>
                    <tspan is x="0" class={this.props.textStyle1} text-anchor="middle">{this.props.xValue +" : "+this.props.tooltip.data.key}</tspan>
                    <tspan is x="0" class={this.props.textStyle2} text-anchor="middle" dy="25">{this.props.yValue +" : "+this.props.tooltip.data.value}</tspan>
                </text>
            </g>
    );
  }
});

window.D3ToolTip = ToolTip;


var Dots = React.createClass({
  propTypes: {
    data: React.PropTypes.array,
    xData: React.PropTypes.string.isRequired,
    yData: React.PropTypes.string.isRequired,
    x: React.PropTypes.func,
    y: React.PropTypes.func,
    r: React.PropTypes.string,
    format: React.PropTypes.string,
    removeFirstAndLast: React.PropTypes.bool
  },
  render: function() {

    var _self = this;

    //remove last & first point

    var data = [];

    if (this.props.removeFirstAndLast) {
      for (var i = 1; i < this.props.data.length - 1; ++i) {
        data[i - 1] = this.props.data[i];
      }
    } else {
      data = this.props.data;
    }



    var circles = data.map(function(d, i) {

      return (<circle className="dot" r={_self.props.r} cx={_self.props.x(d[_self.props.xData])} cy={_self.props.y(d[_self.props.yData])}
                            key={i}
                            onMouseOver={_self.props.showToolTip} onMouseOut={_self.props.hideToolTip}
                            data-key={d3.time.format(_self.props.format)(d[_self.props.xData])} data-value={d[_self.props.yData]}/>)
    });

    return (
      <g>
                {circles}
            </g>
    );
  }
});


window.D3Dots = Dots;

var D3TimeLineChart = React.createClass({

  propTypes: {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    id: React.PropTypes.string,
    interpolations: React.PropTypes.string,
    data: React.PropTypes.array.isRequired,
    xData: React.PropTypes.string.isRequired,
    yData: React.PropTypes.string.isRequired,
    margin: React.PropTypes.object,
    yMaxBuffer: React.PropTypes.number,
    fill: React.PropTypes.string
  },

  mixins: [resizeMixin],

  getDefaultProps: function() {
    return {
      width: 800,
      height: 300,
      id: 'v1_chart',
      interpolations: 'linear',
      margin: {
        top: 5,
        right: 5,
        bottom: 5,
        left: 5
      },
      yMaxBuffer: 10
    };
  },
  getInitialState: function() {
    return {
      tooltip: {
        display: false,
        data: {
          key: '',
          value: ''
        }
      },
      width: 500
    };
  },

  createChart: function(_self) {

    this.w = this.state.width - (this.props.margin.left + this.props.margin.right);
    this.h = this.props.height - (this.props.margin.top + this.props.margin.bottom);

    this.xScale = d3.time.scale()
      .domain(d3.extent(this.props.data, function(d) {
        return d[_self.props.xData];
      }))
      .rangeRound([0, this.w]);

    this.yScale = d3.scale.linear()
      .domain([0, d3.max(this.props.data, function(d) {
        return d[_self.props.yData] + _self.props.yMaxBuffer;
      })])
      .range([this.h, 0]);

    this.area = d3.svg.area()
      .x(function(d) {
        return this.xScale(d[_self.props.xData]);
      })
      .y0(this.h)
      .y1(function(d) {
        return this.yScale(d[_self.props.yData]);
      }).interpolate(this.props.interpolations);


    var interpolations = [
      "linear",
      "step-before",
      "step-after",
      "basis",
      "basis-closed",
      "cardinal",
      "cardinal-closed"
    ];

    this.line = d3.svg.line()
      .x(function(d) {
        return this.xScale(d[_self.props.xData]);
      })
      .y(function(d) {
        return this.yScale(d[_self.props.yData]);
      }).interpolate(this.props.interpolations);


    this.transform = 'translate(' + this.props.margin.left + ',' + this.props.margin.top + ')';
  },

  createElements: function(element, i) {
    var object;
    switch (element.type) {
      case 'dots':
        object = (<D3Dots x={this.xScale} y={this.yScale} showToolTip={this.showToolTip} hideToolTip={this.hideToolTip}
                    {...this.props} {...element.props} key={i}/>);
        break;

      case 'tooltip':
        object = <D3ToolTip tooltip={this.state.tooltip} key={i} {...this.props} {...element.props}/>;
        break;

      case 'xGrid':
        object = <D3Grid h={this.h} len={this.h} scale={this.xScale} gridType="x" key={i} {...this.props} {...element.props}/>;
        break;

      case 'yGrid':
        object = <D3Grid h={this.h} len={this.w} scale={this.yScale} gridType="y" key={i} {...this.props} {...element.props}/>;
        break;

      case 'xAxis':
        object = <D3Axis h={this.h} scale={this.xScale} axisType="x" key={i} {...this.props} {...element.props}/>;
        break;

      case 'yAxis':
        object = <D3Axis h={this.h} scale={this.yScale} axisType="y" key={i} {...this.props} {...element.props}/>;
        break;

      case 'area':
        object = <path className={element.props.className} d={this.area(this.props.data)} key={i} fill={element.props.fill}/>;
        break;
      case 'path':
        object = <path className={element.props.className} d={this.line(this.props.data)} strokeLinecap={element.props.strokeLinecap} key={i}/>;
        break;

    }
    return object;
  },
  createDefs: function(element, i) {
    var object;
    switch (element.type) {
      case 'gradient':
        object = (<D3Gradient id={element.props.id} color1={element.props.color1} color2={element.props.color2}/>);
        break;
    }
    return object;
  },
  render: function() {
    this.createChart(this);

    var elements;
    var defs;
    var _self = this;

    if (this.props.children != null) {
      if (Array.isArray(this.props.children)) {
        elements = this.props.children.map(function(element, i) {

          if (element.type != "defs")
            return _self.createElements(element, i)
        });

        for (var i = 0; i < this.props.children.length; ++i) {
          if (this.props.children[i].type == "defs") {

            var config = this.props.children[i].props.children;
            if (config != null) {
              if (Array.isArray(config)) {
                defs = config.map(function(elem, i) {
                  return this.createDefs(elem, i)
                });
              } else {
                defs = this.createDefs(config, 0);
              }
            }

          }
        }



      } else {
        elements = this.createElements(this.props.children, 0)
      }
    }

    return (
      <div>
                <svg id={this.props.id} width={this.state.width} height={this.props.height}>
                    {defs}
                    <g transform={this.transform}>
                        {elements}

                    </g>

                </svg>


            </div>
    );
  },
  showToolTip: function(e) {
    e.target.setAttribute('fill', '#FFFFFF');

    this.setState({
      tooltip: {
        display: true,
        data: {
          key: e.target.getAttribute('data-key'),
          value: e.target.getAttribute('data-value')
        },
        pos: {
          x: e.target.getAttribute('cx'),
          y: e.target.getAttribute('cy')
        }

      }
    });
  },
  hideToolTip: function(e) {
    e.target.setAttribute('fill', '#7dc7f4');
    this.setState({
      tooltip: {
        display: false,
        data: {
          key: '',
          value: ''
        }
      }
    });
  }


});

window.D3TimeLineChart = D3TimeLineChart;

var Panel = React.createClass({
  render: function() {
    return (
      <div className="bg">
                {this.props.children}
            </div>
    );
  }
});

var PanelHeader = React.createClass({
  propTypes: {
    title: React.PropTypes.string
  },
  render: function() {
    return (
      <div className="panel-header">
                <div className="pull-left panel-title">{this.props.title}</div>
                <div className="pull-right line-height-30">
                    {this.props.children}
                </div>

            </div>
    );
  }
});


var MainContainer = React.createClass({
  render: function() {

    var data = [];
    var parseDate = d3.time.format("%m-%d-%Y").parse;

    for (var i = 0; i < 15; ++i) {

      var d = {
        day: moment().subtract(i, 'days').format('MM-DD-YYYY'),
        count: Math.floor((Math.random() * 80) + 50)
      };
      d.date = parseDate(d.day);
      data[i] = d;
    }

    var margin = {
      top: 20,
      right: 30,
      bottom: 20,
      left: 50
    };


    return (
      <div className="row">
                <div className="col-md-12 custom_padding" >
                    <Panel>
                        <PanelHeader title="Traffic Trend">
                           
                        </PanelHeader>
                        <D3TimeLineChart data={data} xData="date" yData="count" margin={margin}
                                         yMaxBuffer={10} id="line-chart" width={1500}>
                            <defs>
                                <gradient color1="#fff" color2="#53c79f" id="area"/>
                            </defs>
                            {/*<xGrid orient="bottom" className="y-grid" ticks={4}/>*/}
                            <yGrid orient="left" className="y-grid" ticks={5}/>
                            <xAxis orient="bottom" className="axis" tickFormat="%d/%m" ticks={4}/>
                            <yAxis orient="left" className="axis" ticks={5}/>
                            <area className="area" fill="url(#area)"/>
                            <path className="line shadow" strokeLinecap="round"/>
                            <dots r="5" format="%b %e" removeFirstAndLast={false}/>
                            <tooltip textStyle1="tooltip-text1" textStyle2="tooltip-text1" bgStyle="tooltip-bg" xValue="Date" yValue="Count"/>
                        </D3TimeLineChart>
                    </Panel>
                </div>
            </div>
    );
  }
});


var Page = React.createClass({
  render: function() {
    return (
      <div className="container">
                <MainContainer />
            </div>
    );
  }
});

ReactDOM.render(<Page/>, document.getElementById("chart123"));
