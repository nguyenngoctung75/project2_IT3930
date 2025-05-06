import React from 'react';
import './Pagination.scss';

function Pagination({ currentPage, totalPages, onPageChange }) {
    const paginate = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const renderPageNumbers = () => {
        const pages = [];
        const pageRange = 2;

        let startPage = Math.max(1, currentPage - pageRange);
        let endPage = Math.min(totalPages, currentPage + pageRange);

        if (currentPage <= pageRange + 1) {
            endPage = Math.min(2 * pageRange + 1, totalPages);
        }

        if (currentPage >= totalPages - pageRange) {
            startPage = Math.max(1, totalPages - 2 * pageRange);
        }

        if (startPage > 1) {
            pages.push(
                <button key={1} className={`page-btn ${currentPage === 1 ? 'active' : ''}`} onClick={() => paginate(1)}>
                    1
                </button>
            );
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button key={i} className={`page-btn ${currentPage === i ? 'active' : ''}`} onClick={() => paginate(i)}>
                    {i}
                </button>
            );
        }

        if (endPage < totalPages) {
            pages.push(
                <button key={totalPages} className={`page-btn ${currentPage === totalPages ? 'active' : ''}`} onClick={() => paginate(totalPages)}>
                    {totalPages}
                </button>
            );
        }

        return pages;
    };

    return (
        <div className="pagination">
            <button className="page-btn" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                &lt;
            </button>
            {renderPageNumbers()}
            <button className="page-btn" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                &gt;
            </button>

            <div className="page-selector">
                <span>Chọn trang</span>
                <input
                    type="number"
                    min="1"
                    max={totalPages}
                    value={currentPage}
                    onChange={(e) => {
                        const page = Math.min(Math.max(1, Number(e.target.value)), totalPages);
                        paginate(page);
                    }}
                    className="page-input"
                />
            </div>
        </div>
    );
}

export default Pagination;
