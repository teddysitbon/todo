import React, { Component } from 'react';
import TodoItem from './TodoItem';
import FooterFilters from './FooterFilters';
import {saveItem, itemExist, getItems, deleteItem, doneItem, editTextItem} from '../../Services.js';

const ENTER_KEY = 13;

class TodoApp extends Component {

    constructor() {
        super();
        this.state = {
            currentValueToDo: "",
            items : null,
            currentFilter : "all",
            editing : null
        };
        this.handleInput = this.handleInput.bind(this);
        this.validateToDoItem = this.validateToDoItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.doneItem = this.doneItem.bind(this);
        this.deleteCompleteItems = this.deleteCompleteItems.bind(this);
        this.filterItems = this.filterItems.bind(this);
        this.editItemInput = this.editItemInput.bind(this);
        this.editTextItem = this.editTextItem.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentWillMount() {
        if(itemExist())
        {
            this.setState({
                items : getItems()
            });
        }
    }
    handleInput(event) {
        this.setState({
            currentValueToDo : event.target.value
        });
    }
    validateToDoItem(event) {
        if (event.charCode === ENTER_KEY) {
            saveItem(event.target.value);
            this.setState({
                currentValueToDo: "",
                items : getItems()
            });
        }
    }
    deleteItem(id){
        deleteItem(id);
        this.setState({
            items : getItems()
        });
    }
    doneItem(id){
        doneItem(id);
        this.setState({
            items : getItems()
        });        
    }
    deleteCompleteItems(){
        var itemsTodo = this.state.items;
        itemsTodo.forEach(function(element) {
            if(element.done){
                deleteItem(element.id); 
            }
        });
        this.setState({
            items : getItems()
        }); 
    }
    filterItems(filter){
        this.setState({
            currentFilter : filter
        }); 
    }
    editItemInput(id){
        this.setState({editing : id})
    }
    cancel(){
        this.setState({editing : null})
    }
    editTextItem(id, value) {
        editTextItem(id, value);
        this.setState({
            items : getItems(),
            editing : null
        });
    }
    

    
    render() {
        var footerToShow = false;
        var itemToShow = false;
        var buttonClearCompletedToShow = false;
        var itemsTodo = this.state.items;
        var activeFilter = this.state.currentFilter;
        if(itemsTodo != null && itemsTodo.length > 0)
        {
            footerToShow = true;
            itemToShow = true;
            var todoList = {};

			var shownTodos = itemsTodo.filter(function (todo) {
				switch (activeFilter) {
				case 'active':
					return !todo.done;
				case 'completed':
					return todo.done;
				default:
					return true;
				}
            }, this);
            
            var todoList = shownTodos.map(function (todo) {
                return (
                    <TodoItem
                        title = {todo.title}
                        key = {todo.id}
                        done = {todo.done}
                        deleted = {(e) => this.deleteItem(todo.id)}
                        completed = {(e) => this.doneItem(todo.id)}
                        edit = {(e) => this.editItemInput(todo.id)}
                        editing = {this.state.editing === todo.id}
                        dataKey = {todo.id}
                        onCancel = {this.cancel}
                        onSave={this.editTextItem}
                    />
                );
            }, this);

            var sectionItems = (
                <ul>{todoList}</ul>
            );
            var nbItems = itemsTodo.length;
            var objIndex = itemsTodo.findIndex((obj => obj.done === true));
            if(objIndex !== -1)
            {
                buttonClearCompletedToShow = true;
            }
        }
        
        return (
            <section className="todo-form">
                <input
                    type="text"
                    placeholder="What needs to be done?"
                    value={this.state.currentValueToDo}
                    onChange={this.handleInput}
                    onKeyPress={this.validateToDoItem}
                />
                {itemToShow && 
                    sectionItems
                }
                {footerToShow && 
                    <FooterFilters 
                        nbItems={nbItems}
                        clear={buttonClearCompletedToShow}
                        deleteCompleteItems={this.deleteCompleteItems}
                        activeFilter={this.state.currentFilter}
                        filterItems={this.filterItems}
                    />
                }
            </section>
        );
    }

}
export default TodoApp;
