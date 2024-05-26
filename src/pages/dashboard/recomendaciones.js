import Head from 'next/head';
import { Container, Typography, Button, Box } from '@mui/material';
import DashboardLayout from '../../layouts/dashboard';
import { useSettingsContext } from '../../components/settings';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

Recomendaciones.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function Recomendaciones() {
  const { themeStretch } = useSettingsContext();

  const handleActualizarRecomendaciones = () => {
    window.location.reload();
  };

  const data = [
    { id: 1, codigo: '1234', paciente: '64872230', fecha: '22/5/2024', medicos: 'Medico 1' },
    { id: 2, codigo: '5678', paciente: '64872231', fecha: '23/5/2024', medicos: 'Medico 2' },
    { id: 3, codigo: '9101', paciente: '64872232', fecha: '24/5/2024', medicos: 'Medico 3' },
    { id: 4, codigo: '1121', paciente: '64872233', fecha: '25/5/2024', medicos: 'Medico 4' },
    { id: 5, codigo: '3141', paciente: '64872234', fecha: '26/5/2024', medicos: 'Medico 5' },
  ];

  return (
    <>
      <Head>
        <title> Recomendaciones | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Recomendaciones
        </Typography>

        <Box mb={2}>
          <Button variant="contained" onClick={handleActualizarRecomendaciones}>
            Actualizar Recomendaciones
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Código</TableCell>
                <TableCell>Paciente</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Médicos</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.codigo}</TableCell>
                  <TableCell>{item.paciente}</TableCell>
                  <TableCell>{item.fecha}</TableCell>
                  <TableCell>{item.medicos}</TableCell>
                  <TableCell>
                    <Box display="flex" gap={1}>
                      <Button variant="contained">Confirmar</Button>
                      <Button variant="outlined">Editar</Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
