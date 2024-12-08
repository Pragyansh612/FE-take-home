import React, { useState } from "react";
import Dropdown from "./components/Dropdown";
import TableComponent from "./components/TableComponent";
import Pagination from "./components/Pagination";
import useFetch from "./hooks/useFetch";
import { downloadCSV } from "./utils/downloadCSV";

const App: React.FC = () => {
  const [selectedData, setSelectedData] = useState<"posts" | "comments" | "">("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useFetch(
    selectedData === "posts"
      ? "https://jsonplaceholder.typicode.com/posts"
      : selectedData === "comments"
      ? "https://jsonplaceholder.typicode.com/comments"
      : "https://jsonplaceholder.typicode.com/posts"
  );

  const ITEMS_PER_PAGE = 10;
  const paginatedData = data?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDownload = () => downloadCSV(paginatedData, selectedData);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col py-6 sm:px-8 md:px-12 lg:px-16">
      <header className="mb-6 text-left">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">Dynamic Content Manager</h1>
      </header>

      <div className="border-b border-gray-300 mb-6"></div>

      <section className="mb-6">
        <h2 className="text-lg sm:text-xl font-medium text-gray-600 mb-3">Fetch Content</h2>
        <div className="border border-gray-300 w-full sm:w-96 p-4 rounded-lg">
          <Dropdown
            value={selectedData}
            options={["posts", "comments"]}
            onChange={(value) => setSelectedData(value as "posts" | "comments")}
          />
        </div>
      </section>

      <section className="w-full mx-auto mb-6">
        <div className="border border-gray-300 w-full p-6 rounded-lg">
          <h2 className="text-lg sm:text-xl font-bold text-gray-600 mb-4">Displaying Content</h2>
          
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="text-center text-gray-500 py-4">Loading...</div>
            ) : (
              <TableComponent
                data={paginatedData}
                columns={selectedData === "posts" ? ["ID", "Title"] : ["ID", "Name"]}
              />
            )}
          </div>

          <div className="border-t border-gray-300 pt-4 mt-4 sm:mt-6">
            <Pagination
              totalItems={data?.length ?? 0}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            className="px-6 py-2 bg-violet-500 text-white font-medium rounded-lg shadow hover:bg-violet-600 transition"
            onClick={handleDownload}
          >
            Download
          </button>
        </div>
      </section>
    </div>
  );
};

export default App;
