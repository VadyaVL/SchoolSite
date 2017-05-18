class MarkData extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            count: 0,
            student: null,
            subject: null,
            students: [],
            subjects: [],
            value: '',
            statePopUP: "invisible-pop-up",
            valueMess: ''
        };


        ajax.makeAjax("http://localhost:2175/Student/JSON_ALL_Student",
                        {},
                        function (data) {
                            self.setState({
                                students: JSON.parse(data).Items,
                                student: JSON.parse(data).Items ? JSON.parse(data).Items[0].Id : null,
                            });
                        });

        ajax.makeAjax("http://localhost:2175/Subject/JSON_ALL_Subject",
                        {},
                        function (data) {
                            self.setState({
                                subjects: JSON.parse(data).Items,
                                subject: JSON.parse(data).Items ? JSON.parse(data).Items[0].Id : null,
                            });
                        });

        this.saveData = this.saveData.bind(this);
        this.removeData = this.removeData.bind(this);

        this.getRows = this.getRows.bind(this);
        this.initComboBoxStudent = this.initComboBoxStudent.bind(this);
        this.initComboBoxSubject = this.initComboBoxSubject.bind(this);
        this.changeStatePopUP = this.changeStatePopUP.bind(this);
        this.updateDataOnPage = this.updateDataOnPage.bind(this);
        this.changeValue = this.changeValue.bind(this);

        this.changeStudent = this.changeStudent.bind(this);
        this.changeSubject = this.changeSubject.bind(this);

        this.updateDataOnPage(true);
    }

    saveData() {
        self = this;

        self.setState({
            valueMess: ''
        });

        if (self.state.value == "") {
            self.setState({
                valueMess: 'Mark is Empty!'
            });

            return;
        }
        ajax.makeAjax("http://localhost:2175/Mark/PostMark",
                        {
                            id: self.state.edit ? self.state.edit.Id : 0,
                            student_id: self.state.student,
                            subject_id: self.state.subject,
                            value: self.state.value,
                        },
                        function () {
                            if (self.state.count % 10 != 0 || self.state.count == 0) {
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
        ajax.makeAjax("http://localhost:2175/Mark/JSON_Mark",
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

    removeData(mark) {
        self = this;
        ajax.makeAjax("http://localhost:2175/Mark/RemoveMark",
                        {
                            id: mark.Id
                        },
                        function () {
                            self.updateDataOnPage();
                        });
    }

    changeStatePopUP(school) {

        this.setState({ name: school ? school.Name : "", edit: school });

        if (this.state.statePopUP === "invisible-pop-up") {
            this.setState({ statePopUP: "visible-pop-up" });
        }
        else {
            this.setState({ statePopUP: "invisible-pop-up" });
        }
    }

    changeValue(event) {
        this.setState({ value: event.target.value });
    }

    changeStudent(event) {
        this.setState({ student: event.target.value });
    }

    changeSubject(event) {
        this.setState({ subject: event.target.value });
    }

    getRows(marks) {
        return marks.map((mark) =>
            <div className="div-row" key={mark.Id}>
                <div className="div-col-num">{mark.Id}</div>
                <div className="div-col">{mark.Student.LastName + " " + mark.Student.FirstName}</div>
                <div className="div-col">{mark.Subject.Title}</div>
                <div className="div-col-num">{mark.Value}</div>
                <div className="div-col-btn"><button className="btn-edit" onClick={() => this.changeStatePopUP(mark)}>Edit</button></div>
                <div className="div-col-btn"><button className="btn-remove" onClick={() => this.removeData(mark)}>Remove</button></div>
            </div>
        );
    }

    initComboBoxSubject(subjects) {
        return subjects.map((subject) =>
            <option key={subject.Id} value={subject.Id }>{subject.Title}</option>
        );
    }

    initComboBoxStudent(students) {
        return students.map((student) =>
            <option key={student.Id} value={student.Id }>{student.FirstName + " " + student.LastName}</option>
        );
    }


    render() {
        return (
            <div className="contentFromReact">
                <div>
                    <button className="btn-add" onClick={() => this.changeStatePopUP()}>Add Mark</button>
                </div>

               <div className="div-table">
                    <div className="div-row-head">
                        <div className="div-col-num">ID</div>
                        <div className="div-col">Student</div>
                        <div className="div-col">Subject</div>
                        <div className="div-col-num">Mark</div>
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
                        <label>
                            Student:
                                <select onChange={this.changeStudent}>
                                    {this.initComboBoxStudent(this.state.students)}
                                </select>
                        </label>
                    </div>

                    <div>
                        <label>
                            Subject:
                                <select onChange={this.changeSubject}>
                                    {this.initComboBoxSubject(this.state.subjects)}
                                </select>
                        </label>
                    </div>

                     <div>
                        <label>
                            Mark:
                                <input type="number" onChange={this.changeValue} value={this.state.value} placeholder="Set mark..." />
                        </label>
                        <p className="errorMess">{this.state.valueMess}</p>
                     </div><hr />
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

ReactDOM.render(<MarkData />, document.getElementById("content"));