import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DataTableProps<T> {
  data: T[];
  columns: {
    header: string;
    accessor: keyof T | ((item: T) => ReactNode);
    className?: string;
  }[];
  onRowClick?: (item: T) => void;
  className?: string;
  loading?: boolean;
}

export function DataTable<T extends { _id?: string; id?: string }>({ 
  data, 
  columns, 
  onRowClick,
  className,
  loading
}: DataTableProps<T>) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-ink/5 bg-white", className)}>
      <table className="w-full text-left text-sm text-ink/70">
        <thead className="bg-paper-soft text-[10px] tracking-widest uppercase text-ink/40">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className={cn("px-6 py-4 font-semibold", col.className)}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-ink/5">
          {loading ? (
             <tr>
                <td colSpan={columns.length} className="px-6 py-20 text-center text-ink/20 animate-pulse">
                  Loading data...
                </td>
              </tr>
          ) : data.length > 0 ? (
            data.map((item, rowIdx) => (
              <tr 
                key={item._id || item.id || rowIdx}
                onClick={() => onRowClick?.(item)}
                className={cn(
                  "group transition-colors hover:bg-paper-soft/50",
                  onRowClick && "cursor-pointer"
                )}
              >
                {columns.map((col, colIdx) => (
                  <td key={colIdx} className={cn("px-6 py-4", col.className)}>
                    {typeof col.accessor === "function" 
                      ? col.accessor(item) 
                      : (item[col.accessor] as ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-6 py-20 text-center text-ink/20">
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
