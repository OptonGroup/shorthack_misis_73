import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { RequireToken } from "./Auth";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	return (
		<div className="App container">
			<BrowserRouter>
				<Routes>
					<Route path="/signup" element={<SignUp />} />
					<Route path="/login" element={<Login />} />
					<Route
						path="/profile"
						element={
							<RequireToken>
								<Profile />
							</RequireToken>
						}
					/>
					<Route
						path="/"
						element={
							<RequireToken>
								<Profile />
							</RequireToken>
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
