class StudentData extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            schools: [],
            subjects: [],
            selected_subjects: [],
            firstName: "",
            lastName: "",
            age: "",
            schoolId: 1,
            statePopUP: "invisible-pop-up",
            firstNameMess: "",
            lastNameMess: "",
            ageMess: ""
        };

        ajax.makeAjax("http://localhost:2175/School/JSON_ALL_School",
                        {},
                        function (data) {
                            self.setState({ schools: JSON.parse(data).Items });
                        });

        ajax.makeAjax("http://localhost:2175/Subject/JSON_ALL_Subject",
                        {},
                        function (data) {
                            self.setState({ subjects: JSON.parse(data).Items });
                        });

        this.saveData = this.saveData.bind(this);
        this.removeData = this.removeData.bind(this);

        this.getRows = this.getRows.bind(this);
        this.initComboBox = this.initComboBox.bind(this);
        this.initComboBoxSubjects = this.initComboBoxSubjects.bind(this);
        this.changeStatePopUP = this.changeStatePopUP.bind(this);
        this.updateDataOnPage = this.updateDataOnPage.bind(this);

        this.changeFirstName = this.changeFirstName.bind(this);
        this.changeLastName = this.changeLastName.bind(this);
        this.changeAge = this.changeAge.bind(this);
        this.changeSchool = this.changeSchool.bind(this);
        this.changeSubjects = this.changeSubjects.bind(this);

        this.updateDataOnPage(true);
    }

    saveData() {
        self = this;

        self.setState({
            firstNameMess: "",
            lastNameMess: "",
            ageMess: ""
        });

        var isOk = !(self.state.firstName === "" || self.state.lastName === "" || self.state.age === "");

        if (!isOk) {

            if (self.state.firstName === "") {
                self.setState({
                    firstNameMess: 'First Name is Empty!'
                });
            }

            if (self.state.lastName === "") {
                self.setState({
                    lastNameMess: 'Last Name is Empty!'
                });
            }

            if (self.state.firstName === "") {
                self.setState({
                    ageMess: 'Age is Empty!'
                });
            }

            return;
        }

        ajax.makeAjax("http://localhost:2175/Student/PostStudent",
                        {
                            id: self.state.edit ? self.state.edit.Id : 0,
                            firstName: self.state.firstName,
                            lastName: self.state.lastName,
                            age: self.state.age,
                            schoolId: self.state.schoolId,
                            subjects: self.state.selected_subjects.join()
                        },
                        function () {
                            if (self.state.count % 10 != 0) {
                                self.setState({
                                    count: self.state.count + 1
                                });
                            }
                            self.updateDataOnPage();
                            self.changeStatePopUP();
                        });
    }

    updateDataOnPage(toLoad) {
        self = this;
        ajax.makeAjax("http://localhost:2175/Student/JSON_Student",
                        {
    get: Boolean(toLoad),
                            count: self.state.count
                        },
                        function (data) {
                            var jsonObj = JSON.parse(data);
                            self.setState({
                                count: jsonObj.Count,
                                data: jsonObj.Items
                            });
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

        console.log(student ? student.Subjects : "");

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

    changeSubjects(event) {

        var options = event.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(parseInt(options[i].value));
            }
        }

        this.setState({ selected_subjects: value });
    }

    getRows(students) {
        return students.map((student) =>
            <div className="div-row" key={student.Id}>
                <div className="div-col-num">{student.Id}</div>
                <div className="div-col">{student.FirstName}</div>
                <div className="div-col">{student.LastName}</div>
                <div className="div-col-num">{student.Age}</div>
                <div className="div-col">{student.School.Name}</div>
                <div className="div-col-btn"><button className="btn-edit" onClick={() => this.changeStatePopUP(student)}>Edit</button></div>
                <div className="div-col-btn"><button className="btn-remove" onClick={() => this.removeData(student)}>Remove</button></div>
            </div>
        );
    }

    initComboBox(schools) {
        return schools.map((school) =>
            <option key={school.Id} value={school.Id}>{school.Name}</option>
        );
    }

    initComboBoxSubjects(subjects) {
        return subjects.map((subject) =>
            <option key={subject.Id} value={subject.Id }>{subject.Title}</option>
        );
    }

    render() {
        return (
            <div className="contentFromReact">
                <div>
                    <button className="btn-add" onClick={() => this.changeStatePopUP()}>Add Student</button>
                </div>
               <div className="div-table">
                    <div className="div-row-head">
                        <div className="div-col-num">ID</div>
                        <div className="div-col">First Name</div>
                        <div className="div-col">Last Name</div>
                        <div className="div-col-num">Age</div>
                        <div className="div-col">School</div>
                        <div className="div-col-btn"></div>
                        <div className="div-col-btn"></div>
                    </div>
                   {this.getRows(this.state.data)}
               </div>
        <div>
            <button className="btn-add" onClick={() => this.updateDataOnPage(true)}>See more</button>
        </div>

         <div className={this.state.statePopUP}>
                 <form className="input-form">
                         <div>
                             <div>
                                <label>
                                    First name:
                                    <input type="text" onChange={this.changeFirstName} value={this.state.firstName} placeholder="First name..." />
                                </label>
                                 <p className="errorMess">{this.state.firstNameMess}</p>
                             </div>
                             <div>
                                <label>
                                    Last name:
                                    <input type="text" onChange={this.changeLastName} value={this.state.lastName} placeholder="Last name..." />
                                </label>
                                 <p className="errorMess">{this.state.lastNameMess}</p>
                             </div>
                             <div>
                                <label>
                                    Age:
                                    <input type="number" onChange={this.changeAge} value={this.state.age} placeholder="Age..." />
                                </label>
                                 <p className="errorMess">{this.state.ageMess}</p>
                             </div>
                             <div>
                                <label>
                                    School:
                                     <select onChange={this.changeSchool}>
                                         {this.initComboBox(this.state.schools)}
                                     </select>
                                </label>
                             </div>
                         </div>

                         <div>
                                <label>
                                    Subjects:
                                     <select multiple onChange={this.changeSubjects}>
                                         {this.initComboBoxSubjects(this.state.subjects)}
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

ReactDOM.render(<StudentData />, document.getElementById("content"));