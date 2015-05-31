/**
 * @jsx React.DOM
 */

var React = require('react');
var request = require('superagent');

//Components
//***********
var SearchInput = require('./search-input');
var ResultsList = require('./results-list');


var AutohintApp = React.createClass({

    getInitialState: function() {
        return {
            results: [],
        };
    },

    sendSearchValue: function(val) {
        request
            .get('http://mock-autocomplete.herokuapp.com/autocomplete')
            .query({q: val})
            .end(function(err, res) {
                this.setState({
                    results: res.body.data
                });
            }.bind(this));
    },

    render: function() {
        return (
            <div className="row">
                <div className="col s4 offset-s4">
                    <div className="row">
                        <SearchInput sendSearchValue={this.sendSearchValue} />
                        {this.state.results.length ? <ResultsList results={this.state.results} /> : null}
                    </div>
                </div>
            </div>
        );
    }

});





React.render(<AutohintApp/>, document.getElementById('autohint'));
