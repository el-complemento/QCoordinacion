import React from 'react'

// MUI
import {
  Button, FormControl, InputLabel, Select, MenuItem, Typography
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function SelectorPreoperatorios({ preoperatorios = [], setPreoperatorios = () => { } }) {

  const defaultPreOperatorios = [
    { value: 306255001, label: 'Derivación a anestesista', disabled: true },
    { value: 308471005, label: 'Derivación al cardiólogo', disabled: true },
    { value: 27171005, label: 'Análisis de orina' },
    { value: 301838008, label: 'Análisis de sangre' },
    { value: 66238006, label: 'Análisis inmunorradiométrico' }
  ]

  const addPreOperatorio = () => {
    setPreoperatorios([...preoperatorios, { id: preoperatorios.length, codigo: null }]);
  };

  const handlePreOperatorioChange = (index, event) => {
    const newPreoperatorios = preoperatorios.map((preoperatorio, idx) => {
      if (idx === index) {
        return { ...preoperatorio, codigo: event.target.value };
      }
      return preoperatorio;
    });
    setPreoperatorios(newPreoperatorios);
  };

  return (
    <>
      <Typography variant="h6" style={{ marginTop: '30px', marginBottom: '10px' }}>Preoperatorios necesarios</Typography>

      {
        preoperatorios.map((preoperatorio, index) => (
          <FormControl key={index} fullWidth margin="normal">
            <InputLabel>Pre-operatorio {index + 1}</InputLabel>
            <Select
              disabled={preoperatorio?.disabled}
              value={preoperatorio.codigo}
              onChange={(e) => handlePreOperatorioChange(index, e)}
              label={`Preoperatorio ${index + 1}`}
            >
              {defaultPreOperatorios.map(({ value, label, disabled = false}) => (
                <MenuItem key={value} value={value} disabled={disabled}>{label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        ))
      }

      <Button onClick={addPreOperatorio} startIcon={<AddCircleOutlineIcon />} style={{ marginTop: '10px', marginBottom: '20px' }}>
        Agregar pre-operatorio
      </Button>
    </>
  )
}

export default SelectorPreoperatorios