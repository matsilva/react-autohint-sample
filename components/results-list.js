/**
 * @jsx React.DOM
 */

var React = require('react');

var ResultsList = React.createClass({

    propTypes: {
        results: React.PropTypes.array.isRequired,
        activeIndex: React.PropTypes.number.isRequired,
    },

    getResultItem: function(result) {
        console.log(result);
    },

    render: function() {

        var listItems = this.props.results.map(function(result, i) {
            var itemClass = this.props.activeIndex === i ? "collection-item active" : "collection-item";
            return (
                <a key={result.name + Math.random()} ref={result.name} href="javscript:void(0);" onClick={this.getResultItem.bind(this, result.name)} className={itemClass}>{result.name}</a>
            );
        }.bind(this));

        return (
            <div>
                <div className="collection">
                    {listItems}
                </div>
            </div>
        );
    }

});

module.exports = ResultsList;
