/**
 * @jsx React.DOM
 */

var React = require('react');
var request = require('superagent');
var _ = require('lodash');

//Components
//***********
var SearchInput = require('./search-input');
var ResultsList = require('./results-list');


var AutohintApp = React.createClass({

    getInitialState: function() {
        return {
            results: [],
            activeIndex: -1,
        };
    },

    sendSearchValue: function(val) {
        request
            .get('http://localhost:3000/cities')
            .query({q: val})
            .end(function(err, res) {
                this.setState({
                    results: _.take(res.body, 10)
                });
            }.bind(this));
    },

    selectItem: function(index) {
        if (index === -1 && this.state.activeIndex === -1) {
            return;
        }
        var newIndex = index + this.state.activeIndex;

        if (newIndex >= this.state.results.length) {
            return;
        }

        this.setState({activeIndex: newIndex});
    },

    render: function() {
        return (
            <div className="row">
                <div className="col s4 offset-s4">
                    <div className="row">
                        <SearchInput selectItem={this.selectItem} sendSearchValue={this.sendSearchValue} />
                        {this.state.results.length ? <ResultsList activeIndex={this.state.activeIndex} results={this.state.results} /> : null}
                    </div>
                </div>
            </div>
        );
    }

});





React.render(<AutohintApp/>, document.getElementById('autohint'));
