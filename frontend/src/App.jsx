import { RouterProvider } from "react-router/dom";
import routes from "./routes";
import Root from "./layouts/Root";

function App() {
  return (
    <Root>
      <RouterProvider router={routes} />
    </Root>
  );
}

export default App;
