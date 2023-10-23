import { ShopLayout } from '@/components/shared/ShopLayout'
import { Chip, Grid, Link, Typography } from '@mui/material'
import {
  DataGrid,
  type GridRowsProp,
  type GridColDef,
  type GridRenderCellParams,
} from '@mui/x-data-grid'
import { type NextPage } from 'next'
import NextLink from 'next/link'

interface Row {
  id: number
  paid: boolean
  fullName: string
}

const rows: GridRowsProp<Row> = [
  { id: 1, paid: true, fullName: 'John Doe' },
  { id: 2, paid: false, fullName: 'Mary Smith' },
  { id: 3, paid: true, fullName: 'Zac Allen' },
]

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullName', headerName: 'Full Name', width: 300 },
  {
    field: 'paid',
    headerName: 'Paid',
    description: 'Show information if the order is paid"',
    width: 200,
    renderCell: (params) => {
      return (params.row.paid as boolean) ? (
        <Chip color="secondary" label="Paid" variant="outlined" />
      ) : (
        <Chip label="Unpaid" variant="outlined" />
      )
    },
  },
  {
    field: 'orden',
    headerName: 'Order',
    width: 200,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <NextLink href={`/order/${params.row.id}`}>
          <Link component="span" underline="always">
            View order
          </Link>
        </NextLink>
      )
    },
  },
]

const HistoryPage: NextPage = () => {
  return (
    <ShopLayout title="Order History" pageDescription="Order history">
      <Typography variant="h1" component="h1">
        Order History
      </Typography>

      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} />
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default HistoryPage
