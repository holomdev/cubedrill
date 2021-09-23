import { makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import DrillDown from "../components/DrillDown";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2, 4, 3),
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 4, 3),
    margin: theme.spacing(2, 0, 0),
    borderRadius: 8,
  },
  alertInfo: {
    color: "#7A77FF",
    border: "1px solid #CAC9FF",
    borderRadius: 8,
    background: "white",
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Alert className={classes.alertInfo} severity="info">
        Click en una barra para abrir la tabla Drill Down
      </Alert>
      <div className={classes.paper}>
        <DrillDown />
      </div>
    </div>
  );
};
export default Dashboard;
