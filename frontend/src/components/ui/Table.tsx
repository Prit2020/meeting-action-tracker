import type { ReactNode } from "react";

interface TableProps {
  headers: string[];
  children: ReactNode;
}

const Table = ({ headers, children }: TableProps) => {
  return (
    <div className="overflow-x-auto border border-slate-200 rounded-md">
      <table className="w-full border-separate border-spacing-0">
        <thead>
          <tr className="bg-gradient-to-r from-slate-50 to-slate-100">
            {headers.map((header, index) => (
              <th
                key={header}
                className={`text-left px-6 py-4 font-semibold text-sm text-slate-700 border-b-2 border-slate-200 ${
                  index === 0 ? "rounded-tl-lg" : ""
                } ${index === headers.length - 1 ? "rounded-tr-lg" : ""}`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-white">
          {children}
        </tbody>
      </table>
    </div>
  );
};

export default Table;