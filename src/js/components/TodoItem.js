import React, { Component, ReactDOM } from 'react';
import '../../App.css';

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

class TodoItem extends Component {

    constructor() {
        super();
        this.state = {
            editText : ''
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.textInput = React.createRef();
    }

    componentDidUpdate(prevProps, prevState) {
        this.textInput.current.focus();
      }
    componentWillMount() {
        this.setState({editText: this.props.title});
    }

    handleEdit(){
        this.setState({editText: this.props.title});
    }
    handleInput(event) {
        this.setState({
            editText : event.target.value
        });
    }
   handleSubmit(event) {
        var val = this.state.editText.trim();
        if (val) {
            this.props.onSave(this.props.dataKey, val);
        }
    }
    handleKeyDown(event) {
        if (event.which === ESCAPE_KEY) {
            this.setState({editText: this.props.title});
            this.props.onCancel(event);
        } else if (event.which === ENTER_KEY) {
            this.handleSubmit(event);
        }
    }



    render() {
        const error = this.props.done ? 'completed' : '';
        const edit = this.props.editing ? 'edit' : '';
        const classes = `${error} ${edit} single-item`;
        return (
            <li
                className={classes}
            >   
                <div className={this.props.editing ? 'hide-item' : 'see-item'}>
                    <input 
                        type='checkbox'
                        checked = {this.props.done ? 'checked' : ''}
                        onChange = {this.props.completed}
                    />
                    <label
                        onDoubleClick ={this.props.edit}
                    >
                        {this.props.title}
                    </label>
                    <button
                        onClick={this.props.deleted}
                    >
                        x
                    </button>
                </div>
                <input 
                    ref={this.textInput}
                    type="text"
                    value={this.state.editText}
                    className={this.props.editing ? 'edit' : 'no-edit'}
                    onChange={this.handleInput}
                    onBlur={this.handleSubmit}
                    onKeyDown={this.handleKeyDown}
                />
            </li>
        );
    }

}
export default TodoItem;