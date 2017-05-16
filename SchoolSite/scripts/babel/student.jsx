class StudentData extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            data: [],
            schools: [],
            firstName: "",
            lastName: "",
            age: "",
            schoolId: "",
            statePopUP: "invisible-pop-up"
        };
        
        ajax.makeAjax("http://localhost:2175/School/JSON_School",
                        {},
                        function (data) {
                            self.setState({ schools: JSON.parse(data) });
                        });

        this.saveData = this.saveData.bind(this);
        this.removeData = this.removeData.bind(this);

        this.getRows = this.getRows.bind(this);
        this.initComboBox = this.initComboBox.bind(this);
        this.changeStatePopUP = this.changeStatePopUP.bind(this);
        this.updateDataOnPage = this.updateDataOnPage.bind(this);

        this.changeFirstName = this.changeFirstName.bind(this);
        this.changeLastName = this.changeLastName.bind(this);
        this.changeAge = this.changeAge.bind(this);
        this.changeSchool = this.changeSchool.bind(this);
        
        this.updateDataOnPage();
    }

    saveData() {
        self = this;
        ajax.makeAjax(  "http://localhost:2175/Student/PostStudent",
                        {
                            id: self.state.edit ? self.state.edit.Id : 0,
                            firstName: self.state.firstName,
                            lastName: self.state.lastName,
                            age: self.state.age,
                            schoolId: self.state.schoolId,
                        },
                        function () {
                            self.updateDataOnPage();
                            self.changeStatePopUP();
                        });
    }

    updateDataOnPage() {
        self = this;
        ajax.makeAjax("http://localhost:2175/Student/JSON_Student",
                        { },
                        function (data) {
                            self.setState({ data: JSON.parse(data) });
                        });
    }

    removeData(student) {
        self = this;
        ajax.makeAjax("http://localhost:2175/Student/RemoveStudent",
                        {
                            id: student.Id
                        },
                        function () {
                            self.updateDataOnPage();
                        });
    }

    changeStatePopUP(student) {
        this.setState({
            firstName: student ? student.FirstName : "",
            lastName: student ? student.LastName : "",
            age: student ? student.Age : "",
            edit: student
        });

        if (this.state.statePopUP === "invisible-pop-up") {
            this.setState({ statePopUP: "visible-pop-up" });
        }
        else {
            this.setState({ statePopUP: "invisible-pop-up" });
        }
    }

    changeFirstName(event) {
        this.setState({ firstName: event.target.value });
    }

    changeLastName(event) {
        this.setState({ lastName: event.target.value });
    }

    changeAge(event) {
        this.setState({ age: event.target.value });
    }

    changeSchool(event) {
        this.setState({ schoolId: event.target.value });
    }


    getRows(students) {
        return students.map((student) =>
            <div className="div-row" key={student.Id}>
                <div className="div-col">{student.Id}</div>
                <div className="div-col">{student.FirstName}</div>
                <div className="div-col">{student.LastName}</div>
                <div className="div-col">{student.Age}</div>
                <div className="div-col">{student.School.Name}</div>
                <div className="div-col"><button className="btn-edit" onClick={() => this.changeStatePopUP(student)}>Edit</button></div>
                <div className="div-col"><button className="btn-remove" onClick={() => this.removeData(student)}>Remove</button></div>
            </div>
        );
    }

    initComboBox(schools) {
        return schools.map((school) =>
            <option key={school.Id} value={school.Id}>{school.Name}</option>
        );

    }
        
    render() {
        return (
            <div className="contentFromReact">
                <div>
                    <button className="btn-add" onClick={() => this.changeStatePopUP()}>Add Student</button>
                </div><br />
               <div className="div-table">
                    <div className="div-row-head">
                        <div className="div-col">ID</div>
                        <div className="div-col">First Name</div>
                        <div className="div-col">Last Name</div>
                        <div className="div-col">Age</div>
                        <div className="div-col">School</div>
                        <div className="div-col"></div>
                        <div className="div-col"></div>
                    </div>
                    {this.getRows(this.state.data)}
        </div>

         <div className={this.state.statePopUP}>
                 <form className="input-form">
                     <div>
                        <label>
                            First name:
                            <input type="text" onChange={this.changeFirstName} value={this.state.firstName} placeholder="First name..." />
                        </label>
                     </div>
                     <div>
                        <label>
                            Last name:
                            <input type="text" onChange={this.changeLastName} value={this.state.lastName} placeholder="Last name..." />
                        </label>
                     </div>
                     <div>
                        <label>
                            Age:
                            <input type="number" onChange={this.changeAge} value={this.state.age} placeholder="Age..." />
                        </label>
                     </div>
                     <div>
                        <label>
                            School:
                             <select onChange={this.changeSchool}>
                                 {this.initComboBox(this.state.schools)}
                             </select>
                        </label>
                     </div>
                    <hr />
                    <div>
                        <button type="button" className="btn-save" onClick={() => this.saveData()}>Save</button>
                        <button type="button" className="btn-cancel" onClick={() => this.changeStatePopUP()}>Cancel</button>
                    </div>
</form>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<StudentData />, document.getElementById("data"));