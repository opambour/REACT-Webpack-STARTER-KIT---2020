import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
// import loadable from '@loadable/component';
// import { lazy } from '@loadable/component';

import Header from './pages/includes/Header';
import Content from './pages/includes/Content';
import Footer from './pages/includes/Footer';
import ButtonCounter from './components/ButtonCounter';

// ---- loadable with fallback
// const ButtonCounter = loadable(() => import('./components/ButtonCounter'), {
//     fallback: <div>Loading...</div>
// });

/**
 * @loadable/component exposes a lazy method that acts similarly as React.lazy one.
 * Note: Suspense is not yet available for server-side rendering.
 */
// ---- loadable (lazy) with React Suspense
// const ButtonCounter = lazy(() => import('./components/ButtonCounter'));

class App extends Component {
    render() {
        return (
            /** <></> or <React.Fragment></React.Fragment> */
            <>
                <Header />

                <Content>
                    {/* <Suspense fallback={<div>Loading...</div>}>
                        <ButtonCounter />
                    </Suspense> */}

                    <ButtonCounter />
                </Content>

                <Footer />
            </>
        );
    }
}

export default hot(App);
