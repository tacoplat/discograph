import { ContentLoader } from "./components/ContentLoader";
import { Provider } from "./components/Provider";

function App() {
  return (
    <div className="App">
      <Provider>
        <ContentLoader />
      </Provider>
    </div>
  );
}

export default App;
