
const Pagination = () => {
    return (
        <div className="pagination">
            <button className="pagination-btn" aria-label="Previous page">
                <i className="fas fa-chevron-left"></i>
                <span>Previous</span>
            </button>
            <button className="pagination-btn" aria-label="Next page">
                <span>Next</span>
                <i className="fas fa-chevron-right"></i>
            </button>
        </div>
    );
};

export default Pagination;