// next
import Head from 'next/head';

// @mui
import { Button, Stack, Container, Typography } from '@mui/material';

// layouts
import DashboardLayout from '../../layouts/dashboard';

// components
import { useSettingsContext } from '../../components/settings';
import TablaOrdenes from '@/sections/dashboard/ordenes/TablaOrdenes';

// services
import { getOrdenesService } from '@/services/fhirService';



// ----------------------------------------------------------------------

Ordenes.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export const getServerSideProps = async () => {
  try {
    const data = await getOrdenesService();

    console.log("## ORDENES", data);

    return { props: { ordenes: data } };
  } catch (error) {
    return { props: { data: null, error: error.message } };
  }
};

// ----------------------------------------------------------------------

export default function Ordenes({ ordenes = [], error = "" }) {
  const { themeStretch } = useSettingsContext();


  const getOrdenes = () => {
    const ordenesFormateadas = ordenes.map(orden => ({
      ...orden,
      paciente: orden.paciente,
      procedimiento: orden.procedimiento,
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
        <title> Ordenes | QCoordinaciónWeb</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} mb={3}>
          <Typography variant="h3" component="h1">
            Ordenes
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained">Crear Orden</Button>
          </Stack>

        </Stack>

        <TablaOrdenes ordenes={ordenes}/>
      </Container>
    </>
  );
}

