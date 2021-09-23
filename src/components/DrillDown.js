import React, { useContext } from "react";
import { QueryRenderer, CubeContext } from "@cubejs-client/react";
import RenderDrillDown from "./RenderDrillDown";

const queryConfig = {
  measures: ["Orders.count"],
  timeDimensions: [
    {
      dimension: "Orders.createdAt",
      granularity: "day",
      dateRange: "Last 30 days",
    },
  ],
  order: {
    "Orders.count": "desc",
  },
  dimensions: ["Orders.status"],
};

const pivotConfig = {
  x: ["Orders.status", "Orders.createdAt.day"],
  y: ["measures"],
  fillMissingDates: true,
  joinDateRange: false,
};

const DrillDown = () => {
  const { cubejsApi } = useContext(CubeContext);

  return (
    <QueryRenderer
      query={queryConfig}
      cubejsApi={cubejsApi}
      resetResultSetOnChange={false}
      render={(props) => (
        <RenderDrillDown
          resultSet={props.resultSet}
          error={props.error}
          pivotConfig={pivotConfig}
        />
      )}
    />
  );
};

export default DrillDown;
