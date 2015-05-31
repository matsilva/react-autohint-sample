/**
 * @jsx React.DOM
 */

var React = require('react');

var AutohintApp = React.createClass({

    render: function() {
        return (
            <div className="row">
                <div className="col s4 offset-s4">
                    <div className="row">
                        <div className="input-field col s12">
                            <input name="search" placeholder="enter a city?" ref="search" type="text" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

});


React.render(<AutohintApp/>, document.getElementById('autohint'));
