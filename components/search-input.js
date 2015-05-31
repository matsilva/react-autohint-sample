/**
 * @jsx React.DOM
 */

var React = require('react');

var SearchInput = React.createClass({

    propTypes: {
        sendSearchValue: React.PropTypes.func.isRequired,
        selectItem: React.PropTypes.func.isRequired,
    },

    getSearchValue: function() {
        var searchInput = React.findDOMNode(this.refs.search);
        var searchVal = searchInput.value;
        this.props.sendSearchValue(searchVal);
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
        }
    },
        render: function() {
        return (
            <div className="input-field col s12">
                <input 
                onKeyDown={this.handleKeyDown}
                onChange={this.getSearchValue} 
                name="search" placeholder="enter a city?" 
                ref="search" 
                type="text" />
            </div>
        );
    }

});

module.exports = SearchInput;
