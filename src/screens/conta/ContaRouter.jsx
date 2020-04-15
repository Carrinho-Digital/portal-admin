import React from 'react';

import PrivateRoute from '../../components/auth/PrivateRoute';

export default () => {
    const match = useRouteMatch()

    return <Switch>
        <Route path={`${match.path}/login`}>
            <ContaLogin/>
        </Route>
        <PrivateRoute path={`${match.path}/conta`}>
            <Produtos />
        </PrivateRoute>
    </Switch>
}