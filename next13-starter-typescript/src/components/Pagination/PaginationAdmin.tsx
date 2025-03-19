import React from "react";

interface PaginationProps {
    page: number;
    totalPages: number;
    setPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, setPage }) => {
    const generatePageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5; // Số trang tối đa hiển thị

        if (totalPages <= maxPagesToShow) {
            // Hiển thị tất cả số trang nếu số trang nhỏ hơn hoặc bằng maxPagesToShow
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (page <= 3) {
                // Nếu trang hiện tại gần đầu
                pages.push(1, 2, 3, "...", totalPages);
            } else if (page >= totalPages - 2) {
                // Nếu trang hiện tại gần cuối
                pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
            } else {
                // Nếu trang hiện tại ở giữa
                pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
            }
        }

        return pages;
    };

    return (
        <div className="pagination">
            <button 
                onClick={() => setPage(page - 1)} 
                disabled={page <= 1} 
                className="pagination__button"
            >
                ←
            </button>

            {generatePageNumbers().map((p, index) => (
                <button
                    key={index}
                    className={`pagination__number ${p === page ? "active" : ""}`}
                    onClick={() => typeof p === "number" && setPage(p)}
                    disabled={p === "..."}
                >
                    {p}
                </button>
            ))}

            <button 
                onClick={() => setPage(page + 1)} 
                disabled={page >= totalPages} 
                className="pagination__button"
            >
                →
            </button>
        </div>
    );
};

export default Pagination;
