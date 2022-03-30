// import "./style.css";
// import "./responsive.css";
// import Playlist from "./pages/home";
// import LoginPage from "./pages/login";

// export default function App() {
//   return (
//     <div className="App">
//       <Playlist />
//     </div>
//   );
// }

import { Component } from "react";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import getToken from "./pages/login/getToken";

class App extends Component {
  state = {
    accessToken: null
  };

  componentDidMount() {
    // console.log(getToken(window.location.hash));
    const { access_token = null } = getToken(window.location.hash);
    if (access_token) this.setState ({accessToken : access_token});
  }
  
  render() {
    const { accessToken = null } = this.state;
    if (accessToken)
      return (
        <div className="App">
          <HomePage accessToken={accessToken} />
        </div>
      );
      return (
        <div className="App">
          <LoginPage/>
        </div>
      );
  }
}
export default App;