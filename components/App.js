/**
 * @jsx React.DOM
 */

var React = require('react');

var AutohintApp = React.createClass({

    sendSearchValue: function(val) {
        console.log(val);
    },

    render: function() {
        return (
            <div className="row">
                <div className="col s4 offset-s4">
                    <div className="row">
                        <SearchInput sendSearchValue={this.sendSearchValue} />
                    </div>
                </div>
            </div>
        );
    }

});

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



React.render(<AutohintApp/>, document.getElementById('autohint'));
