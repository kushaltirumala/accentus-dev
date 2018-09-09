import React from 'react'
import Autosuggest from 'react-autosuggest';


const renderSuggestion = suggestion => (
    <div>
        {suggestion}
    </div>
);

const getSuggestionValue = suggestion => suggestion;


class CollegeBar extends React.Component {
    constructor(props) {
        super(props);

        // Autosuggest is a controlled component.
        // This means that you need to provide an input value
        // and an onChange handler that updates this value (see below).
        // Suggestions also need to be provided to the Autosuggest,
        // and they are initially empty because the Autosuggest is closed.



        this.state = {
            value: '',
            suggestions: [],
            colleges: null

        };

        this.onChange = this.onChange.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.getSuggestions = this.getSuggestions.bind(this);
    };

    componentWillMount() {
        fetch("/college").then (results => {
            return results.json()
        }).then (data => {

            this.setState({colleges: data})
            console.log("setting colleges")
            // console.log(this.state.colleges)
            // console.log(typeof(this.state.colleges))
        })
    }

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested() {
        this.setState({
            suggestions: []
        });
    };

    onChange(event, hehe) {
        this.setState({
            value: hehe.newValue
        });
    };


    onSuggestionsFetchRequested (hehe) {
        console.log(hehe);
        if (hehe) {
            this.setState({
                suggestions: this.getSuggestions(hehe.value)
            });
        } else {
            this.setState({
                suggestions: []
            });
        }
    };


     getSuggestions (value) {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : this.state.colleges.filter(lang =>
            lang.toLowerCase().slice(0, inputLength) === inputValue
        );
    };


    render() {
        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'Type a programming language',
            value,
            onChange: this.onChange
        };

        // Finally, render it!
        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
            />
        );
    }
}

export default CollegeBar;