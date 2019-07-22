import ReactDOM from 'react-dom';


// Import dependencies
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./main.css"

// Import application
import Root from "./Root";
import App from './App';
import logger from "./services/logger";

logger.init();

ReactDOM.render(Root(App), document.getElementById("root"));
