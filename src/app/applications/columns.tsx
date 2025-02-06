"use client"

import { Application, Program } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

type ApplicationColumn = {
    id: string;
    userId: string;
    programId: string;
    status: string | undefined;
    createdAt: Date;
    updatedAt: Date;
    program: {
        id: string;
        code: string;
        name: string;
        duration: number;
        department: string;
    };
};

export const ApplicationColumns: ColumnDef<ApplicationColumn>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "program.name",
        header: "Program",
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
    },
    {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ row }) => {
            return new Date(row.original.createdAt).toLocaleDateString()
        },
    },
]