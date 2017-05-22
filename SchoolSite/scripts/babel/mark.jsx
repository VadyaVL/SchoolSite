class MarkData extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],       count: 0,
            students: [],   student: '',
            subjects: [],   subject: '',
            value: '', errorValue: '', valueMess: 'Mark is Empty!',
            loadPopUPClass: 'background-pop-up-off',
            inputPopUPClass: 'background-pop-up-off'
        };

        ajax.callAjax('/Student/GetStudentOptions', {},
                        function (data) {
                            self.setState({
                                students: JSON.parse(data).Items,
                                student: JSON.parse(data).Items ? JSON.parse(data).Items[0].Id : '',
                            });
                        });

        ajax.callAjax('/Subject/GetSubjectOptions', {},
                        function (data) {
                            self.setState({
                                subjects: JSON.parse(data).Items,
                                subject: JSON.parse(data).Items ? JSON.parse(data).Items[0].Id : '',
                            });
                        });

        this.saveData = this.saveData.bind(this);
        this.removeData = this.removeData.bind(this);

        this.initComboBoxStudent = this.initComboBoxStudent.bind(this);
        this.initComboBoxSubject = this.initComboBoxSubject.bind(this);

        this.updatePageData = this.updatePageData.bind(this);
        this.setPopUPForm = this.setPopUPForm.bind(this);
        this.setPopUPAnim = this.setPopUPAnim.bind(this);

        this.changeValue = this.changeValue.bind(this);
        this.changeStudent = this.changeStudent.bind(this);
        this.changeSubject = this.changeSubject.bind(this);

        this.updatePageData(feed.DEFAULT_TAKE);
    }

    setPopUPAnim(enable) {
        this.setState({ loadPopUPClass: enable ? 'background-pop-up' : 'background-pop-up-off' });
    }

    saveData() {
        self = this;

        if (self.state.value == '') {
            self.setState({ errorValue: 'tooltip', valueMess: 'Mark is Empty!' });
            return;
        }
        else if (self.state.value <= 0 || self.state.value > 5) {
            self.setState({ errorValue: 'tooltip', valueMess: 'Mark must be [1; 5]!' });
            return;
        }

        ajax.callAjax('/Mark/PostMark',
                        {
                            Id: self.state.edit ? self.state.edit.Id : 0,
                            StudentId: self.state.student,
                            SubjectId: self.state.subject,
                            Value: self.state.value,
                        },
                        function () {
                            if (self.state.edit) {
                                var len = self.state.students.length;
                                for (var i = 0; i < len; i++) {
                                    if (self.state.students[i].Id == self.state.student) {
                                        self.state.edit.Student = self.state.students[i];
                                        break;
                                    }
                                }

                                len = self.state.subjects.length;
                                for (var i = 0; i < len; i++) {
                                    if (self.state.subjects[i].Id == self.state.subject) {
                                        self.state.edit.Subject = self.state.subjects[i];
                                        break;
                                    }
                                }

                                self.state.edit.Value = self.state.value;
                            }

                            self.updatePageData(1);
                            self.setPopUPForm();
                        });
    }

    updatePageData(take) {
        this.setPopUPAnim(true);

        self = this;
        var skip = (take >= 0 ? this.state.count : this.state.count + take);

        if (skip != 0 && skip % feed.DEFAULT_TAKE == 0 &&
            take != feed.DEFAULT_TAKE && take != feed.DEFAULT_REMOVE) {
            self.setPopUPAnim(false);
            return;
        }

        if (take == feed.DEFAULT_REMOVE) {
            take = feed.DEFAULT_TAKE - skip % feed.DEFAULT_TAKE;
        }

        ajax.callAjax('/Mark/GetMark',
                        {
                            skip: skip,
                            take: take
                        },
                        function (data) {
                            var jsonObj = JSON.parse(data);
                            var t = [];
                            if (skip == 0) {
                                var t = jsonObj.Items;
                            }
                            else {
                                var t = self.state.data.concat(jsonObj.Items);
                            }

                            self.setState({
                                count: jsonObj.Count,
                                data: t
                            });
                            self.setPopUPAnim(false);
                        },
                        function () {
                            self.setPopUPAnim(false);
                        });
    }

    removeData(mark) {
        self = this;
        ajax.callAjax('/Mark/RemoveMark',
                        {
                            id: mark.Id
                        },
                        function () {
                            var position = self.state.data.indexOf(mark);
                            self.state.data.splice(position, 1);
                            self.updatePageData(feed.DEFAULT_REMOVE);
                        });
    }

    setPopUPForm(mark) {
        self = this;
        this.setState({
            edit: mark,
            value: mark ? mark.Value : '',
            student: mark ? mark.Student.Id : (self.state.students ? self.state.students[0].Id : ''),
            subject: mark ? mark.Subject.Id : (self.state.subjects ? self.state.subjects[0].Id : ''),
            errorValue: '',
        });

        if (this.state.inputPopUPClass === 'background-pop-up-off') {
            this.setState({ inputPopUPClass: 'background-pop-up' });
        }
        else {
            this.setState({ inputPopUPClass: 'background-pop-up-off' });
        }
    }

    changeValue(event) {
        this.setState({ value: event.target.value });

        if (event.target.value != "") {
            self.setState({ errorValue: '' });
        }
    }

    changeStudent(event) {
        this.setState({ student: event.target.value });
    }

    changeSubject(event) {
        this.setState({ subject: event.target.value });
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
            <PopUPLoader state={this.state.loadPopUPClass} />

            <div>
                <button className='btn-add' onClick={() => this.setPopUPForm()}>Add Mark</button>
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
                {this.state.data.map((mark) => <TableItem key={mark.Id} mark={mark} edit={self.setPopUPForm} remove={self.removeData } />)}
            </div>

            <div>
                <button className='btn-add ' onClick={() => this.updatePageData(feed.DEFAULT_TAKE)}>See more</button>
            </div>

            <PopUP state={this.state.inputPopUPClass}>
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
                                <span className={this.state.errorValue} data-title={this.state.valueMess}>
                                    <input type='number' onChange={this.changeValue} value={this.state.value} placeholder='Set mark...' />
                                </span>
                            </label>
                        </div><hr />

                        <div>
                            <button type='button' className='btn-save' onClick={() => this.saveData()}>Save</button>
                            <button type='button' className='btn-cancel' onClick={() => this.setPopUPForm()}>Cancel</button>
                        </div>
                    </form>
            </PopUP>
        </div>
        );
    }
}

class TableItem extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        var mark = this.props.mark;
        var edit = this.props.edit;
        var remove = this.props.remove;
        return (
            <div className='div-row'>
                <div className='div-col-num'>{mark.Id}</div>
                <div className='div-col'>{mark.Student.LastName + ' ' + mark.Student.FirstName}</div>
                <div className='div-col'>{mark.Subject.Title}</div>
                <div className='div-col-num'>{mark.Value}</div>
                <div className='div-col-btn'><button className='btn-edit' onClick={() => edit(mark)}>Edit</button></div>
                <div className='div-col-btn'><button className='btn-remove' onClick={() => remove(mark)}>Remove</button></div>
            </div>
        );
    }
}

ReactDOM.render(<MarkData />, document.getElementById('content'));