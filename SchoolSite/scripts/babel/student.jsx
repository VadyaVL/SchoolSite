class StudentData extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],   count: 0,
            schools: [],
            firstName: '', errorFirstName: '', firstNameMess: 'First Name is Empty!',
            lastName: '', errorLastName: '', lastNameMess: 'Last Name is Empty!',
            age: '', errorAge: '', ageMess: 'Age is Empty!',
            schoolId: '',
            loadPopUPClass: 'background-pop-up-off',
            inputPopUPClass: 'background-pop-up-off'
        };

        ajax.callAjax('/School/GetSchoolOptions',
                        {},
                        function (data) {
                            self.setState({
                                schools: JSON.parse(data).Items,
                                schoolId: JSON.parse(data).Items ? JSON.parse(data).Items[0].Id : ''
                            });
                        });

        this.saveData = this.saveData.bind(this);
        this.removeData = this.removeData.bind(this);

        this.initComboBox = this.initComboBox.bind(this);

        this.updatePageData = this.updatePageData.bind(this);
        this.setPopUPForm = this.setPopUPForm.bind(this);
        this.setPopUPAnim = this.setPopUPAnim.bind(this);

        this.changeFirstName = this.changeFirstName.bind(this);
        this.changeLastName = this.changeLastName.bind(this);
        this.changeAge = this.changeAge.bind(this);
        this.changeSchool = this.changeSchool.bind(this);
        this.changeSubjects = this.changeSubjects.bind(this);

        this.updatePageData(feed.DEFAULT_TAKE);
    }

    setPopUPAnim(enable) {
        this.setState({ loadPopUPClass: enable ? 'background-pop-up' : 'background-pop-up-off' });
    }

    saveData() {
        self = this;
        
        var isOk = !(self.state.firstName === '' || self.state.lastName === '' || self.state.age === '');

        if (!isOk) {

            if (self.state.firstName === '') {
                self.setState({
                    errorFirstName: 'tooltip'
                });
            }

            if (self.state.lastName === '') {
                self.setState({
                    errorLastName: 'tooltip'
                });
            }

            if (self.state.age === '') {
                self.setState({
                    errorAge: 'tooltip'
                });
            }

            return;
        }

        ajax.callAjax('/Student/PostStudent',
                        {
                            Id: self.state.edit ? self.state.edit.Id : 0,
                            FirstName: self.state.firstName,
                            LastName: self.state.lastName,
                            Age: self.state.age,
                            SchoolId: self.state.schoolId
                        },
                        function () {
                            if (self.state.edit) {
                                self.state.edit.FirstName = self.state.firstName;
                                self.state.edit.LastName = self.state.lastName;
                                self.state.edit.Age = self.state.age;

                                var len = self.state.schools.length;

                                for (var i = 0; i < len; i++) {
                                    if (self.state.schools[i].Id == self.state.schoolId) {
                                        self.state.edit.School = self.state.schools[i];
                                        break;
                                    }
                                }

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

        ajax.callAjax('/Student/GetStudent',
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

    removeData(student) {
        self = this;
        ajax.callAjax('/Student/RemoveStudent',
                        {
                            id: student.Id
                        },
                        function () {
                            var position = self.state.data.indexOf(student);
                            self.state.data.splice(position, 1);
                            self.updatePageData(feed.DEFAULT_REMOVE);
                        });
    }

    setPopUPForm(student) {
        self = this;

        this.setState({
            firstName: student ? student.FirstName : '',
            lastName: student ? student.LastName : '',
            age: student ? student.Age : '',
            schoolId: student ? student.School.Id : (self.state.schools ? self.state.schools[0].Id : ''),
            edit: student,
            errorFirstName: '',
            errorLastName: '',
            errorAge: '',
        });


        if (this.state.inputPopUPClass === 'background-pop-up-off') {
            this.setState({ inputPopUPClass: 'background-pop-up' });
        }
        else {
            this.setState({ inputPopUPClass: 'background-pop-up-off' });
        }
    }

    changeFirstName(event) {
        this.setState({ firstName: event.target.value });

        if (event.target.value != '') {
            self.setState({ errorFirstName: '' });
        }
    }

    changeLastName(event) {
        this.setState({ lastName: event.target.value });

        if (event.target.value != '') {
            self.setState({ errorLastName: '' });
        }
    }

    changeAge(event) {
        this.setState({ age: event.target.value });

        if (event.target.value != '') {
            self.setState({ errorAge: '' });
        }
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

    initComboBox() {
        return this.state.schools.map((school) =>
            <option key={school.Id} value={school.Id}>{school.Name}</option>
        );
    }

    render() {
        return (
            <div className='contentFromReact'>
                <PopUPLoader state={this.state.loadPopUPClass} />

                <div>
                    <button className='btn-add' onClick={() => this.setPopUPForm()}>Add Student</button>
                </div>
                <div className='div-table'>
                    <div className='div-row-head'>
                        <div className='div-col-num'>ID</div>
                        <div className='div-col'>First Name</div>
                        <div className='div-col'>Last Name</div>
                        <div className='div-col-num'>Age</div>
                        <div className='div-col'>School</div>
                        <div className='div-col-btn'></div>
                        <div className='div-col-btn'></div>
                    </div>
                    {this.state.data.map((student) => <TableItem key={student.Id} student={student} edit={self.setPopUPForm} remove={self.removeData}  />)}
                </div>
                <div>
                    <button className='btn-add' onClick={() => this.updatePageData(feed.DEFAULT_TAKE)}>See more</button>
                </div>


                <PopUP state={this.state.inputPopUPClass}>
                    <form className='input-form'>
                        <div>
                            <div>
                                <label>
                                    First name:
                                    <span className={this.state.errorFirstName} data-title={this.state.firstNameMess}>
                                        <input type='text' onChange={this.changeFirstName} value={this.state.firstName} placeholder='First name...' />
                                    </span>
                                </label>
                            </div>
                            <div>
                                <label>
                                    Last name:
                                    <span className={this.state.errorLastName} data-title={this.state.lastNameMess}>
                                        <input type='text' onChange={this.changeLastName} value={this.state.lastName} placeholder='Last name...' />
                                    </span>
                                </label>
                            </div>
                            <div>
                                <label>
                                    Age:
                                    <span className={this.state.errorAge} data-title={this.state.ageMess}>
                                        <input type='number' onChange={this.changeAge} value={this.state.age} placeholder='Age...' />
                                    </span>
                                </label>
                            </div>
                            <div>
                                <label>
                                    School:
                                    <select value={this.state.schoolId} onChange={this.changeSchool}>
                                        {this.initComboBox()}
                                    </select>
                                </label>
                            </div>
                        </div>
                        <hr />
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
        var student = this.props.student;
        var edit = this.props.edit;
        var remove = this.props.remove;
        return (
            <div className='div-row'>
                <div className='div-col-num'>{student.Id}</div>
                <div className='div-col'>{student.FirstName}</div>
                <div className='div-col'>{student.LastName}</div>
                <div className='div-col-num'>{student.Age}</div>
                <div className='div-col'>{student.School.Name}</div>
                <div className='div-col-btn'><button className='btn-edit' onClick={() => edit(student)}>Edit</button></div>
                <div className='div-col-btn'><button className='btn-remove' onClick={() => remove(student)}>Remove</button></div>
            </div>
        );
    }
}

ReactDOM.render(<StudentData />, document.getElementById('content'));