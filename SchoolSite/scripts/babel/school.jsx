class SchoolData extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],   count: 0,
            name: '',   nameMess: '',
            loadPopUPClass: 'background-pop-up-off',
            inputPopUPClass: 'background-pop-up-off'
        };

        this.saveData = this.saveData.bind(this);
        this.removeData = this.removeData.bind(this);

        this.updatePageData = this.updatePageData.bind(this);
        this.setPopUPForm = this.setPopUPForm.bind(this);
        this.setPopUPAnim = this.setPopUPAnim.bind(this);

        this.changeInputName = this.changeInputName.bind(this);

        this.updatePageData(feed.DEFAULT_TAKE);
    }

    saveData() {
        self = this;
        self.setState({  nameMess: '' });

        if (self.state.name === '') {
            self.setState({ nameMess: 'Name is Empty!' });
            return;
        }

        ajax.callAjax('/School/PostSchool',
                        {
                            Id: self.state.edit ? self.state.edit.Id : 0,
                            Name: self.state.name
                        },
                        function () {
                            if (self.state.edit) {
                                self.state.edit.Name = self.state.name;
                            }

                            self.updatePageData(1);
                            self.setPopUPForm();
                        });
    }

    updatePageData(take) {
        self = this;
        this.setPopUPAnim(true);
        
        var skip = (take >= 0 ? this.state.count : this.state.count + take);

        if (skip != 0 && skip % feed.DEFAULT_TAKE == 0 &&
            take != feed.DEFAULT_TAKE && take != feed.DEFAULT_REMOVE) {
            self.setPopUPAnim(false);
            return;
        }

        if (take == feed.DEFAULT_REMOVE) {
            take = feed.DEFAULT_TAKE - skip % feed.DEFAULT_TAKE;
        }

        ajax.callAjax('/School/GetSchool',
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

    setPopUPAnim(enable) {
        this.setState({ loadPopUPClass: enable ? 'background-pop-up' : 'background-pop-up-off' });
    }

    removeData(school) {
        self = this;
        ajax.callAjax('/School/RemoveSchool',
                        {
                            id: school.Id
                        },
                        function () {
                            var position = self.state.data.indexOf(school);
                            self.state.data.splice(position, 1);
                            self.updatePageData(feed.DEFAULT_REMOVE);
                        });
    }

    setPopUPForm(school) {
        this.setState({ name: school ? school.Name : '', edit: school });

        if (this.state.inputPopUPClass === 'background-pop-up-off') {
            this.setState({ inputPopUPClass: 'background-pop-up' });
        }
        else {
            this.setState({ inputPopUPClass: 'background-pop-up-off' });
        }
    }

    changeInputName(event) {
        this.setState({ name: event.target.value });
    }

    render() {
        self = this;
       
        return (
            <div className='contentFromReact'>
                <PopUPLoader state={this.state.loadPopUPClass} />

                <div>
                    <button className='btn-add' onClick={() => this.setPopUPForm()}>Add School</button>
                </div>

                <div className='div-table'>
                    <div className='div-row-head'>
                        <div className='div-col-num'>ID</div>
                        <div className='div-col'>Name</div>
                        <div className='div-col-btn'></div>
                        <div className='div-col-btn'></div>
                    </div>
                {   this.state.data.map((school) => <TableItem key={school.Id} school={school} edit={self.setPopUPForm} remove={self.removeData} />)}
                </div>

                <div>
                    <button className='btn-more' onClick={() => this.updatePageData(feed.DEFAULT_TAKE)}>See more</button>
                </div>
                
                <PopUP state={this.state.inputPopUPClass}>
                    <form className='input-form'>
                        <div>
                            <label>
                                Name:
                                <input type='text' onChange={this.changeInputName} value={this.state.name} placeholder='Enter the school name...' />
                            </label>
                            <p className='error-mess'>{this.state.nameMess}</p>
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
        var school = this.props.school;
        var edit = this.props.edit;
        var remove = this.props.remove;
        return (
            <div className='div-row'>
                <div className='div-col-num'>{school.Id}</div>
                <div className='div-col'>{school.Name}</div>
                <div className='div-col-btn'><button className='btn-edit' onClick={() => edit(school)}>Edit</button></div>
                <div className='div-col-btn'><button className='btn-remove' onClick={() => remove(school)}>Remove</button></div>
            </div>
        );
    }
}

ReactDOM.render(<SchoolData />, document.getElementById('content'));