import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar } from "@material-ui/core";
import logo from "../assets/svg/cubejs-logo-white.svg";

const useStyles = makeStyles((theme) => ({
  logo: {
    display: "flex",
    alignItems: "center",
  },
  exampleName: {
    marginLeft: 15,
    color: "#A1A1B5",
  },
  appBar: {
    backgroundColor: "#43436B",
  },
  toolBar: {
    minHeight: 60,
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar variant="dense" className={classes.toolBar}>
        <div className={classes.logo}>
          <img src={logo} alt="Logotype" />
          <span className={classes.exampleName}>Drill Downs</span>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
