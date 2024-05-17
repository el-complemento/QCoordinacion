// next
import Head from 'next/head';
import { Container, Typography, Button, ButtonGroup } from '@mui/material';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';

// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';

import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';

import esLocale from 'date-fns/locale/es'; // lunes primero
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';

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
var high = "#ffa080"
var normal = "#ffff80"
var low = "#a5d46a"

export default function Calendario() {
  const { themeStretch } = useSettingsContext();
  const [selectedQuirofano, setSelectedQuirofano] = useState('Todos');

  // Eventos de ejemplo, aquí podrías hacer una llamada a la API para obtenerlos
  const events = [
    {
      title: 'Cirugía de cadera',
      start: new Date(2024, 4, 15, 8, 0),
      end: new Date(2024, 4, 15, 10, 0),
      allDay: false,
      color: high,
      doctores: ['Dr. García', 'Dra. Martínez'],
      paciente: 'Juan Pérez',
      idOrden: 'ORD001',
      quirofano: '1'
    },
    {
      title: 'Cirugía de rodilla',
      start: new Date(2024, 4, 16, 11, 0),
      end: new Date(2024, 4, 16, 13, 0),
      allDay: false,
      color: normal,
      doctores: ['Dr. Romero'],
      paciente: 'Ana Gómez',
      idOrden: 'ORD002',
      quirofano: '2'

    },
    {
      title: 'Cirugía de columna',
      start: new Date(2024, 4, 17, 14, 0),
      end: new Date(2024, 4, 17, 16, 0),
      allDay: false,
      color: low,
      doctores: ['Dra. Sánchez'],
      paciente: 'Carlos Ruiz',
      idOrden: 'ORD003',
      quirofano: '1'

    },
    {
      title: 'Cirugía reconstructiva',
      start: new Date(2024, 4, 18, 9, 0),
      end: new Date(2024, 4, 19, 12, 0),
      allDay: false,
      color: high,
      doctores: ['Dr. López', 'Dr. Mora'],
      paciente: 'Luisa Navarro',
      idOrden: 'ORD004',
      quirofano: '2'
    }
  ];

  const filteredEvents = selectedQuirofano === 'Todos' ? events : events.filter(event => event.quirofano === selectedQuirofano);

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: event.color,
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
