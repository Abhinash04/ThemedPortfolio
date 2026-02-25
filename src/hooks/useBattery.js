import { useState, useEffect } from "react";

const isNavigator = typeof navigator !== "undefined";
const nav = isNavigator ? navigator : undefined;
const isBatteryApiSupported = nav && typeof nav.getBattery === "function";

const defaultState = {
  charging: false,
  chargingTime: 0,
  dischargingTime: 0,
  level: 1
};

const useBatteryMock = () => {
  return {
    isSupported: false,
    ...defaultState
  };
};

const useBatteryReal = () => {
  const [state, setState] = useState({
    isSupported: true,
    fetched: false,
    ...defaultState
  });

  useEffect(() => {
    let isMounted = true;
    let battery = null;

    const handleChange = () => {
      if (!isMounted || !battery) return;
      
      setState({
        isSupported: true,
        fetched: true,
        level: battery.level,
        charging: battery.charging,
        dischargingTime: battery.dischargingTime,
        chargingTime: battery.chargingTime
      });
    };

    nav.getBattery().then((bat) => {
      if (!isMounted) return;

      battery = bat;
      if (battery && battery.addEventListener) {
        battery.addEventListener("chargingchange", handleChange);
        battery.addEventListener("chargingtimechange", handleChange);
        battery.addEventListener("dischargingtimechange", handleChange);
        battery.addEventListener("levelchange", handleChange);
      }

      handleChange();
    });

    return () => {
      isMounted = false;
      if (battery && battery.removeEventListener) {
        battery.removeEventListener("chargingchange", handleChange);
        battery.removeEventListener("chargingtimechange", handleChange);
        battery.removeEventListener("dischargingtimechange", handleChange);
        battery.removeEventListener("levelchange", handleChange);
      }
    };
  }, []);

  return state;
};

export const useBattery = isBatteryApiSupported ? useBatteryReal : useBatteryMock;
