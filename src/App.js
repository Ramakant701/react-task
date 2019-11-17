import React from 'react';
import './App.css';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputFlag: false,
            projectName: 'Issue tracker for BizAnalytics ',
            buttonName: 'Edit',
            isDisabled: false,
            buttonStyle: {
                backgroundColor: "#0087ffe0",
                borderRadius: "5px",
                color: "white"
            },
            rowData: [
                {
                    id: 1,
                    description: 'Create login page',
                    status: 'done',
                    style: {
                        backgroundColor: 'lightgreen'
                    }
                },
                {
                    id: 2,
                    description: 'Store encrypted passwords',
                    status: 'not-started',
                    style: {
                        backgroundColor: '#e66c6ce8'
                    }
                },
                {
                    id: 3,
                    description: 'Design database tables for User',
                    status: 'in-progress',
                    style: {
                        backgroundColor: '#8484da'
                    }
                },
            ],
            colorChange: {
                'in-progress': '#8484da',
                'done': '#e66c6ce8',
                'not-started': 'lightgreen',
            }
        };
    }


    input = () => {
        return <input id={'projectName'} type={'text'} style={{width: '438px', height: '39px', fontSize: '30px'}}
                      defaultValue={this.state.projectName}/>
    };

    table = () => {
        return <table style={{width: '100%'}}>
            <tbody>
            <tr style={{backgroundColor: 'grey'}}>
                <th>ID</th>
                <th>Description</th>
                <th>Status</th>
            </tr>
            {
                this.state.rowData.map((row, index) => {
                    return (
                        <this.row
                            id={row.id}
                            key={index}
                            description={row.description}
                            status={row.status}
                            style={row.style}/>
                    );
                })
            }
            </tbody>
        </table>
    };

    select = (val, id) => {
        return <select onChange={
            (event) => {
                this.handleSelectChange(event, id)
            }} defaultValue={val}>
            <option value="not-started">Not Started</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
        </select>
    };

    note = () => {
        return <p>Once Done button is clicked,the project name will be no longer editable</p>
    };

    button = () => {
        return <button onClick={this.handleClick} disabled={this.state.isDisabled}
                       style={this.state.buttonStyle}>{this.state.buttonName}
        </button>
    };

    row = (props) => {
        return (
            <tr style={props.style}>
                <td>{props.id}</td>
                <td>{props.description}</td>
                <td>
                    {this.select(props.status, props.id)}
                </td>
            </tr>
        )
    };

    //all event handling will be done here

    handleClick = () => {
        console.log('hi');
        if (!this.state.inputFlag) {
            this.setState({inputFlag: true, buttonName: 'Done'});
        } else {
            this.setState({
                inputFlag: false,
                buttonName: 'Edit',
                isDisabled: true,
                projectName: document.querySelector('#projectName').value,
                buttonStyle: {
                    backgroundColor: "grey",
                    borderRadius: "5px",
                    color: "white"
                }
            });
        }
    };


    handleSelectChange = (event, id) => {
        const rows = this.state.rowData;
        const row = rows.find(row => row.id === id);
        const index = rows.indexOf(row);
        try {
            rows[index]['style'] = {backgroundColor: this.state.colorChange[event.target.value]};
            this.setState({
                rowData: rows
            });
        } catch (error) {
            console.log('error', error);
        }
    };


    render() {
        return (
            <div>
                {
                    !this.state.inputFlag ?
                        <h1>
                            {this.state.projectName} {this.button()}
                        </h1>
                        :
                        <div>
                            {this.input()} {this.button()} {this.note()}
                        </div>
                }
                {
                    this.table()
                }
            </div>
        );
    }
}

export default App;
