import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {Provider} from "react-redux"

import { BrowserRouter } from 'react-router-dom'
import { persistor, store} from "./redux/store"
import { PersistGate } from 'redux-persist/integration/react'
import {Toaster } from "react-hot-toast";

ReactDOM.render(<BrowserRouter>
<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <Toaster position='top-center' reverseOrder={false} />
    <App />

    </PersistGate>
    </Provider>
    </BrowserRouter>, document.getElementById('root'))