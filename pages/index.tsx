import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from 'grommet'

import { AppBar } from '../components/layout'

export default () => {
  return (
    <div>
      <AppBar>Hellow App!</AppBar>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell scope="col">Name</TableCell>
            <TableCell scope="col">Flavor</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell scope="row">
              <strong>Eric</strong>
            </TableCell>
            <TableCell>Coconut</TableCell>
          </TableRow>
          <TableRow>
            <TableCell scope="row">
              <strong>Chris</strong>
            </TableCell>
            <TableCell>Watermelon</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
