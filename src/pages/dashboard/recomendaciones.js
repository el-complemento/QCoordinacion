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
              
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>1234</TableCell>
                <TableCell>64872230</TableCell>
                <TableCell>22/5/2024</TableCell>
                <TableCell>Medico 1</TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Button variant="contained">Confirmar</Button>
                    <Button variant="outlined">Editar</Button>
                  </Box>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>1234</TableCell>
                <TableCell>64872230</TableCell>
                <TableCell>22/5/2024</TableCell>
                <TableCell>Medico 1</TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Button variant="contained">Confirmar</Button>
                    <Button variant="outlined">Editar</Button>
                  </Box>
                </TableCell>
              </TableRow>
              {/* ---------------------------de aca pabajo se repiten--------------------------------- */}
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>1234</TableCell>
                <TableCell>64872230</TableCell>
                <TableCell>22/5/2024</TableCell>
                <TableCell>Medico 1</TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Button variant="contained">Confirmar</Button>
                    <Button variant="outlined">Editar</Button>
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>1234</TableCell>
                <TableCell>64872230</TableCell>
                <TableCell>22/5/2024</TableCell>
                <TableCell>Medico 1</TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Button variant="contained">Confirmar</Button>
                    <Button variant="outlined">Editar</Button>
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>1234</TableCell>
                <TableCell>64872230</TableCell>
                <TableCell>22/5/2024</TableCell>
                <TableCell>Medico 1</TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Button variant="contained">Confirmar</Button>
                    <Button variant="outlined">Editar</Button>
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>1234</TableCell>
                <TableCell>64872230</TableCell>
                <TableCell>22/5/2024</TableCell>
                <TableCell>Medico 1</TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Button variant="contained">Confirmar</Button>
                    <Button variant="outlined">Editar</Button>
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>1234</TableCell>
                <TableCell>64872230</TableCell>
                <TableCell>22/5/2024</TableCell>
                <TableCell>Medico 1</TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Button variant="contained">Confirmar</Button>
                    <Button variant="outlined">Editar</Button>
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>1234</TableCell>
                <TableCell>64872230</TableCell>
                <TableCell>22/5/2024</TableCell>
                <TableCell>Medico 1</TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Button variant="contained">Confirmar</Button>
                    <Button variant="outlined">Editar</Button>
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>1234</TableCell>
                <TableCell>64872230</TableCell>
                <TableCell>22/5/2024</TableCell>
                <TableCell>Medico 1</TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Button variant="contained">Confirmar</Button>
                    <Button variant="outlined">Editar</Button>
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>1234</TableCell>
                <TableCell>64872230</TableCell>
                <TableCell>22/5/2024</TableCell>
                <TableCell>Medico 1</TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Button variant="contained">Confirmar</Button>
                    <Button variant="outlined">Editar</Button>
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>1234</TableCell>
                <TableCell>64872230</TableCell>
                <TableCell>22/5/2024</TableCell>
                <TableCell>Medico 1</TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Button variant="contained">Confirmar</Button>
                    <Button variant="outlined">Editar</Button>
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>1234</TableCell>
                <TableCell>64872230</TableCell>
                <TableCell>22/5/2024</TableCell>
                <TableCell>Medico 1</TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Button variant="contained">Confirmar</Button>
                    <Button variant="outlined">Editar</Button>
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>1234</TableCell>
                <TableCell>64872230</TableCell>
                <TableCell>22/5/2024</TableCell>
                <TableCell>Medico 1</TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Button variant="contained">Confirmar</Button>
                    <Button variant="outlined">Editar</Button>
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>1234</TableCell>
                <TableCell>64872230</TableCell>
                <TableCell>22/5/2024</TableCell>
                <TableCell>Medico 1</TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Button variant="contained">Confirmar</Button>
                    <Button variant="outlined">Editar</Button>
                  </Box>
                </TableCell>
              </TableRow>
              
              {/* -----------------------aca terminan obviamente------------------------------------- */}


            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
