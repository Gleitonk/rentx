import { useAuth } from '@hooks/auth';
import { NavigationContainer } from '@react-navigation/native';
import { AppStackRoutes } from './app.stack.routes';
import { AppTabRoutes } from './app.tab.routes';
import { AuthRoutes } from './auth.routes';

export function Routes() {
    const { user } = useAuth();

    return (
        <NavigationContainer>
            {user ? <AppTabRoutes /> : <AuthRoutes />}
        </NavigationContainer>
    );
}