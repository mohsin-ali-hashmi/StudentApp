import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Auth from './layout/Auth';
import Main from './layout/Main';
import routes from './routes';
import {UserAuthContextProvider} from "./config/auth"
import {QueryClientProvider, QueryClient } from "react-query"

import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
	
	const queryClient = new QueryClient();
  return (
    <>
	<UserAuthContextProvider>
	<QueryClientProvider client={queryClient}>
        <BrowserRouter>
					<Switch>
						{routes.map((route, index) => {
							
							switch (route.layout) {
								case 'main':
									return (
										<Route key={index} exact path={route.path}>
											<Main >
												<route.component />
											</Main>
										</Route>
									);
								case 'auth':
									return (
										<Route key={index} exact path={route.path}>
											<Auth >
												<route.component />
											</Auth>
										</Route>
									);
								default :
										return (
											<h1>hehehehe</h1>
										)
							}
						})}
						<Redirect to="/"/>
					</Switch>
					<ToastContainer/>
				</BrowserRouter>
				
				</QueryClientProvider>
			</UserAuthContextProvider>
			
    </>
  );
}

export default App;
