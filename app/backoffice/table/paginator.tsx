// this is where you'd implement some pagination logic like whether a next page is available, which can then be imported to the DataTable

import { generatePaginationLinks } from "./generate-pages";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
} from "./pagination";

type PaginatorProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  showPreviousNext: boolean;
  disabled?: boolean;
};

export default function Paginator({
  currentPage,
  totalPages,
  onPageChange,
  showPreviousNext,
  disabled: isDisabled = false
}: PaginatorProps) {

  totalPages = Math.ceil(totalPages)
	currentPage = Math.floor(currentPage)

  return (
    <Pagination>
      <PaginationContent>
        {showPreviousNext && totalPages ? (
          // <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage - 1 < 1}
            />
          // </PaginationItem>
        ) : null}
        {generatePaginationLinks(currentPage, totalPages, onPageChange)}
        {showPreviousNext && totalPages ? (
          // <PaginationItem>
            <PaginationNext
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage > totalPages - 1}
            />
          // </PaginationItem>
        ): null}
      </PaginationContent>
    </Pagination>
  )
};
