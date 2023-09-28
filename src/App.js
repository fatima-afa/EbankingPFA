import { Space } from "antd";
import "./App.css";
import AppFooter from "./Components/AppFooter";
import AppHeader from "./Components/AppHeader";
import PageContent from "./Components/PageContent";

function App() {
  return (
    <div className="App">
      <div className="SideMenuAndPageContent">
        <PageContent></PageContent>
      </div>
    </div>
  );
}
export default App;
