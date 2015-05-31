/**
 * @jsx React.DOM
 */

var React = require('react');
var request = require('superagent');

//Components
//***********
var SearchInput = require('./search-input');


var AutohintApp = React.createClass({

    sendSearchValue: function(val) {
        request
            .get('http://mock-autocomplete.herokuapp.com/autocomplete')
            .query({q: val})
            .end(function(err, res) {
                console.log(res.body.data);
            });
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





React.render(<AutohintApp/>, document.getElementById('autohint'));
