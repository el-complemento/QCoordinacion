// next
import Head from 'next/head';
import { Container, Typography, Box, Stack } from '@mui/material';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';

import { getOrdenesService } from '@/services/fhirService';


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

// Contained button component
import Button from '@mui/material/Button';

export const getServerSideProps = async () => {
  try {
    const data = await getOrdenesService();

    console.log("## ORDENES", data);

    return { props: { ordenes: data } };
  } catch (error) {
    return { props: { data: null, error: error.message } };
  }
};



function ContainedButtons() {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained">Crear Orden</Button>
    </Stack>
  );
}

// Sticky table columns and rows setup
// Sticky table columns and rows setup
const columns = [
  { id: 'name', label: 'Paciente', minWidth: 170 },
  { id: 'code', label: 'Procedimiento', minWidth: 100 },
  { id: 'nroOrden', label: 'Nro de orden', minWidth: 170 },
  { id: 'prioridad', label: 'Prioridad', minWidth: 170 },
  { id: 'roles', label: 'Roles', minWidth: 200 },
  { id: 'horasEstimadas', label: 'Horas Estimadas', minWidth: 170 }  // Nueva columna agregada
];

function createData(name, code, nroOrden, prioridad, roles, horasEstimadas) {
  return { name, code, nroOrden, prioridad, roles, horasEstimadas };
}

const rows = [
  createData('Diego Forlan', 'Apendectomía', 'Lista', 1, 'Alta', 'Cirujano, Anestesista', '2 horas'),
  createData('Michael Jackson', 'Bypass', 'Lista', 2, 'Media', 'Cirujano, Cardiólogo', '3 horas'),
  createData('Agustín Corujo', 'Implante capilar', 'Lista', 3, 'Baja', 'Dermatólogo', '1 hora'),
];

function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

// ----------------------------------------------------------------------

PageOne.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function PageOne({ordenes = [], error = ""}) {
  const { themeStretch } = useSettingsContext();


  const getOrdenes = () =>{
    const ordenesFormateadas = ordenes.map(orden =>({
      ...orden,
      paciente: orden.paciente,
      procedimiento:orden.procedimiento,
      numeroDeOrden: orden.idOrden,
      prioridad: orden.prioridad,
      roles: orden.rolesNecesarios,
      horasEstimadas: orden.horasEstimadas
    }))
    console.log(ordenesFormateadas)
    return ordenesFormateadas
  }



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

