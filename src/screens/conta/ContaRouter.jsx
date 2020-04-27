import React from 'react';

export default () => {
    const match = useRouteMatch()

    return <Switch>
        <Route path={`${match.path}/login`}>
            <ContaLogin/>
        </Route>
    </Switch>
}