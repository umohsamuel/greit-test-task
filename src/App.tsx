import { useEffect, useState } from "react";
import CardGrid from "./components/card/grid.card";
import { PropertyListing } from "./types";
import { Paginator } from "./components/pagination";
import { SkeletonCard } from "./components/loaders";
import { fetchCardData } from "./api/fetchCardData";

function App() {
  const [projects, setProjects] = useState<PropertyListing[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchCardData({ pageSize, currentPage });

        setProjects(data.projects);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error(err);
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (pageIndex: number) => {
    if (pageIndex >= 0 && pageIndex < totalPages) {
      setCurrentPage(pageIndex);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <p className="text-center">
        Hi, this is Umoh Samuel submittion of the test task
      </p>
      <h1 className="text-3xl mt-4 font-bold text-center mb-4">Cards</h1>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: pageSize }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      )}
      {error && (
        <p className="text-center text-red-500">
          Error occured while fetching card data: {error}
        </p>
      )}

      {!loading && !error && (
        <>
          <CardGrid projects={projects} />

          <Paginator
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}

export default App;
