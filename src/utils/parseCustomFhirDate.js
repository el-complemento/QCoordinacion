export function parseCustomFhirDate(dateString) {
  // Remover la parte de la zona horaria
  const cleanedDateString = dateString.replace(' UYT', '');

  // Crear un nuevo objeto Date
  const date = new Date(cleanedDateString);

  // Verificar si la fecha es válida
  if (isNaN(date)) {
      throw new Error('Fecha inválida');
  }

  return date;
}
