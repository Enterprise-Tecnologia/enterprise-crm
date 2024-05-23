'use client';

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react";
import DropDownMenuLead from "./_dropdown-menu-lead";
import { Badge } from "@/components/ui/badge";
import { cpfCnpjFormatter } from "@/lib/cpf-cnpj-formatter";
import { dateTimeFormatter } from "@/lib/date-time-formatter";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export interface ICotacao {
  uid: string;
  document: string;
  personType: string;
  name: string;
  birthDate: Date;
  email: string;
  cellPhone: string;
  addressZipcode: string;
  status: string;
  created: Date;
  product: IProduto;
  proposal: IProposal[];
};

interface IProduto {
  uid: string;
  name: string;
  company: ICompany
};

interface ICompany {
  name: string;
  document: string;
}

interface IProposal {
  amount: number;
  status: string;
}

export const leadColumns: ColumnDef<ICotacao>[] = [
    // {
    //   id: "uid",
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={
    //         table.getIsAllPageRowsSelected() ||
    //         (table.getIsSomePageRowsSelected() && "indeterminate")
    //       }
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label="Select all"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //       aria-label="Select row"
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    {
      accessorKey: "created",
      header: "Data",
      enableSorting: false,
      enableHiding: false,
      cell: ({row}) => <div>{dateTimeFormatter(row.getValue('created'))}</div>,
    },
    {
      header: "Produto",
      cell: ({ row }) => {
        const product = row.original.product.name;

        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="w-32 truncate">{product}</div>
              </TooltipTrigger>
              <TooltipContent>
                {product}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
    },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "document",
      header: "CPF/CNPJ",
      cell: ({row}) => <div className="w-28">{cpfCnpjFormatter(row.getValue('document'))}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nome
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="w-32 lowercase">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="w-32 truncate">{row.getValue("email")}</div>
              </TooltipTrigger>
              <TooltipContent>
                {row.getValue("email")}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
    },
      enableHiding: false,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const isError = row.original.status === 'Error';
        return (
          <Badge
            variant={isError ? `destructive`: `default`}
          >{row.getValue("status")}</Badge>
        );
      },
    },
    // {
    //   accessorKey: "amount",
    //   header: () => <div className="text-right">Amount</div>,
    //   cell: ({ row }) => {
    //     const amount = parseFloat(row.getValue("amount"))
   
    //     // Format the amount as a dollar amount
    //     const formatted = new Intl.NumberFormat("en-US", {
    //       style: "currency",
    //       currency: "USD",
    //     }).format(amount)
   
    //     return <div className="text-right font-medium">{formatted}</div>
    //   },
    // },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const lead = row.original
   
        return (
          <DropDownMenuLead cotacao={lead} />
        )
      },
    },
  ];
