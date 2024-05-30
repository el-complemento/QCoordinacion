// next
import Head from 'next/head';
import { Container, Typography, Box, Stack, Dialog, DialogTitle, DialogContent, DialogActions, Button, Checkbox, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';
import { useRouter } from 'next/router';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';

// sticky table
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function ContainedButtons() {
  const router = useRouter();

  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" onClick={() => router.push(PATH_DASHBOARD.crearOrden)}>Crear Orden</Button>
    </Stack>
  );
}

const columns = [
  { id: 'name', label: 'Paciente', minWidth: 170 },
  { id: 'code', label: 'Procedimiento', minWidth: 100 },
  { id: 'preoperatorios', label: 'Preoperatorios', minWidth: 170 },
  { id: 'nroOrden', label: 'Nro de orden', minWidth: 170 },
  { id: 'prioridad', label: 'Prioridad', minWidth: 170 },
];

function createData(name, code, preoperatorios, nroOrden, prioridad) {
  return { name, code, preoperatorios, nroOrden, prioridad };
}

const rows = [
  createData('Diego Forlan', 'Apendectomía', [{name: 'Análisis de sangre', done: true}, {name: 'ECG', done: false}], 1, 'Alta'),
  createData('Michael Jackson', 'Bypass', [{name: 'Análisis de sangre', done: false}, {name: 'ECG', done: true}], 2, 'Media'),
  createData('Agustín Corujo', 'Implante capilar', [{name: 'Análisis de sangre', done: true}, {name: 'ECG', done: false}], 3, 'Baja'),
];

function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickOpen = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  const handlePreoperatorioChange = (index) => {
    const updatedOrder = { ...selectedOrder };
    updatedOrder.preoperatorios[index].done = !updatedOrder.preoperatorios[index].done;
    setSelectedOrder(updatedOrder);
  };

  const allPreoperatoriosDone = (preoperatorios) => preoperatorios.every(p => p.done);

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
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
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.nroOrden}
                      onClick={() => handleClickOpen(row)}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        if (column.id === 'preoperatorios') {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {allPreoperatoriosDone(value) ? <CheckCircleIcon color="success" /> : 'Pendientes'}
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        }
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
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Detalles de la Orden</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <>
              <Typography>Paciente: {selectedOrder.name}</Typography>
              <Typography>Procedimiento: {selectedOrder.code}</Typography>
              <Typography>Nro de orden: {selectedOrder.nroOrden}</Typography>
              <Typography>Prioridad: {selectedOrder.prioridad}</Typography>
              <List>
                {selectedOrder.preoperatorios.map((preoperatorio, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={preoperatorio.name} />
                    <ListItemSecondaryAction>
                      <Checkbox
                        edge="end"
                        onChange={() => handlePreoperatorioChange(index)}
                        checked={preoperatorio.done}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

// ----------------------------------------------------------------------

PageOne.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function PageOne() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> Page One | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} mb={3}>
          <Typography variant="h3" component="h1">
            Ordenes
          </Typography>
          <ContainedButtons />
        </Stack>

        <StickyHeadTable />
      </Container>
    </>
  );
}
