import ReactPaginate from "react-paginate";
import type { Pagination } from "../types/types";

export default function PaginatedItems(props: Pagination) {
  // For Calculate Total Pages
  const pageCount =
    props.total && props.itemsPerPage
      ? Math.ceil(props.total / props.itemsPerPage)
      : 0;

  // For Scroll To Top Page + 500
  function topPage() {
    window.scrollTo({
      top: 500,
      behavior: "smooth",
    });
  }

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => {
          topPage();
          props.setPage(e.selected + 1);
        }}
        pageRangeDisplayed={2} // After Selected How Many Pages Will Display
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null} //Beacuse If Page Count = 0 Display None
        containerClassName="custom-pagination"
        forcePage={props.page - 1}
      />
    </>
  );
}
