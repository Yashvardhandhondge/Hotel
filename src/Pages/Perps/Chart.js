import axios from "axios";
import { useEffect, useState } from "react";
import * as V from "victory";
// import { api } from "../functional/Api";

export const Chart = () => {
  const [data, setData] = useState([]);

  // const getdata = async () => {
  //   let array = [];
  //   //Get
  //   const res = await api("perps/getalldata");
  //   for (let i = 1; i < res.length; i++) {
  //     array.push({
  //       x: new Date(res[i].date),
  //       open: res[i - 1].data.indexPrice,
  //       close: res[i].data.indexPrice,
  //       high: res[i].data.indexPrice + 1000,
  //       low: res[i - 1].data.indexPrice - 1000,
  //     });
  //   }
  //   // console.log(array);
  //   setData(array);
  // };

  useEffect(() => {
    // getdata();
  }, []);

  useEffect(() => {
    console.log(data[0], {
      x: new Date(2016, 6, 1),
      open: 5,
      close: 10,
      high: 15,
      low: 0,
    });
  }, [data]);

  return (
    <div className="h-[300px]">
      <V.VictoryChart
        // theme={V.LineHelpers.getLineFunction()}
        domainPadding={{ x: 20 }}
        scale={{ x: "time" }}
        width={1200}
        animate={{ duration: 2000, easing: "bounce" }}
      >
        <V.VictoryAxis
          tickFormat={(t) =>
            `${t.toLocaleString("en-US", { month: "short" })} ${t.getDate()}`
          }
          style={{
            axis: { stroke: "#00000000" },
            tickLabels: {
              fill: "grey",
              fontSize: "10px",
              fontWeight: "100",
            },
          }}
        />
        <V.VictoryAxis
          dependentAxis
          orientation="right"
          style={{
            axis: {
              stroke: "#00000000",
            },
            tickLabels: {
              fill: "grey",
              fontSize: "10px",
              fontWeight: "100",
            },
            grid: {
              stroke: "#cccccc",
              strokeDasharray: "10, 5",
              strokeWidth: 1,
            },
          }}
        />
        <V.VictoryCandlestick
          data={
            // data
            [
              { x: new Date(2016, 6, 1), open: 5, close: 10, high: 15, low: 0 },
              {
                x: new Date(2016, 6, 2),
                open: 10,
                close: 15,
                high: 20,
                low: 5,
              },
              {
                x: new Date(2016, 6, 3),
                open: 15,
                close: 18,
                high: 22,
                low: 10,
              },
              {
                x: new Date(2016, 6, 4),
                open: 18,
                close: 10,
                high: 25,
                low: 7,
              },
              { x: new Date(2016, 6, 5), open: 10, close: 8, high: 15, low: 5 },
              { x: new Date(2016, 6, 6), open: 5, close: 10, high: 15, low: 0 },
              {
                x: new Date(2016, 6, 7),
                open: 10,
                close: 15,
                high: 20,
                low: 5,
              },
              {
                x: new Date(2016, 6, 8),
                open: 15,
                close: 18,
                high: 22,
                low: 10,
              },
              {
                x: new Date(2016, 6, 9),
                open: 18,
                close: 10,
                high: 25,
                low: 7,
              },
              {
                x: new Date(2016, 6, 10),
                open: 10,
                close: 8,
                high: 15,
                low: 5,
              },
            ]
          }
          candleColors={{ positive: "#00c60e", negative: "#ea0000" }}
          candleWidth={6}
          style={{
            data: {
              strokeWidth: 2,
              stroke: (d) => (d.close > d.open ? "#ea0000" : "#00c60e"),
            },
          }}
          // labels
          // closeLabels
          // closeLabelComponent={
          //   <V.VictoryTooltip pointerLength={3} height={10} />
          // }
          // events={[
          //   {
          //     target: "data",
          //     eventHandlers: {
          //       onMouseOver: () => ({
          //         target: "closeLabels",
          //         mutation: () => ({ active: true }),
          //       }),
          //       onMouseOut: () => ({
          //         target: "closeLabels",
          //         mutation: () => ({ active: false }),
          //       }),
          //     },
          //   },
          // ]}
        />
      </V.VictoryChart>
    </div>
  );
};
