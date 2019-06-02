import React from 'react';
import { TaskSort, SortField, SortDirection } from '../../store/task/types';

interface FilterProps {
    filterName: SortField;
    onChange: (sort: TaskSort) => void;
}

interface FilterState {
    filterDirection: SortDirection;
}

class Filter extends React.Component<FilterProps, FilterState> {
    constructor(props: FilterProps) {
        super(props);
        this.state = {
            filterDirection: 'asc'
        }
    }
    
    onClick = () => {
        this.setState({
            filterDirection: this.state.filterDirection === 'asc' ? 'desc' : 'asc'
        })
        this.props.onChange({
            sortField: this.props.filterName,
            sortDirection: this.state.filterDirection
        })
    }
    render() {
        const { filterName } = this.props;
        return (
            <button onClick={this.onClick}>
                {filterName} {this.state.filterDirection}
            </button>
        )
    }
}

export default Filter;
