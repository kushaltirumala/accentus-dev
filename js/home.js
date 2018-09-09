import React from "react";
import ReactDOM from 'react-dom';
import CollegeBar from "./collegeBar"

// const divStyle = {
//     margin: ,
// };


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null
        };
    }

    // handleClick = buttonName => {
    //     this.setState(calculate(this.state, buttonName));
    // };
    componentWillMount() {
        fetch("/getuser").then( results => {
            return results.json()
        }).then( data => {
            this.setState({username: data})
        })
    }


    render() {
        console.log(this.state.colleges)
        return (
            <div>
                <h1>Welcome back {this.state.username}</h1>
                <CollegeBar />
            </div>
        );
    }
}
export default Home;