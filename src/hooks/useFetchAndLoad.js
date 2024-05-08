import { useEffect, useState } from 'react';

export function useFetchAndLoad() {
  /* Defino estado para loading */
  const [loading, setLoading] = useState(false);
  let controllerPadre = null;

  const callEndpoint = async (axiosCall, resolve, reject) => {
    setLoading(true);
    /* Si hay un controlador lo uso */
    const { call, controller } = axiosCall;
    controllerPadre = controller;
    let result = {};

    try {
      result = await call;
    } catch (error) {
      setLoading(false);
      reject(error);
    }
    setLoading(false);
    resolve(result?.data);
  };

  useEffect(() => {
    const cancelEndpoint = () => {
      setLoading(false);
      /* Si tengo controlador cancelo la peticion de axios */
      if (controllerPadre) controllerPadre.abort();
    };
    cancelEndpoint();
  }, [controllerPadre]);
  // loading,
  return { callEndpoint, loading };
}
