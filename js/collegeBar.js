import React from 'react'
// import Autosuggest from 'react-autosuggest';
import Select from 'react-select';
import BigCalendar from 'react-big-calendar'
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';


BigCalendar.momentLocalizer(moment);

var divStyle = {
    height: 800,
    margin: 40,
    textAlign: 'center'
};

var div2Style = {
    width: "75%",
    margin: 20,
    textAlign: 'center'
};

class CollegeBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colleges: [],
            currentCollege: "UCLA",
            events: [ {
                id: 0,
                title: 'hi',
                allDay: true,
                start: new Date(2018, 9, 1),
                end: new Date(2018, 9, 2)
            }]
        };

        this.handleOnChange = this.handleOnChange.bind(this);

    };

    componentWillMount() {
                fetch("/college").then (results => {
                        console.log(results);
                        console.log(typeof(results));
                        return results.json()
                        }).then (data => {
                            var temp = [];

                            for (var i = 0; i < data.length; i++) {
                                temp.push({ label: data[i], value: data[i] });
                            }
                            this.setState({colleges: temp});
                        console.log("setting colleges")
                        })
            }



    handleOnChange (event) {
        var temp = [];
        for (var i = 0; i < event.length; i++) {
            var collegeName = event[i].value;
            console.log("pushing " + collegeName);
            var tempEvent =    {
                    id: i,
                      title: collegeName,
                        allDay: true,
                       start: new Date(2018, 9, 5),
                       end: new Date(2018, 9, 6)
            };

            temp.push(tempEvent);
        }
        console.log(event);
        console.log(typeof(event));
        console.log("changing college state");

        this.setState({events: temp});
    };

    handleSelect(event) {
        console.log(event);
    }


    // createEvents() {
    //
    // }

    render() {


        return (
            <React.Fragment>
                <div style={div2Style}>
            <Select
                defaultValue={this.state.currentCollege}
                isMulti
                name="colleges"
                options={this.state.colleges}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={this.handleOnChange}
            />
                </div>
                <div style={divStyle}>
                <BigCalendar
                    selectable
                    events={this.state.events}
                    startAccessor='start'
                    endAccessor='end'
                    onSelectEvent={event => alert(event.title)}
                    onSelectSlot={this.handleSelect}
                />
                </div>
            </React.Fragment>

        );
    }
}

export default CollegeBar;