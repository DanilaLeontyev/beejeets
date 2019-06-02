import React from 'react';

interface PaginationProps {
    totalElement: number;
    changePage: (pageNumber: number) => void;
    currentPage: number;
}

const Pagination: React.FC<PaginationProps> = (props: PaginationProps) => {
    const { totalElement, changePage, currentPage } = props;
    let pagination = [];

    for (let i = 1; i <= Math.ceil(totalElement / 3); i++) {
        if (i === currentPage) {
            pagination.push(<button key={i} style={{ backgroundColor: 'red' }} onClick={() => changePage(i)}>{i}</button>)
        } else pagination.push(<button key={i} onClick={() => changePage(i)}>{i}</button>)
    }

    return (
        <div className="Pagination">
            {pagination}
        </div>
    )
}

export default Pagination;
