// next
import Head from 'next/head';
import { Container, Typography } from '@mui/material';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Supongamos que moment es usado para la localización, puedes cambiarlo por date-fns si prefieres
const localizer = momentLocalizer(moment);

// ----------------------------------------------------------------------

Calendario.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------
var alta = "#ffa080"
var media = "#ffff80"
var baja = "#a5d46a"

export default function Calendario() {
  const { themeStretch } = useSettingsContext();

  // Eventos de ejemplo, aquí podrías hacer una llamada a la API para obtenerlos
  const events = [
    {
      title: 'Cirugía de cadera',
      start: new Date(2024, 4, 15, 8, 0),
      end: new Date(2024, 4, 15, 10, 0),
      allDay: false,
      color: alta
    },
    {
      title: 'Cirugía de rodilla',
      start: new Date(2024, 4, 16, 11, 0),
      end: new Date(2024, 4, 16, 13, 0),
      allDay: false,
      color: media
    },
    {
      title: 'Cirugía de columna',
      start: new Date(2024, 4, 17, 14, 0),
      end: new Date(2024, 4, 17, 16, 0),
      allDay: false,
      color: baja
    },
    {
      title: 'Cirugía reconstructiva',
      start: new Date(2024, 4, 18, 9, 0),
      end: new Date(2024, 4, 18, 12, 0),
      allDay: false,
      color: alta
    }
  ];

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
    alert(`Evento: ${event.title}\nInicio: ${event.start}\nFin: ${event.end}`);
    // Aquí podrías abrir un modal o redireccionar a una página con detalles
  }

  return (
    <>
      <Head>
        <title> Calendario | QCoordinación Web</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Calendario
        </Typography>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={eventStyleGetter}
          onSelectEvent={handleEventClick}
          tooltipAccessor={(event) => `Click para más detalles sobre: ${event.title}`}
          style={{ height: 500 }}
        />
      </Container>
    </>
  );
}
