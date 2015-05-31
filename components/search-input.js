/**
 * @jsx React.DOM
 */

var React = require('react');

var SearchInput = React.createClass({

    propTypes: {
        sendSearchValue: React.PropTypes.func.isRequired,
    },

    getSearchValue: function() {
        var searchInput = React.findDOMNode(this.refs.search);
        var searchVal = searchInput.value;
        this.props.sendSearchValue(searchVal);
    },

    render: function() {
        return (
            <div className="input-field col s12">
                <input onChange={this.getSearchValue} name="search" placeholder="enter a city?" ref="search" type="text" />
            </div>
        );
    }

});

module.exports = SearchInput;
