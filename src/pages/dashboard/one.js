import React, { useState } from 'react';
import Head from 'next/head';
import { Container, Typography, Button, Checkbox, FormControl, InputLabel, Select, MenuItem, FormGroup, FormControlLabel } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DashboardLayout from '../../layouts/dashboard';
import { useSettingsContext } from '../../components/settings';

function MedicalProcedureForm() {
  const [procedure, setProcedure] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [patientId, setPatientId] = useState('');
  const [priority, setPriority] = useState('');
  const [roles, setRoles] = useState([{ id: '', role: '' }]);
  const [preOps, setPreOps] = useState({
    anesthesia: false,
    surgeon: false,
    others: false
  });

  const handleRoleChange = (index, event) => {
    const newRoles = roles.map((role, idx) => {
      if (idx === index) {
        return { ...role, role: event.target.value };
      }
      return role;
    });
    setRoles(newRoles);
  };

  const addRole = () => {
    setRoles([...roles, { id: roles.length, role: '' }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!procedure || !doctorId || !patientId || !priority || roles.some(r => !r.role)) {
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }
    console.log({ procedure, doctorId, patientId, priority, roles, preOps });
    // aca se mandan datos a donde sea necesario
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h3" component="h1" paragraph>
        Registrar Procedimiento Médico
      </Typography>

      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Procedimiento</InputLabel>
          <Select
            value={procedure}
            onChange={e => setProcedure(e.target.value)}
            label="Procedimiento"
          >
            <MenuItem value={10}>Procedimiento 1</MenuItem>
            <MenuItem value={20}>Procedimiento 2</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Cédula del Doctor</InputLabel>
          <Select
            value={doctorId}
            onChange={e => setDoctorId(e.target.value)}
            label="Cédula del Doctor"
          >
            <MenuItem value={1}>12345678</MenuItem>
            <MenuItem value={2}>87654321</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Cédula del Paciente</InputLabel>
          <Select
            value={patientId}
            onChange={e => setPatientId(e.target.value)}
            label="Cédula del Paciente"
          >
            <MenuItem value={1}>12345679</MenuItem>
            <MenuItem value={2}>98765432</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Prioridad</InputLabel>
          <Select
            value={priority}
            onChange={e => setPriority(e.target.value)}
            label="Prioridad"
          >
            <MenuItem value="Alta">Alta</MenuItem>
            <MenuItem value="Media">Media</MenuItem>
            <MenuItem value="Baja">Baja</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="h6" style={{ marginTop: '30px', marginBottom: '10px' }}>Roles necesarios</Typography>
        {roles.map((role, index) => (
          <FormControl key={index} fullWidth margin="normal">
            <InputLabel>Rol {index + 1}</InputLabel>
            <Select
              value={role.role}
              onChange={(e) => handleRoleChange(index, e)}
              label={`Rol ${index + 1}`}
            >
              <MenuItem value="Anestesiólogo">Anestesiólogo</MenuItem>
              <MenuItem value="Enfermero">Enfermero</MenuItem>
            </Select>
          </FormControl>
        ))}

        <Button onClick={addRole} startIcon={<AddCircleOutlineIcon />} style={{ marginTop: '10px', marginBottom: '20px' }}>
          Agregar rol
        </Button>

        <Typography variant="h6" style={{ marginTop: '30px', marginBottom: '10px' }}>Preoperatorios necesarios</Typography>
        <FormGroup>
          <FormControlLabel control={<Checkbox checked={preOps.anesthesia} onChange={e => setPreOps({...preOps, anesthesia: e.target.checked})} />} label="Anestesia" />
          <FormControlLabel control={<Checkbox checked={preOps.surgeon} onChange={e => setPreOps({...preOps, surgeon: e.target.checked})} />} label="Cirujano" />
          <FormControlLabel control={<Checkbox checked={preOps.others} onChange={e => setPreOps({...preOps, others: e.target.checked})} />} label="Otros" />
        </FormGroup>

        <Button type="submit" variant="contained" style={{ display: 'block', marginTop: '20px', marginLeft: 'auto', marginRight: 'auto' }}>
          Crear procedimiento
        </Button>
      </form>
    </Container>
  );
}

PageOne.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function PageOne() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title>Crear Orden | Dashboard</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <MedicalProcedureForm />
      </Container>
    </>
  );
}
