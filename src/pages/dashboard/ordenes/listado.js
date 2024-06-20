import { useCallback, useState } from 'react';

// next
import Head from 'next/head';

// @mui
import { Button, Stack, Container, Typography } from '@mui/material';

// layouts
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';

// components
import { useSettingsContext } from '@/components/settings';
import TablaOrdenes from '@/sections/dashboard/ordenes/TablaOrdenes';

// services
import { getOrdenesService, getPreoperatoriosService } from '@/services/fhirService';

// ----------------------------------------------------------------------

Ordenes.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export const getServerSideProps = async () => {
  try {
    const ordenes = await getOrdenesService();

    const preoperatorios = await getPreoperatoriosService();

    console.log('## ORDENES', ordenes);
    console.log('## PREOPERATORIOS', preoperatorios);

    return { props: { ordenes, preoperatorios } };
  } catch (error) {
    return { props: { data: null, error: error.message } };
  }
};

// ----------------------------------------------------------------------

export default function Ordenes({ ordenes = [], preoperatorios = [], error = '' }) {
  const { themeStretch } = useSettingsContext();
  const [ordenesList, setOrdenesList] = useState(ordenes)
  const [preoperatoriosList, setPreoperatoriosList] = useState(preoperatorios)

  const preoperatoriosPorPadre = useCallback(() => {
    const dictPreoperatorios = {};

    preoperatoriosList.forEach((preoperatorio) => {
      const { idOrdenPadre } = preoperatorio;
      if (dictPreoperatorios[idOrdenPadre]) {
        dictPreoperatorios[idOrdenPadre].push(preoperatorio);
      } else {
        dictPreoperatorios[idOrdenPadre] = [preoperatorio];
      }
    });

    return dictPreoperatorios;
  }, [preoperatoriosList]);

  const handleActualizarTodo = async () => {
    const ordenesNuevas = await getOrdenesService();
    const preoperatoriosNuevas = await getPreoperatoriosService();
    setPreoperatoriosList(preoperatoriosNuevas)
    setOrdenesList(ordenesNuevas)
  };

  return (
    <>
      <Head>
        <title> Ordenes | QCoordinaciónWeb</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          mb={3}
        >
          <Typography variant="h3" component="h1">
            Ordenes
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained">Crear Orden</Button>
          </Stack>
        </Stack>

        <TablaOrdenes
          ordenes={ordenesList}
          preoperatorios={preoperatoriosPorPadre()}
          handleActualizarTodo={handleActualizarTodo}
        />
      </Container>
    </>
  );
}
