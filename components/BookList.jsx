import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import Link from "next/link"
  const BookList = () => {

    const tableData = [
        {
            title: 'Name',
            barcode: '99999999',
            name: 'Damilola',
            author: 'Mansurat',
            
        },
        {
            barcode: '99999999',
            title: 'Name',
            name: 'Damilola',
            author: 'Mansurat',
        },
        {
            barcode: '99999999',
            title: 'Name',
            name: 'Damilola',
            author: 'Mansurat',
        },
    ]
  return (
    <div>
            <Table  >
  <TableCaption>A list available books in the libary</TableCaption>
  <TableHeader>
    <TableRow>
    <TableHead className="w-[100px]">Barcode</TableHead>
      <TableHead className="w-[100px]">Name</TableHead>
      <TableHead>Author</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
  {tableData.map((row, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{row.barcode}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.author}</TableCell>
              <TableCell>Available</TableCell>
            </TableRow>
          ))}
  </TableBody>
</Table>
    </div>
  )
}

export default BookList