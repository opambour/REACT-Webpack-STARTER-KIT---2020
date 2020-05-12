import 'react-hot-loader';
import React from 'react';
import { render } from 'react-dom';

// css
import '../public/css/Main.css';

// code splitting without react-loadable: using babel dynamic import
import(/*  webpackChunkName: "App" */ './App').then(({ default: App }) =>
    render(<App />, document.querySelector('#root'))
);
