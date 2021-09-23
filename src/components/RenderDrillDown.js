import { Spin } from "antd";
import "antd/dist/antd.css";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip as RechartsTooltip,
  Bar,
} from "recharts";
import { format } from "date-fns";
import React, { useState } from "react";
import { useCubeQuery } from "@cubejs-client/react";
import {
  makeStyles,
  Modal,
  Fade,
  Paper,
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

const dateFormatter = (item) => format(new Date(item), "MMM dd");
const colors = ["#FF6492", "#141446", "#7A77FF"];
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: 700,
  },
}));

const renderDrillDown = ({ resultSet, error, pivotConfig }) => {
  const classes = useStyles();
  const [drillDownQuery, setDrillDownQuery] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const drillDownResponse = useCubeQuery(drillDownQuery, {
    skip: !drillDownQuery,
  });

  const drillDownData = () =>
    (drillDownResponse.resultSet && drillDownResponse.resultSet.tablePivot()) ||
    [];

  if (error) {
    return <div>{error.toString()}</div>;
  }
  if (!resultSet) {
    return <Spin />;
  }

  const handleBarClick = (event, yValues) => {
    if (event.xValues !== null) {
      setDrillDownQuery(
        resultSet.drillDown({
          xValues: event.xValues,
          yValues,
        })
      );
      setOpenModal(true);
    }
  };

  function Tooltip({ active, payload, label }) {
    if (active && activeId !== null) {
      return (
        <div className="tooltip" style={{ color: colors[activeId] }}>
          Hacer Drill Down en {dateFormatter(label)}, {payload[activeId].name}
        </div>
      );
    }
    return null;
  }

  return (
    <>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={resultSet.chartPivot()}>
          <XAxis dataKey="x" tickFormatter={dateFormatter} />
          <YAxis />
          <RechartsTooltip content={<Tooltip />} />
          <CartesianGrid strokeDasharray="3 3" />
          {resultSet.seriesNames().map(({ key, title, yValues }, index) => {
            return (
              <Bar
                key={key}
                stackId="a"
                name={title}
                fill={colors[index]}
                dataKey={key}
                onClick={(event) => handleBarClick(event, yValues)}
                onMouseOver={() => setActiveId(index)}
                onMouseOut={() => setActiveId(null)}
              />
            );
          })}
          <Legend />
        </BarChart>
      </ResponsiveContainer>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        className={classes.modal}
      >
        <Fade in={openModal}>
          <div className={classes.paper}>
            {drillDownResponse.isLoading ? (
              "Loading..."
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      {Object.keys(drillDownData()[0] || []).map((key) => (
                        <TableCell key={key}>{key}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  {drillDownData().map((row) => (
                    <TableRow key={row["Orders.id"]}>
                      {Object.keys(row).map((key) => (
                        <TableCell key={key}> {row[key]} </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </Table>
              </TableContainer>
            )}
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default renderDrillDown;
