// sticky table
import * as React from 'react';

// @mui
import { Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableHead, TableRow } from '@mui/material';


const COLUMNS = [
  { id: 'idOrden', label: 'Nro de orden', minWidth: 50 },
  { id: 'status', label: 'Estado', minWidth: 170 },
  { id: 'paciente', label: 'Paciente', minWidth: 100 },
  { id: 'procedimiento', label: 'Procedimiento', minWidth: 100 },
  { id: 'prioridad', label: 'Prioridad', minWidth: 100 },
  /* { id: 'roles', label: 'Roles', minWidth: 200 }, */
  { id: 'horasEstimadas', label: 'Horas Estimadas', minWidth: 50 },
  { id: 'fechaPedido', label: 'Fecha creación', minWidth: 170 },
];

/* {
  horasEstimadas: '3',
  rolesNecesarios: [ 'Cardiologo' ],
  paciente: 'John Doe',
  fechaPedido: 'Fri May 31 10:26:02 UYT 2024',
  procedimiento: 'Operación cesárea',
  idOrden: '214',
  prioridad: 'Urgent'
} */

export default function TablaOrdenes({ ordenes = [] }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="Tabla de ordenes">
          <TableHead>
            <TableRow>
              {COLUMNS.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ordenes
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.idOrden}>
                    {COLUMNS.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={ordenes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}