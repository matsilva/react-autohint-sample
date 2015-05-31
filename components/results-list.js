/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

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
                <a key={result} ref={result} href="javscript:void(0);" onClick={this.getResultItem.bind(this, result)} className={itemClass}>{result}</a>
            );
        }.bind(this));

        return (
            <div>
                <div className="collection">
                    <ReactCSSTransitionGroup transitionName="result" transitionAppear={true}>
                        {listItems}
                    </ReactCSSTransitionGroup>
                </div>
            </div>
        );
    }

});

module.exports = ResultsList;
