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

const events = [
    {
        id: 0,
        title: 'All Day Event very long title',
        allDay: true,
        start: new Date(2015, 3, 0),
        end: new Date(2015, 3, 1),
    },
    {
        id: 1,
        title: 'Long Event',
        start: new Date(2015, 3, 7),
        end: new Date(2015, 3, 10),
    },

    {
        id: 2,
        title: 'DTS STARTS',
        start: new Date(2016, 2, 13, 0, 0, 0),
        end: new Date(2016, 2, 20, 0, 0, 0),
    },

    {
        id: 3,
        title: 'DTS ENDS',
        start: new Date(2016, 10, 6, 0, 0, 0),
        end: new Date(2016, 10, 13, 0, 0, 0),
    },

    {
        id: 4,
        title: 'Some Event',
        start: new Date(2015, 3, 9, 0, 0, 0),
        end: new Date(2015, 3, 10, 0, 0, 0),
    },
    {
        id: 5,
        title: 'Conference',
        start: new Date(2015, 3, 11),
        end: new Date(2015, 3, 13),
        desc: 'Big conference for important people',
    },
    {
        id: 6,
        title: 'Meeting',
        start: new Date(2015, 3, 12, 10, 30, 0, 0),
        end: new Date(2015, 3, 12, 12, 30, 0, 0),
        desc: 'Pre-meeting meeting, to prepare for the meeting',
    },
    {
        id: 7,
        title: 'Lunch',
        start: new Date(2015, 3, 12, 12, 0, 0, 0),
        end: new Date(2015, 3, 12, 13, 0, 0, 0),
        desc: 'Power lunch',
    },
    {
        id: 8,
        title: 'Meeting',
        start: new Date(2015, 3, 12, 14, 0, 0, 0),
        end: new Date(2015, 3, 12, 15, 0, 0, 0),
    },
    {
        id: 9,
        title: 'Happy Hour',
        start: new Date(2015, 3, 12, 17, 0, 0, 0),
        end: new Date(2015, 3, 12, 17, 30, 0, 0),
        desc: 'Most important meal of the day',
    },
    {
        id: 10,
        title: 'Dinner',
        start: new Date(2015, 3, 12, 20, 0, 0, 0),
        end: new Date(2015, 3, 12, 21, 0, 0, 0),
    },
    {
        id: 11,
        title: 'Birthday Party',
        start: new Date(2015, 3, 13, 7, 0, 0),
        end: new Date(2015, 3, 13, 10, 30, 0),
    },
    {
        id: 12,
        title: 'Late Night Event',
        start: new Date(2015, 3, 17, 19, 30, 0),
        end: new Date(2015, 3, 18, 2, 0, 0),
    },
    {
        id: 12.5,
        title: 'Late Same Night Event',
        start: new Date(2015, 3, 17, 19, 30, 0),
        end: new Date(2015, 3, 17, 23, 30, 0),
    },
    {
        id: 13,
        title: 'Multi-day Event',
        start: new Date(2015, 3, 20, 19, 30, 0),
        end: new Date(2015, 3, 22, 2, 0, 0),
    },
    {
        id: 14,
        title: 'Today',
        start: new Date(new Date().setHours(new Date().getHours() - 3)),
        end: new Date(new Date().setHours(new Date().getHours() + 3)),
    },
];


class CollegeBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colleges: [],
            currentCollege: "UCLA",
            events: []
        }

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



    handleOnChange () {
        console.log("changing college state");
    };

    handleSelect(event) {
        console.log(event);
    }

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
                    events={events}
                    startAccessor='startDate'
                    endAccessor='endDate'
                    onSelectEvent={event => alert(event.title)}
                    onSelectSlot={this.handleSelect}
                />
                </div>
            </React.Fragment>

        );
    }
}

export default CollegeBar;