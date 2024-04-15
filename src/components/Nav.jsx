
import { useKeycloak } from "@react-keycloak/web";

const Nav = () => {
  const { keycloak } = useKeycloak();

  return (
    <div>
      
        <div>
      
          <button href="/">
            Home
          </button>
          <button
            href="/secured"
          >
            Secured Page
          </button>
          {!keycloak.authenticated && (
            <button onClick={() => keycloak.login()}>
              Login
            </button>
          )}
          {!!keycloak.authenticated && (
            <button onClick={() => keycloak.logout()}>
              Logout ({keycloak.tokenParsed.preferred_username})
            </button>
          )}
        </div>
    </div>
  );
};

export default Nav;
