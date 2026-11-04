import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      <Link
        href={`/products?page=${currentPage - 1}`}
        aria-disabled={currentPage <= 1}
        className={`rounded border px-4 py-2 ${
          currentPage <= 1 ? "pointer-events-none opacity-40" : ""
        }`}
      >
        Previous
      </Link>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <Link
        href={`/products?page=${currentPage + 1}`}
        aria-disabled={currentPage >= totalPages}
        className={`rounded border px-4 py-2 ${
          currentPage >= totalPages ? "pointer-events-none opacity-40" : ""
        }`}
      >
        Next
      </Link>
    </div>
  );
}

// "use client";

// import { useRouter, useSearchParams } from "next/navigation";

// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
// }

// export default function Pagination({
//   currentPage,
//   totalPages,
// }: PaginationProps) {
//   const router = useRouter();
//   //useRouter lets you change the URL without manually
//   // reloading the browser.
//   const searchParams = useSearchParams();

//   const handlePageChange = (page: number) => {
//     // Copy existing query parameters.
//     const params = new URLSearchParams(searchParams.toString());

//     // Update the page parameter.
//     params.set("page", String(page));

//     // Navigate to the updated URL.
//     router.push(`/products?${params.toString()}`);
//   };

//   return (
//     <div className="mt-8 flex items-center justify-center gap-4">
//       <button
//         disabled={currentPage <= 1}
//         onClick={() => handlePageChange(currentPage - 1)}
//         className="rounded border px-4 py-2 disabled:opacity-40"
//       >
//         Previous
//       </button>

//       <span>
//         Page {currentPage} of {totalPages}
//       </span>

//       <button
//         disabled={currentPage >= totalPages}
//         onClick={() => handlePageChange(currentPage + 1)}
//         className="rounded border px-4 py-2 disabled:opacity-40"
//       >
//         Next
//       </button>
//     </div>
//   );
// }
