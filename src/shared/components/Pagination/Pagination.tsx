import React from "react";
import './Pagination.css'

interface PaginationProps {
    currentPage: number
    totalPages: number
    pageChange: Function
}

const Pagination = ({ currentPage, totalPages, pageChange }: PaginationProps) => {
    const generatePaginations = () => {
        return (
            Array.from({ length: totalPages }, (v, k) => k + 1).map((el, index) => {
                return (
                    <div onClick={() => pageChange(el)} 
                        className={`Pagination__element ${el === currentPage ? 'active' : ''}`}
                        key={index}>
                        {el}
                    </div>
                )
            })
        )
    }

    return (
        <div className="Pagination">
                {
                    currentPage && totalPages ?
                    generatePaginations() : null
                }
            </div>
    )
}

export default Pagination;