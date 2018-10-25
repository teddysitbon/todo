import React, { Component } from 'react';
import '../../App.css';

class FooterFilers extends Component {

    renderButtonClear(){
        if(this.props.clear)
        {
            return(
                <button
                    onClick={this.props.deleteCompleteItems}
                >
                Clear Completed
                </button>
            )
        }
    }

    render() {
        var currentFilter = this.props.activeFilter;
        var filters = (
            <ul className='nb-filters'>
                <li 
                    className={currentFilter === "all" ? 'active' : ''}
                    onClick={()=>this.props.filterItems("all")}
                >
                    All
                </li>
                <li
                    className={currentFilter === "active" ? 'active' : ''}
                    onClick={()=>this.props.filterItems("active")}
                >
                    Active
                </li>
                <li
                    className={currentFilter === "completed" ? 'active' : ''}
                    onClick={()=>this.props.filterItems("completed")}
                >
                    Completed
                </li>
            </ul>
        )
        return (
        <footer className="footer-filters">
            <div className='nb-items'>{this.props.nbItems} item{this.props.nbItems > 1 ? 's' : ''}</div>
            {filters}
            {this.renderButtonClear()}
        </footer>
        );
    }

}
export default FooterFilers;
