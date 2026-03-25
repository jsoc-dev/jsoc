import type { GridRow } from "@jsoc/grid-core";
import { GridClose, StoreContextProvider, useStore } from "@jsoc/react-grid";
import {
  flexRender,
  getCoreRowModel,
  type Table,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

export default function App() {
  const [users, setUsers] = useState([]);
  const storeContext = useStore(users, "tanstack");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const { config } = storeContext.gridStore.getActiveSchema();

  const table = useReactTable({
    ...config,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <StoreContextProvider value={storeContext}>
      <GridClose>Back</GridClose>
      <SimpleTable table={table} />
    </StoreContextProvider>
  );
}

/**
 * @see {@link https://tanstack.com/table/latest | Tanstack Table}
 */
export function SimpleTable({ table }: { table: Table<GridRow> }) {
  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((hg) => (
          <tr key={hg.id}>
            {hg.headers.map((header) => (
              <th key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
