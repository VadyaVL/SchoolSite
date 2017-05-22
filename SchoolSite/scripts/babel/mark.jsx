class MarkData extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],   // Дані
            count: 0,   // Наявна кількість
            students: [],
            subjects: [],
            student: '',
            subject: '',
            value: '',
            valueMess: '',
            popupClassName: 'invisible-pop-up',
            popupParentClassName: ''
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

        this.initRows = this.initRows.bind(this);
        this.initComboBoxStudent = this.initComboBoxStudent.bind(this);
        this.initComboBoxSubject = this.initComboBoxSubject.bind(this);

        this.changePopUpState = this.changePopUpState.bind(this);
        this.updateDataOnPage = this.updateDataOnPage.bind(this);
        this.setLoadAnim = this.setLoadAnim.bind(this);

        this.changeValue = this.changeValue.bind(this);
        this.changeStudent = this.changeStudent.bind(this);
        this.changeSubject = this.changeSubject.bind(this);

        this.updateDataOnPage(feed.DEFAULT_TAKE);
    }

    setLoadAnim(enable) {
        this.setState({ loadPopUPClass: enable ? 'background-pop-up' : 'background-pop-up-off' });
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

                            self.updateDataOnPage(1);
                            self.changePopUpState();
                        });
    }

    updateDataOnPage(take) {

        self = this;
        this.setLoadAnim(true);
        var skip = (take >= 0 ? this.state.count : this.state.count + take);

        if (skip != 0 && skip % feed.DEFAULT_TAKE == 0 &&
            take != feed.DEFAULT_TAKE && take != feed.DEFAULT_REMOVE) {
            self.setLoadAnim(false);
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
                            self.setLoadAnim(false);
                        },
                        function () {
                            self.setLoadAnim(false);
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
                            self.updateDataOnPage(feed.DEFAULT_REMOVE);
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
            <div className='div-row'>
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
            <PopUP state={this.state.loadPopUPClass} />
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
                {this.state.data.map((mark) => <TableItem key={mark.Id} mark={mark} edit={self.changePopUpState} remove={self.removeData} />)}
            </div>

            <div>
                <button className='btn-add ' onClick={() => this.updateDataOnPage(feed.DEFAULT_TAKE)}>See more</button>
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
                            <p className='error-mess'>{this.state.valueMess}</p>
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