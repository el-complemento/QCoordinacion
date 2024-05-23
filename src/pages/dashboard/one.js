import React, { useState } from 'react';
import Head from 'next/head';
import { Container, Typography, Button, Checkbox, FormControl, InputLabel, Select, MenuItem, FormGroup, FormControlLabel, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Autocomplete } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DashboardLayout from '../../layouts/dashboard';
import { useSettingsContext } from '../../components/settings';

function MedicalProcedureForm() {
  const [procedure, setProcedure] = useState('');
  const [procedureName, setProcedureName] = useState(''); 
  const [doctorId, setDoctorId] = useState('');
  const [patientId, setPatientId] = useState('');
  const [priority, setPriority] = useState('');
  const [estimatedHours, setEstimatedHours] = useState(''); 
  const [roles, setRoles] = useState([{ id: '', role: '' }]);
  const [preOps, setPreOps] = useState({
    anesthesia: true,
    surgeon: true,
    others: ''
  });
  const [openSummary, setOpenSummary] = useState(false);

  const doctorOptions = [
    { label: '12345678 - Leo Messi', id: 1 },
    { label: '87654321 - Lucho Suarez', id: 2 }
  ];

  const patientOptions = [
    { label: '12345679 - Diego Forlan', id: 1 },
    { label: '98765432 - Edi Cavani', id: 2 }
  ];

  const procedures = [
    { value: 10, label: 'Procedimiento 1' },
    { value: 20, label: 'Procedimiento 2' }
  ];

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
    setOpenSummary(true);
  };

  const handleConfirm = () => {
    console.log({ procedure, procedureName, doctorId, patientId, priority, estimatedHours, roles, preOps });
    // acá se mandan datos a donde sea necesario
    setOpenSummary(false);
  };

  const handleModify = () => {
    setOpenSummary(false);
  };

  const handleProcedureChange = (event) => {
    const value = event.target.value;
    const selectedProcedure = procedures.find(p => p.value === value);
    const name = selectedProcedure ? selectedProcedure.label : '';
    setProcedure(value);
    setProcedureName(name);
  };

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        Crear procedimiento médico
      </Typography>
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Procedimiento</InputLabel>
          <Select
            value={procedure}
            onChange={handleProcedureChange}
            label="Procedimiento"
          >
            {procedures.map((proc) => (
              <MenuItem key={proc.value} value={proc.value}>{proc.label}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Autocomplete
          options={doctorOptions}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => <TextField {...params} label="Doctor" margin="normal" />}
          onChange={(event, newValue) => setDoctorId(newValue ? newValue.label : '')}
          fullWidth
        />

        <Autocomplete
          options={patientOptions}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => <TextField {...params} label="Paciente" margin="normal" />}
          onChange={(event, newValue) => setPatientId(newValue ? newValue.label : '')}
          fullWidth
        />

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

        <TextField
          label="Horas estimadas"
          variant="outlined"
          fullWidth
          margin="normal"
          value={estimatedHours}
          onChange={(e) => setEstimatedHours(e.target.value)}
        />

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
          {/* surgeon = cardiologo, cambiar eso */}          
          <FormControlLabel control={<Checkbox checked={preOps.anesthesia} disabled />} label="Anestesia" />
          <FormControlLabel control={<Checkbox checked={preOps.surgeon} disabled />} label="Cardiologo" />
          <TextField
            label="Otros preoperatorios"
            variant="outlined"
            fullWidth
            margin="normal"
            value={preOps.others}
            onChange={e => setPreOps({...preOps, others: e.target.value})}
          />
        </FormGroup>

        <Button type="submit" variant="contained" style={{ display: 'block', marginTop: '20px', marginLeft: 'auto', marginRight: 'auto' }}>
          Crear procedimiento
        </Button>
      </form>

      <Dialog open={openSummary} onClose={handleModify}>
        <DialogTitle>Resumen del Procedimiento</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="h6">Procedimiento</Typography>
            <Typography>{procedureName}</Typography> {/* Mostrar nombre del procedimiento */}
            <Typography variant="h6">Cédula del Doctor</Typography>
            <Typography>{doctorId}</Typography>
            <Typography variant="h6">Cédula del Paciente</Typography>
            <Typography>{patientId}</Typography>
            <Typography variant="h6">Prioridad</Typography>
            <Typography>{priority}</Typography>
            <Typography variant="h6">Horas Estimadas</Typography>
            <Typography>{estimatedHours}</Typography>
            <Typography variant="h6">Roles necesarios</Typography>
            {roles.map((role, index) => (
              <Typography key={index}>{`Rol ${index + 1}: ${role.role}`}</Typography>
            ))}
            <Typography variant="h6">Preoperatorios necesarios</Typography>
            <Typography>Anestesia: {preOps.anesthesia ? 'Sí' : 'No'}</Typography>
            <Typography>Cirujano: {preOps.surgeon ? 'Sí' : 'No'}</Typography>
            <Typography>Otros preoperatorios: {preOps.others}</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModify} color="primary">
            Modificar
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

MedicalProcedureForm.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default MedicalProcedureForm;
