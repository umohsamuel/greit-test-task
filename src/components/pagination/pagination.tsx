export function Paginator({
  totalPages,
  currentPage,
  handlePageChange,
}: {
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}) {
  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="px-4 py-2 bg-white font-normal text-base text-black rounded disabled:opacity-50"
      >
        Prev
      </button>
      <span className="text-base font-medium">
        Page {currentPage + 1} of {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className="px-4 py-2 bg-white font-normal text-base text-black rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
