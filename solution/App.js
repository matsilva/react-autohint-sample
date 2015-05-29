/** @jsx React.DOM */

/*
 * Add autocomplete hints to this text box using the following API endpoint.  
 *
 * http://mock-autocomplete.herokuapp.com/autocomplete?q=v
 * */

var React = require('react');
var $ = require('jquery');
var _ = require('lodash');

var Search = React.createClass({
  getInitialState: function() {
    return {
      dataCache: {},
      lastRequest: null,
    };
  },
  handleKeyDown: function(e) {
    switch (e.keyCode) {
      case 38:
      //Handles when "up arrow" is pressed
        this.props.selectItem(-1);
      break;

      case 40:
      //Handles when "down arrow" is pressed
        this.props.selectItem(1);
      break;

      case 9:
      //Handles when "tab" is pressed and prepopulates input
        this.props.setInputVal(this.refs.search.getDOMNode());
      e.preventDefault();
      break;
    }
  },
  handleChange: function() {
    var input = this.refs.search.getDOMNode().value;

    if (input === "") {
      return this.props.handleInput([]); 
    }

    //Get data from cache
    if (this.state.dataCache[input]) {
      return this.props.handleInput(this.state.dataCache[input]);
    }


    var ajaxFlight = $.ajax({
      url: 'http://mock-autocomplete.herokuapp.com/autocomplete',
      data: {
        q: input
      },
      beforeSend: function() {
        //Abort previous request if it has not landed
        if(this.state.lastRequest) {
          this.state.lastRequest.abort();
        }
      }.bind(this),
      success: function(res){
        //Send data to parent
        this.props.handleInput(res.data);
        //Add new data to cache
        var newCache = this.state.dataCache;
        newCache[input] = res.data;
        this.setState({
          dataCache: newCache,
          lastRequest: null,
        });
      }.bind(this)
    });  

    //Set last request
    this.setState({
      lastRequest: this.state.lastRequest = ajaxFlight
    });

  },
  render: function() {
    //Debounce is applied to onChange event
    var onChangeFunc = _.debounce(this.handleChange, 250);

    //Turn off debounce to illustrate aborted calls
    if (/debounce=false/.test(document.location.search)) {
      onChangeFunc = this.handleChange;
    }
    return (
      <input 
      className="form-control" 
      type="text" 
      ref="search" 
      onKeyDown={this.handleKeyDown}
      onChange={onChangeFunc} />
    );
  },
});

var ResultItem = React.createClass({
  render: function() {
    var itemClass = this.props.isActive ? "list-group-item active" : "list-group-item";
    return (
      <li className={itemClass}>{this.props.item}</li>
    );
  }
});

var ResultList = React.createClass({
  render: function() {
    var resultItems = this.props.list.map(function(item, i){
      var isActive = this.props.activeItem === i;
      return (
        <ResultItem isActive={isActive} item={item} key={i + item} />
      );
    }.bind(this));
    return (
      <ul ref="results" className="list-group">
      {resultItems}
      </ul>
    );
  }
});

var SearchApp = React.createClass({
  getInitialState: function(){
    return {
      list: [],
      activeItemIndex: -1,
    };
  },
  handleInput: function(data){
    this.setState({
      list: data,
      activeItemIndex: -1,
    });
  },
  setInputVal: function(searchNode) {
    //Set the input value to the active item
    var activeIndex = this.state.activeItemIndex;
    var data = this.state.list;
    if (data[activeIndex]) {
      searchNode.value = data[activeIndex];
    }
  },
  handleSelectItem: function(i) {
    //Set the selected item
    var newIndex = this.state.activeItemIndex + i;
    if(newIndex < -1){
      return;
    } else if (newIndex === this.state.list.length){
      return;
    }

    this.setState({
      activeItemIndex: newIndex
    }); 
  },
  render: function() {
    return (
      <div>
      <h1 className="text-center">Enter Search</h1>
      <Search 
      activeItem={this.state.activeItemIndex} 
      selectItem={this.handleSelectItem} 
      setInputVal={this.setInputVal} 
      handleInput={this.handleInput} />
      <ResultList activeItem={this.state.activeItemIndex} list={this.state.list} /> 
      </div>
    );
  }
});

React.render(<SearchApp />, $('#SearchApp')[0]);
