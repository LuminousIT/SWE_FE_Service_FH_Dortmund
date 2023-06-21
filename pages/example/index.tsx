import React, { useState, useEffect } from "react";
import { Doughnut, Line } from "react-chartjs-2";

import CTA from "example/components/CTA";
import InfoCard from "example/components/Cards/InfoCard";
import ChartCard from "example/components/Chart/ChartCard";
import ChartLegend from "example/components/Chart/ChartLegend";
import PageTitle from "example/components/Typography/PageTitle";
import RoundIcon from "example/components/RoundIcon";
import Layout from "example/containers/Layout";
import response, { ITableData } from "utils/demo/tableData";
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from "icons";

import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination,
  Button,
} from "@roketid/windmill-react-ui";

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from "utils/demo/chartsData";

import {
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import CreateVehicle from "example/components/CreateVehicle";
import {
  getVehicleRequest,
  getWeatherForecastRequest,
  postVehicleRequest,
} from "api";
import ProgressIndicator from "example/components/ProgressIndicator";
import { LinearProgress } from "@mui/material";

const ErrorCodes = ["P0128", "P0456", "P0457", "P0458", "P0293"];
function Dashboard() {
  Chart.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const [weather, setWeather] = useState({
    timezone: "Europe/Berlin",
    timezone_abbreviation: "CEST",
    elevation: 133.0,
    time: [],
    temperature_2m: [],
    rain: [],
    snowfall: [],
    relativehumidity_2m: [],
    windspeed_10m: [],
  });
  const weatherLineOptions = {
    data: {
      labels: weather.time,
      datasets: [
        {
          label: "Temperature",
          /**
           * These colors come from Tailwind CSS palette
           * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
           */
          backgroundColor: "#0694a2",
          borderColor: "#0694a2",
          data: weather.temperature_2m,
          fill: false,
        },
        {
          label: "Rain",
          fill: false,
          /**
           * These colors come from Tailwind CSS palette
           * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
           */
          backgroundColor: "#7e3af2",
          borderColor: "#7e3af2",
          data: weather.rain,
        },
        {
          label: "Humidity",
          fill: false,
          /**
           * These colors come from Tailwind CSS palette
           * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
           */
          backgroundColor: "#F6D8AE",
          borderColor: "#F6D8AE",
          data: weather.relativehumidity_2m,
        },
        {
          label: "Wind Speed",
          fill: false,
          /**
           * These colors come from Tailwind CSS palette
           * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
           */
          backgroundColor: "#DA4167",
          borderColor: "#DA4167",
          data: weather.windspeed_10m,
        },
      ],
    },
    options: {
      responsive: true,
      tooltips: {
        mode: "index",
        intersect: false,
      },
      scales: {
        x: {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Month",
          },
        },
        y: {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Value",
          },
        },
      },
    },
    legend: {
      display: false,
    },
  };

  const [page, setPage] = useState(1);
  const [data, setData] = useState<[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [location, setLocation] = useState({ latitude: "", longitude: "" });
  const [showBreakdownProgress, setShowBreakdownProgress] = useState(false);
  const [vehicleDefects, setVehicleDefects] = useState(null);
  const [showVehicleDef, setShowVehicleDef] = useState(false);
  const [loading, setLoading] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = response.length;

  // pagination change control
  function onPageChange(p: number) {
    setPage(p);
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  // useEffect(() => {
  //   setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage));
  // }, [page]);

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage?.getItem("userprofile")) || {};
      setUserProfile(user);
      getVehicleRequest("/vehicles").then((res) => setData(res));

      /** GET USER GEOLOCATION */
      if ("geolocation" in navigator) {
        // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          const { latitude, longitude } = coords;
          setLocation({ latitude, longitude });
        });
      }

      /**
       * var config = {
        method: "get",
        url: "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522%2C151.1957362&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyCjpZUKhMEL-JYQP6rKGn4dWKy3nrRCAZg",
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };

      fetch(config.url, { method: "GET", headers: config.headers })
        .then((res) => res.json())
        .then(function (res) {
          console.log({ res });
        });
       * 
       */
    } catch (error) {
      alert(error.message);
    }
  }, []);

  useEffect(() => {
    /*** GET WEATHER INFORMATION */
    let timer = setTimeout(() => {
      setLoading(true);
      getWeatherForecastRequest("/warning/weather", location).then((res) => {
        setWeather((prev) => ({
          ...prev,
          timezone: res?.timezone,
          timezone_abbreviation: res?.timezone_abbreviation,
          elevation: res?.elevation,
          time: res?.hourly?.time || [],
          temperature_2m: res?.hourly?.temperature_2m || [],
          rain: res?.hourly?.rain || [],
          snowfall: res?.hourly?.snowfall || [],
          relativehumidity_2m: res?.hourly?.relativehumidity_2m || [],
          windspeed_10m: res?.hourly?.windspeed_10m || [],
        }));
        setLoading(false);
      });
    }, 1000);

    () => {
      clearTimeout(timer);
    };
  }, [location.latitude]);

  const handleBreakdownView = () => {
    setShowBreakdownProgress(true);
    let timer = setTimeout(() => {
      setShowBreakdownProgress(false);
    }, 10000);

    if (location.latitude.length === 0) {
      alert("Please Enable location for this app in your device settings!");
      clearTimeout(timer);
      return;
    }
    const randomFromOneToFive = Math.floor(Math.random() * 4) + 1;
    const requestObj = {
      ...location,
      userID: userProfile?.id,
      errorCode: ErrorCodes[randomFromOneToFive],
      vehicleID: 1,
    };

    postVehicleRequest("/vehicles/information", requestObj)
      .then((res) => {
        setVehicleDefects(res);
      })
      .then((res) => setShowVehicleDef(true));
  };

  console.log({ location });

  return (
    <Layout>
      <h3 className="text-white mt-3">Welcome, {userProfile?.name}</h3>
      <div>{loading && <LinearProgress />}</div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <PageTitle>Dashboard</PageTitle>
        <div>
          <Button onClick={openModal}>Add Vehicle Info</Button>
        </div>
      </div>

      {/* <CTA /> */}

      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Timezone" value={weather?.timezone}>
          {/* @ts-ignore */}
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard
          title="Current Temperature"
          value={weather?.temperature_2m[0] || "-"}
        >
          {/* @ts-ignore */}
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard
          title="Current Humidity"
          value={weather?.relativehumidity_2m[0] || "-"}
        >
          {/* @ts-ignore */}
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard
          title="Current Wind-Speed"
          value={weather?.windspeed_10m[0] || "-"}
        >
          {/* @ts-ignore */}
          <RoundIcon
            icon={ChatIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>

      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>ID</TableCell>
              <TableCell>Vehicle Name</TableCell>
              <TableCell>Vehicle Model</TableCell>
              <TableCell>Vehicle Type</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span>{i + 1}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user?.vehicleName}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm"> {user?.vehicleModel}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user?.vehicleType}</span>
                </TableCell>
                {/* <TableCell>
                  <Badge type={user.status}>{user.status}</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {new Date(user.date).toLocaleDateString()}
                  </span>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
          />
        </TableFooter>
      </TableContainer>

      <PageTitle>Emergency Service</PageTitle>
      <Button onClick={handleBreakdownView}>
        Vehicle Problem? Click here!
      </Button>

      <div>{showBreakdownProgress && <ProgressIndicator />}</div>

      {showVehicleDef && (
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3 mt-5">
          <InfoCard title="Error Code" value={vehicleDefects?.errorCode}>
            {/* @ts-ignore */}
            <RoundIcon
              icon={PeopleIcon}
              iconColorClass="text-orange-500 dark:text-orange-100"
              bgColorClass="bg-orange-100 dark:bg-orange-500"
              className="mr-4"
            />
          </InfoCard>

          <InfoCard
            title="Defect Component Type"
            value={vehicleDefects?.defectComponentType}
            extraTitle="Component Availability"
            extraValue={
              vehicleDefects?.componentAvailable ? "Available" : "Unavailable"
            }
          >
            {/* @ts-ignore */}
            <RoundIcon
              icon={MoneyIcon}
              iconColorClass="text-green-500 dark:text-green-100"
              bgColorClass="bg-green-100 dark:bg-green-500"
              className="mr-4"
            />
          </InfoCard>

          <InfoCard
            title="Support ID"
            value={vehicleDefects?.supportID}
            extraTitle="Support Telephone"
            extraValue={vehicleDefects?.supportTel}
          >
            {/* @ts-ignore */}
            <RoundIcon
              icon={CartIcon}
              iconColorClass="text-blue-500 dark:text-blue-100"
              bgColorClass="bg-blue-100 dark:bg-blue-500"
              className="mr-4"
            />
          </InfoCard>
        </div>
      )}

      <PageTitle>Weather Forecast Warning Charts</PageTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-1">
        <ChartCard title="Weather Forecast">
          <Line {...weatherLineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>
      </div>
      <CreateVehicle
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        updateData={setData}
      />
    </Layout>
  );
}

export default Dashboard;
