import { useState } from 'react';
import Head from 'next/head';
import { Container, Typography, Button, Box } from '@mui/material';
import DashboardLayout from '../../layouts/dashboard';
import { useSettingsContext } from '../../components/settings';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

import LoadingButton from '@mui/lab/LoadingButton';

import {
  ejecutarAlgoritmoService,
  getAppointmentsService,
  aceptarRecomendacionService,
} from '@/services/fhirService';



Recomendaciones.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export const getServerSideProps = async () => {
  try {
    const appointments = await getAppointmentsService();

    console.log('## appointments', appointments);

    return { props: { initialAppointments: appointments } };
  } catch (error) {
    return { props: { data: null, error: error.message } };
  }
};

// ----------------------------------------------------------------------

export default function Recomendaciones({ initialAppointments }) {
  const { themeStretch } = useSettingsContext();
  const [appointments, setAppointments] = useState(initialAppointments);
  const [isLoading, setIsLoading] = useState(false);
  const [ejecutandoAlgoritmo, setEjecutandoAlgoritmo] = useState(false);
  

  const handleEjecutarAlgoritmo = async () => {
    setIsLoading(true);
    const response = await ejecutarAlgoritmoService();
    alert("El algoritmo se termino de ejecutar correctamente!")
    setIsLoading(false);
    console.log('Response algoritmo', response);
  };

  const handleConfirmarRecomendacion = async (recomendacion) => {
    setIsLoading(true);
    setEjecutandoAlgoritmo(true)
    await aceptarRecomendacionService(recomendacion.idAppontment);

    alert("Recomendacion confirmada!")
    setEjecutandoAlgoritmo(false)
    setIsLoading(false);
    setAppointments(await getAppointmentsService());
  };

  const getTimeFormatted = (date) => {
    // Convert to a format that JavaScript can parse
    const [dayOfWeek, month, day, time, timezone, year] = date.split(' ');
    const jsDateString = `${month} ${day} ${year} ${time} GMT-3`; // Adjust GMT offset for UYT\

    return new Date(jsDateString);
  };

  return (
    <>
      <Head>
        <title> Recomendaciones | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h3" component="h1">
            Recomendaciones
          </Typography>
          <LoadingButton variant="contained" onClick={handleEjecutarAlgoritmo} disabled={isLoading} loading={ejecutandoAlgoritmo}>
            Ejecutar algoritmo
          </LoadingButton>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Código</TableCell>
                <TableCell>Procedimiento</TableCell>
                <TableCell>Paciente</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Desde</TableCell>
                <TableCell>Hasta</TableCell>
                <TableCell>Médicos</TableCell>
                <TableCell>Quirófano</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((item) => (
                <TableRow key={item.idOrden}>
                  <TableCell>{item.idOrden}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.paciente}</TableCell>
                  <TableCell>{getTimeFormatted(item.start).toDateString()}</TableCell>
                  <TableCell>{getTimeFormatted(item.start).toTimeString()}</TableCell>
                  <TableCell>{getTimeFormatted(item.end).toTimeString()}</TableCell>
                  <TableCell>{item.doctores.join(', ')}</TableCell>
                  <TableCell>{item.quirofano}</TableCell>
                  <TableCell>
                    <Box display="flex" gap={1}>
                      <Button
                        variant="contained"
                        onClick={() => handleConfirmarRecomendacion(item)}
                        disabled={isLoading}
                      >
                        Confirmar
                      </Button>
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
