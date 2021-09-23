import cubejs from "@cubejs-client/core";
import { CubeProvider } from "@cubejs-client/react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import "@fontsource/roboto";
import "./assets/css/body.css";

const cubejsApi = cubejs(process.env.REACT_APP_CUBEJS_TOKEN, {
  apiUrl: process.env.REACT_APP_API_URL,
});

const useStyles = makeStyles((theme) => ({ root: { flexGrow: 1 } }));

const AppLayout = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      <div>{children}</div>
    </div>
  );
};

function App() {
  return (
    <CubeProvider cubejsApi={cubejsApi}>
      <AppLayout>
        <Dashboard />
      </AppLayout>
    </CubeProvider>
  );
}

export default App;
