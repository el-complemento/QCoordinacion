import { useKeycloak } from "@react-keycloak/web";

const Secured = () => {
  const { keycloak } = useKeycloak();

  const handleConsultaPrueba = () => {
    fetch("http://localhost:8080/api/v1/ordenes", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      //credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + keycloak.token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div>
      <h1 className="text-green-800 text-4xl">WTas autenticado maquina.</h1>
      <button onClick={handleConsultaPrueba}>Hace click consulta</button>
    </div>
  );
};

export default Secured;
