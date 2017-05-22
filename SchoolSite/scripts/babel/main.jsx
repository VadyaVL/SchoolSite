class PopUPLoader extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className={this.props.state}>
                    <div className="loader">
                    </div>
            </div>
        );
    }
}

class PopUP extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className={this.props.state}>
                 <div className="pop-up-form">
                    {this.props.children}
                 </div>
            </div>
        );
    }
}