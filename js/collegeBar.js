import React from 'react'
// import Autosuggest from 'react-autosuggest';
import Select from 'react-select';

class CollegeBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colleges: [],
            currentCollege: "UCLA"
        }

    };

    componentWillMount() {
                fetch("/college").then (results => {
                        console.log(results);
                        console.log(typeof(results));
                        return results.json()
                        }).then (data => {

                            // console.log(data);
                            var temp = [];


                            for (var i = 0; i < data.length; i++) {
                                temp.push({ label: data[i], value: data[i] });

                                console.log(data[i]);
                            }
                            // console.log(data.json());
                            this.setState({colleges: temp});
                        console.log("setting colleges")
                        })
            }




    render() {


        // console.log("2");
        // console.log(this.state.colleges);


        // Finally, render it!
        return (
            <Select
                defaultValue={this.state.currentCollege}
                isMulti
                name="colleges"
                options={this.state.colleges}
                className="basic-multi-select"
                classNamePrefix="select"
            />
        );
    }
}

export default CollegeBar;