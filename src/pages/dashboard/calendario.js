// next
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Container, Typography, Button, ButtonGroup } from '@mui/material';
import esLocale from 'date-fns/locale/es'; // lunes primero

import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// layouts
import DashboardLayout from '../../layouts/dashboard';

// components
import { useSettingsContext } from '../../components/settings';

// Services
import { getCirujiasService } from '@/services/fhirService';

//utils
import { parseCustomFhirDate } from '@/utils/parseCustomFhirDate';

const locales = {
  'es': esLocale
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// ----------------------------------------------------------------------

Calendario.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export const getServerSideProps = async () => {
  try {
    const data = await getCirujiasService();

    console.log("## CIRUJIAS", data);

    return { props: { cirujias: data } };
  } catch (error) {
    return { props: { data: null, error: error.message } };
  }
};

// ----------------------------------------------------------------------


var COLORS = {
  high: "#ffa080",
  normal: "#ffff80",
  low: "#a5d46a"
}

export default function Calendario({ cirujias = [], error = "" }) {
  const { themeStretch } = useSettingsContext();
  const [selectedQuirofano, setSelectedQuirofano] = useState('Todos');

  const getCirujias = () => {
    const cirujiasFormateadas = cirujias.map(cirujia => ({
      ...cirujia,
      start: parseCustomFhirDate(cirujia.start),
      end: parseCustomFhirDate(cirujia.end)
    }))
    console.log(cirujiasFormateadas);
    return cirujiasFormateadas
  }

  
  const filteredEvents = selectedQuirofano === 'Todos' ? getCirujias() : getCirujias().filter(cirujia => cirujia.quirofano === selectedQuirofano);

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: COLORS[event.color],
        color: 'black', //color del texto 
        borderRadius: '0px',
        border: 'none'
      }
    };
  }

  const handleEventClick = (event) => {
    alert(`Evento: ${event.title}\nInicio: ${event.start}\nFin: ${event.end}\nPaciente: ${event.paciente}\nDoctores: ${event.doctores.join(', ')}\nID Orden: ${event.idOrden}`);
    // Aquí podrías abrir un modal o redireccionar a una página con detalles
  }

  return (
    <>
      <Head>
        <title>Calendario | QCoordinación Web</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Calendario
        </Typography>
        <ButtonGroup variant="contained" aria-label="outlined primary button group" style={{ marginBottom: '20px' }}>
          <Button onClick={() => setSelectedQuirofano('Todos')}>Todos</Button>
          <Button onClick={() => setSelectedQuirofano('1')}>Quirófano 1</Button>
          <Button onClick={() => setSelectedQuirofano('2')}>Quirófano 2</Button>
        </ButtonGroup>
        <Calendar
          localizer={localizer}
          events={filteredEvents}
          startAccessor="start"
          endAccessor="end"
          culture="es"
          style={{ height: 500 }}
          eventPropGetter={eventStyleGetter} // Asegúrate de agregar esta línea
          onSelectEvent={handleEventClick}
          tooltipAccessor={(event) => `Click para más detalles sobre: ${event.title}`}
        />
      </Container>
    </>
  );
}