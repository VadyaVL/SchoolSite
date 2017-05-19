class MarkData extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            count: 0,
            students: [],
            subjects: [],
            student: '',
            subject: '',
            value: '',
            valueMess: '',
            popupClassName: 'invisible-pop-up',
            popupParentClassName: ''
        };

        ajax.makeAjax('/Student/JSON_ALL_Student', {},
                        function (data) {
                            self.setState({
                                students: JSON.parse(data).Items,
                                student: JSON.parse(data).Items ? JSON.parse(data).Items[0].Id : '',
                            });
                        });

        ajax.makeAjax('/Subject/JSON_ALL_Subject', {},
                        function (data) {
                            self.setState({
                                subjects: JSON.parse(data).Items,
                                subject: JSON.parse(data).Items ? JSON.parse(data).Items[0].Id : '',
                            });
                        });

        this.saveData = this.saveData.bind(this);
        this.removeData = this.removeData.bind(this);

        this.initRows = this.initRows.bind(this);
        this.initComboBoxStudent = this.initComboBoxStudent.bind(this);
        this.initComboBoxSubject = this.initComboBoxSubject.bind(this);

        this.changePopUpState = this.changePopUpState.bind(this);
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

        if (self.state.value == '') {
            self.setState({
                valueMess: 'Mark is Empty!'
            });
            return;
        }
        else if (self.state.value <= 0 || self.state.value > 5) {
            self.setState({
                valueMess: 'Mark must be [1; 5]!'
            });
            return;
        }

        ajax.makeAjax('/Mark/PostMark',
                        {
                            Id: self.state.edit ? self.state.edit.Id : 0,
                            StudentId: self.state.student,
                            SubjectId: self.state.subject,
                            Value: self.state.value,
                        },
                        function () {
                            if (self.state.count % 10 != 0 || self.state.count == 0) {
                                self.setState({
                                    count: self.state.count + 1
                                });
                            }
                            self.updateDataOnPage();
                            self.changePopUpState();
                        });
    }

    updateDataOnPage(toLoad) {
        self = this;
        ajax.makeAjax('/Mark/JSON_Mark',
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
        ajax.makeAjax('/Mark/RemoveMark',
                        {
                            id: mark.Id
                        },
                        function () {
                            self.updateDataOnPage();
                        });
    }

    changePopUpState(mark) {
        self = this;
        this.setState({
            edit: mark,
            value: mark ? mark.Value : '',
            student: mark ? mark.Student.Id : (self.state.students ? self.state.students[0].Id : ''),
            subject: mark ? mark.Subject.Id : (self.state.subjects ? self.state.subjects[0].Id : '')
        });

        if (this.state.popupClassName === 'invisible-pop-up') {
            this.setState({
                popupClassName: 'visible-pop-up',
                popupParentClassName: 'background-pop-up'
            });
        }
        else {
            this.setState({
                popupClassName: 'invisible-pop-up',
                popupParentClassName: ''
            });
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

    initRows(marks) {
        return marks.map((mark) =>
            <div className='div-row' key={mark.Id}>
                <div className='div-col-num'>{mark.Id}</div>
                <div className='div-col'>{mark.Student.LastName + ' ' + mark.Student.FirstName}</div>
                <div className='div-col'>{mark.Subject.Title}</div>
                <div className='div-col-num'>{mark.Value}</div>
                <div className='div-col-btn'><button className='btn-edit' onClick={() => this.changePopUpState(mark)}>Edit</button></div>
                <div className='div-col-btn'><button className='btn-remove' onClick={() => this.removeData(mark)}>Remove</button></div>
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
            <option key={student.Id} value={student.Id }>{student.FirstName + ' ' + student.LastName}</option>
        );
    }

    render() {
        return (
        <div className='contentFromReact'>
            <div>
                <button className='btn-add' onClick={() => this.changePopUpState()}>Add Mark</button>
            </div>

            <div className='div-table'>
                <div className='div-row-head'>
                    <div className='div-col-num'>ID</div>
                    <div className='div-col'>Student</div>
                    <div className='div-col'>Subject</div>
                    <div className='div-col-num'>Mark</div>
                    <div className='div-col-btn'></div>
                    <div className='div-col-btn'></div>
                </div>
                {this.initRows(this.state.data)}
            </div>

            <div>
                <button className='btn-add' onClick={() => this.updateDataOnPage(true)}>See more</button>
            </div>

            <div className={this.state.popupParentClassName}>
                <div className={this.state.popupClassName}>
                    <form className='input-form'>
                        <div>
                            <label>
                                Student:
                                <select value={this.state.student} onChange={this.changeStudent}>
                                    {this.initComboBoxStudent(this.state.students)}
                                </select>
                            </label>
                        </div>

                        <div>
                            <label>
                                Subject:
                                <select value={this.state.subject} onChange={this.changeSubject}>
                                    {this.initComboBoxSubject(this.state.subjects)}
                                </select>
                            </label>
                        </div>

                        <div>
                            <label>
                                Mark:
                                <input type='number' onChange={this.changeValue} value={this.state.value} placeholder='Set mark...' />
                            </label>
                            <p className='errorMess'>{this.state.valueMess}</p>
                        </div><hr />

                        <div>
                            <button type='button' className='btn-save' onClick={() => this.saveData()}>Save</button>
                            <button type='button' className='btn-cancel' onClick={() => this.changePopUpState()}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        );
    }
}

ReactDOM.render(<MarkData />, document.getElementById('content'));