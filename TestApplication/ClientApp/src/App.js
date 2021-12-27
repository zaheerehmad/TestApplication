import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

// ROUTER
import { BrowserRouter } from "react-router-dom";
import { RouterConfig } from "./navigation/RouterConfig";
import { ProvideAuth } from "./navigation/Auth/ProvideAuth";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h2> Monitoring Application
                </h2>
            </header>
            <ProvideAuth>
                <BrowserRouter>
                    <RouterConfig />
                </BrowserRouter>
            </ProvideAuth>
        </div>
    );
}

export default App;
