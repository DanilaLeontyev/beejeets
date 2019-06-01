import React from 'react';

interface PaginationProps {
    totalElement: number;
    changePage: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = (props: PaginationProps) => {
    const { totalElement, changePage } = props;
    let pagination = [];
    for (let i = 1; i <= Math.ceil(totalElement / 3); i++) {
        pagination.push(<button key={i} onClick={() => changePage(i)}>{i}</button>)
    }
    return (
        <div className="Pagination">
            {pagination}
        </div>
    )
}

export default Pagination;
