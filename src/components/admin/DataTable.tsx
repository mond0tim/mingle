"use client";

import React, { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { motion } from "framer-motion";

interface DataTableProps<T> {
  columns: ColumnDef<T, any>[];
  data: T[];
  searchKey: string;
  searchPlaceholder?: string;
  onAdd?: () => void;
  addLabel?: string;
}

export function DataTable<T>({
  columns,
  data,
  searchKey,
  searchPlaceholder = "Поиск...",
  onAdd,
  addLabel = "Добавить",
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
          <Input
            placeholder={searchPlaceholder}
            value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
            onChange={(e) => table.getColumn(searchKey)?.setFilterValue(e.target.value)}
            className="pl-9 bg-zinc-900/50 border-zinc-800 focus-visible:border-zinc-600 h-9"
          />
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span className="hidden sm:inline">Показывать:</span>
            <select
              className="bg-zinc-900 border border-zinc-800 rounded-md px-2 py-1.5 text-zinc-300 text-xs outline-none cursor-pointer hover:border-zinc-600 transition-colors"
              value={String(table.getState().pagination.pageSize)}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
            >
              {[10, 25, 50, 100].map((size) => (
                <option key={size} value={String(size)}>{size}</option>
              ))}
            </select>
          </div>
          {onAdd && (
            <Button
              onClick={onAdd}
              size="sm"
              className="bg-zinc-100 text-zinc-900 font-semibold hover:bg-white transition-all h-9"
            >
              <Plus className="h-4 w-4 mr-1.5" />
              {addLabel}
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-zinc-800 overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-zinc-800 bg-zinc-900 hover:bg-zinc-900">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-zinc-400 font-bold text-[10px] uppercase tracking-widest h-11 px-4">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-zinc-800/50 hover:bg-zinc-900/50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 py-3 text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="border-zinc-800/50">
                <TableCell colSpan={columns.length} className="h-40 text-center">
                  <div className="flex flex-col items-center justify-center gap-3 text-zinc-600">
                    <Search className="h-8 w-8 opacity-30" />
                    <p className="text-sm font-medium">Записей не найдено</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-1 text-xs text-zinc-500">
        <p>
          {table.getFilteredRowModel().rows.length} записей
          {table.getPageCount() > 1 && (
            <span className="ml-1 text-zinc-600">
              · стр. {table.getState().pagination.pageIndex + 1} из {table.getPageCount()}
            </span>
          )}
        </p>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-zinc-500 hover:text-zinc-100"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-zinc-500 hover:text-zinc-100"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-zinc-500 hover:text-zinc-100"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-zinc-500 hover:text-zinc-100"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
