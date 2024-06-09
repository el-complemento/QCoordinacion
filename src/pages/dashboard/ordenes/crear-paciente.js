import React, { useState } from 'react';
import Head from 'next/head';
import {
  Container,
  Typography,
  Button,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import { postPacienteService } from '@/services/fhirService';


export default function CrearPaciente() {
  const [paciente, setPaciente] = useState({
    resourceType: "Patient",
    id: "",
    name: {
      family: "",
      given: ""
    },
    gender: "",
    birthDate: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "family" || name === "given") {
      setPaciente(prev => ({
        ...prev,
        name: {
          ...prev.name,
          [name]: value
        }
      }));
    } else {
      setPaciente(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formattedDate = paciente.birthDate
    const patientData = {
      ...paciente,
      birthDate: formattedDate
    };
    try {
      const response = await postPacienteService(patientData);
      if (response.ok) {
        alert("Paciente creado exitosamente");
      } else {
        // alert("Error al crear paciente");
      }
    } catch (error) {
      console.error("Error al crear paciente", error);
      // alert("Error en la conexión con el servicio");
    }
  };

  return (
    <>
      <Head>
        <title>Crear Paciente | Dashboard</title>
      </Head>
      <DashboardLayout>
        <Container maxWidth="xl">
          <Typography variant="h4" align="center" gutterBottom>
            Crear Paciente
          </Typography>
          <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Cedula del paciente"
                variant="outlined"
                name="id"
                value={paciente.id}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                label="Apellido"
                variant="outlined"
                name="family"
                value={paciente.name.family}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                label="Nombre"
                variant="outlined"
                name="given"
                value={paciente.name.given}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Género</InputLabel>
              <Select
                label="Género"
                name="gender"
                value={paciente.gender}
                onChange={handleInputChange}
              >
                <MenuItem value="male">Masculino</MenuItem>
                <MenuItem value="female">Femenino</MenuItem>
                <MenuItem value="other">Otro</MenuItem>
                <MenuItem value="unknown">Desconocido</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                label="Fecha de Nacimiento"
                type="date"
                name="birthDate"
                InputLabelProps={{ shrink: true }}
                value={paciente.birthDate}
                onChange={handleInputChange}
              />
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ display: 'block', marginTop: '20px', marginLeft: 'auto', marginRight: 'auto' }}
            >
              Crear Paciente
            </Button>
          </form>
        </Container>
      </DashboardLayout>
    </>
  );
}
