class StudentData extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],   // Дані
            count: 0,   // Наявна кількість
            schools: [],
            firstName: '',
            lastName: '',
            age: '',
            firstNameMess: '',
            lastNameMess: '',
            ageMess: '',
            schoolId: '',
            popupClassName: 'invisible-pop-up', // назва попапу - покищо....
            popupParentClassName: '' // назва батька попапу - покищо....
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

        this.changePopUpState = this.changePopUpState.bind(this);
        this.updateDataOnPage = this.updateDataOnPage.bind(this);
        this.changeFirstName = this.changeFirstName.bind(this);
        this.changeLastName = this.changeLastName.bind(this);
        this.changeAge = this.changeAge.bind(this);
        this.changeSchool = this.changeSchool.bind(this);
        this.changeSubjects = this.changeSubjects.bind(this);
        this.setLoadAnim = this.setLoadAnim.bind(this);

        this.updateDataOnPage(feed.DEFAULT_TAKE);
    }

    setLoadAnim(enable) {
        this.setState({ loadPopUPClass: enable ? 'background-pop-up' : 'background-pop-up-off' });
    }

    saveData() {
        self = this;

        self.setState({
            firstNameMess: '',
            lastNameMess: '',
            ageMess: ''
        });

        var isOk = !(self.state.firstName === '' || self.state.lastName === '' || self.state.age === '');

        if (!isOk) {

            if (self.state.firstName === '') {
                self.setState({
                    firstNameMess: 'First Name is Empty!'
                });
            }

            if (self.state.lastName === '') {
                self.setState({
                    lastNameMess: 'Last Name is Empty!'
                });
            }

            if (self.state.age === '') {
                self.setState({
                    ageMess: 'Age is Empty!'
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
                            self.setLoadAnim(false);
                        },
                        function () {
                            self.setLoadAnim(false);
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
                            self.updateDataOnPage(feed.DEFAULT_REMOVE);
                        });
    }

    changePopUpState(student) {
        self = this;

        this.setState({
            firstName: student ? student.FirstName : '',
            lastName: student ? student.LastName : '',
            age: student ? student.Age : '',
            schoolId: student ? student.School.Id : (self.state.schools ? self.state.schools[0].Id : ''),
            edit: student
        });


        if (this.state.popupClassName === 'invisible-pop-up') {
            this.setState({ popupClassName: 'visible-pop-up', popupParentClassName: 'background-pop-up' });
        }
        else {
            this.setState({ popupClassName: 'invisible-pop-up', popupParentClassName: '' });
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

    initComboBox() {
        return this.state.schools.map((school) =>
            <option key={school.Id} value={school.Id}>{school.Name}</option>
        );
    }

    render() {
        return (
            <div className='contentFromReact'>
                <PopUP state={this.state.loadPopUPClass} />
                <div>
                    <button className='btn-add' onClick={() => this.changePopUpState()}>Add Student</button>
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
                   {this.state.data.map((student) => <TableItem key={student.Id} student={student} edit={self.changePopUpState} remove={self.removeData}  />)}
               </div>
        <div>
            <button className='btn-add' onClick={() => this.updateDataOnPage(feed.DEFAULT_TAKE)}>See more</button>
        </div>

        <div className={this.state.popupParentClassName}>
         <div className={this.state.popupClassName}>
                 <form className='input-form'>
                         <div>
                             <div>
                                <label>
                                    First name:
                                    <input type='text' onChange={this.changeFirstName} value={this.state.firstName} placeholder='First name...' />
                                </label>
                                 <p className='error-mess'>{this.state.firstNameMess}</p>
                             </div>
                             <div>
                                <label>
                                    Last name:
                                    <input type='text' onChange={this.changeLastName} value={this.state.lastName} placeholder='Last name...' />
                                </label>
                                 <p className='error-mess'>{this.state.lastNameMess}</p>
                             </div>
                             <div>
                                <label>
                                    Age:
                                    <input type='number' onChange={this.changeAge} value={this.state.age} placeholder='Age...' />
                                </label>
                                 <p className='error-mess'>{this.state.ageMess}</p>
                             </div>
                             <div>
                                <label>
                                    School:
                                     <select value={this.state.schoolId} onChange={this.changeSchool} >
                                         {this.initComboBox()}
                                     </select>
                                </label>
                             </div>
                         </div>
                    <hr />
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