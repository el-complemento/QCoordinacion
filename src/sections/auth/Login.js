// @mui
import { Button, Alert, Tooltip, Stack, Typography, Box } from '@mui/material';
import { signIn } from 'next-auth/react'; // Importar signIn para manejar la autenticación
// layouts
import LoginLayout from '../../layouts/login';

// ----------------------------------------------------------------------

export default function Login() {
    return (
        <LoginLayout title='QCoordinaciónWeb'>
            <Stack sx={{ mb: 5, position: 'relative' }}>
                <Typography variant="h4">Iniciar sesión</Typography>
                <Tooltip title={'Keycloak Auth'} placement="left">
                    <Box
                        component="img"
                        alt='keycloak'
                        src='/assets/icons/auth/ic_keycloak.png'
                        sx={{ width: 115, height: 35, position: 'absolute', right: 0, mt: .3 }}
                    />
                </Tooltip>
            </Stack>

            <Alert severity="info" sx={{ mb: 3 }}>
                Se lo redirigirá hacia el sistema de autenticación.
            </Alert>

            <Button
                fullWidth
                variant="outlined"
                onClick={() => signIn('keycloak')} // Iniciar sesión con Keycloak
            >
                Iniciar sesión con Keycloak
            </Button>
        </LoginLayout>
    );
}
