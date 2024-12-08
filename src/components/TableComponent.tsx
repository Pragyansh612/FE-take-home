import React from "react";

interface TableComponentProps {
  data: any[];
  columns: string[];
}

const TableComponent: React.FC<TableComponentProps> = ({ data, columns }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full text-left border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className={`px-6 py-3 border border-gray-300 font-medium ${
                  col.toLowerCase() === "id" ? "w-2/6 text-center" : "w-auto"
                }`}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td
                  key={col}
                  className={`px-6 py-2 border border-gray-300 ${
                    col.toLowerCase() === "id" ? "text-center" : ""
                  }`}
                >
                  {row[col.toLowerCase()]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
