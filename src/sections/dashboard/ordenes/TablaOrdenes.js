// sticky table
import * as React from 'react';

// @mui
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  Button,
  Checkbox,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { marcarPreoperatorioCompletoService } from '@/services/fhirService';

const COLUMNS = [
  { id: 'idOrden', label: 'Nro de orden', minWidth: 50 },
  { id: 'status', label: 'Estado', minWidth: 170 },
  { id: 'paciente', label: 'Paciente', minWidth: 100 },
  { id: 'procedimiento', label: 'Procedimiento', minWidth: 100 },
  { id: 'prioridad', label: 'Prioridad', minWidth: 100 },
  { id: 'preoperatorios', label: 'Preoperatorios', minWidth: 50 },
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

export default function TablaOrdenes({
  ordenes = [],
  preoperatorios = [],
  handleActualizarTodo = () => {},
}) {
  console.log(preoperatorios);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const allPreoperatoriosDone = (idPadre) => {
    console.log('idPadre', idPadre);
    const preoperatoriosHijo = preoperatorios[idPadre];

    if (preoperatoriosHijo) {
      console.log(
        "preoperatoriosHijo.every((p) => p?.status === 'Completed')",
        preoperatoriosHijo.every((p) => p?.status === 'Completed')
      );
      return preoperatoriosHijo.every((p) => p?.status === 'Completed');
    }
    console.log('preoperatoriosHijo', preoperatoriosHijo);
    //return preoperatorios.every((p) => p?.done)
    return false;
  };

  const handleClickOpen = (order) => {
    console.log(order);
    setSelectedOrder(order);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedOrder(null);
  };

  const handlePreoperatorioChange = async (preoperatorio) => {
    const updatedOrder = { ...selectedOrder };

    const respuesta = await marcarPreoperatorioCompletoService(preoperatorio.idOrden);

    if (!respuesta) {
      console.log('AYUDAA');
      return;
    }
    await handleActualizarTodo();
    alert(
      `El preoperatorio con ID: #${preoperatorio.idOrden} fue marcado como completado correctamente.`
    );

    /* const preoperatoriosViejos = preoperatoriosGOD[preoperatorio.idOrdenPadre].map((item) => {
      if (item.idOrden == preoperatorio.idOrden) {
        item.status = 'Completed';
      }
      return item;
    });
    console.log(preoperatoriosViejos);

    preoperatoriosGOD[preoperatorio.idOrdenPadre] = preoperatoriosViejos; */

    /*     const actualizados = await handleActualizarPreoperatorios()
    console.log(actualizados); */
    /* setPreoperatoriosGOD() */
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="Tabla de órdenes">
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
            {ordenes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.idOrden}
                  onClick={() => handleClickOpen(row)}
                >
                  {COLUMNS.map((column) => {
                    const value = row[column.id];

                    if (column.id === 'preoperatorios') {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {allPreoperatoriosDone(row['idOrden']) ? (
                            <CheckCircleIcon color="success" />
                          ) : (
                            'Pendientes'
                          )}
                        </TableCell>
                      );
                    }

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
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
      <Dialog open={openModal} onClose={handleClose}>
        <DialogTitle>Detalles de la Orden</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <>
              {/* 
            {
              "horasEstimadas": "4",
              "rolesNecesarios": [
                  "Anestesista",
                  "Cardiologo"
              ],
              "paciente": "John Doe",
              "fechaPedido": "Tue Jun 04 21:18:56 UYT 2024",
              "procedimiento": "Puente coronario de emergencia con injerto",
              "idOrden": "452",
              "prioridad": "Urgent",
              "status": "Draft"
            } */}
              <Typography>Nro de orden: {selectedOrder.idOrden}</Typography>
              <Typography>Paciente: {selectedOrder.paciente}</Typography>
              <Typography>Procedimiento: {selectedOrder.procedimiento}</Typography>
              <Typography>Prioridad: {selectedOrder.prioridad}</Typography>
              <List>
                {preoperatorios[selectedOrder.idOrden]?.map((preoperatorio, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={preoperatorio.title} />
                    <ListItemSecondaryAction>
                      <Checkbox
                        edge="end"
                        onChange={() => handlePreoperatorioChange(preoperatorio)}
                        checked={preoperatorio?.status === 'Completed'}
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
    </Paper>
  );
}
