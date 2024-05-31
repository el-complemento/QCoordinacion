import fetcher from "@/utils/fetcher";
import { getFormattedDate } from "@/utils/getFormattedDate";

export const getCirujiasService = async () => {
  const endpoint = `api/v1/encounters`;
  return await fetcher(endpoint);
};

export const postOrdenService = async (data) => {
  const endpoint = `api/v1/service-requests`;
  console.log("dataCRUDA", data);

  const formatoFhirPadre = {
    "resourceType": "ServiceRequest",
    "subject": {
      "reference": `Patient/${data.patientId}`
    },
    "requester": {
      "reference": `Practitioner/${data.doctorId}`
    },
    "priority": "urgent",
    "code": {
      "concept": {
        "coding": [
          {
            "system": "http://snomed.ct",
            "code": data.procedure
          }
        ],
        "text": data.procedureName
      }
    },
    "status": "on-hold",
    "occurrenceTiming": {
      "repeat": {
        "duration": 2,
        "durationUnit": "h"
      }
    },
    "performerType": {
      coding: data.roles.map((rol) => (
        {
          "system": "http://snomed.ct",
          "code": rol.value,
          "display": rol.label
        }
      ))
    },
    "authoredOn": getFormattedDate()
  }

  console.log("formatoFhirPadre", formatoFhirPadre);

   const idOrdenPadre = await fetcher(endpoint, {
     method: 'POST',
     body: JSON.stringify(formatoFhirPadre),
   });
   

  /* const idOrdenPadre = 1281978; */

  console.log("idOrdenPadre", idOrdenPadre);

  if (!idOrdenPadre) return null;

  data.preoperatorios.forEach(({ value, label }) => {
    const formatoFhirHijo = {
      "resourceType": "ServiceRequest",
      "basedOn": `ServiceRequest/${idOrdenPadre}`,
      "subject": {
        "reference": `Patient/${data.patientId}`
      },
      "requester": {
        "reference": `Practitioner/${data.doctorId}`
      },
      "priority": "urgent",
      "code": {
        "concept": {
          "coding": [
            {
              "system": "http://snomed.ct",
              "code": value
            }
          ],
          "text": label
        }
      },
      "status": "active",
      "authoredOn": getFormattedDate()
    }
    console.log("formatoFhirHijos", formatoFhirHijo);
    fetcher(endpoint, {
      method: 'POST',
      body: JSON.stringify(formatoFhirHijo),
    }).then(result => {
      console.log("idOrdenHijo", result);
    });
  })


  return /* await fetcher(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }); */
};

export const getPacientes = async () => {
  const endpoint = `api/v1/patients/cedulas`;
  return await fetcher(endpoint);
}

export const getMedicos = async () => {
  const endpoint = `api/v1/practicioners`;
  return await fetcher(endpoint);
}