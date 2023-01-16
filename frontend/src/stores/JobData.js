import { defineStore } from "pinia";
import { computed } from "vue";

export const useJobDataStore = defineStore("createJob", () => {
  let contactNameOptions = [];
  let businessNameOptions = [];
  let industryOptions = [];
  let positionOptions = [];
  const cityOptions = ["Tigard", "Portland", "Beaverton", "Hillsboro"];
  const zipCodeOptions = ["97223", "97007", "97504"];
  const shiftOptions = ["Morning", "Afternoon", "Night"];
  const hoursOptions = ["Full-Time", "Part-Time", "Full-Time or Part-Time"];
  const countyOptions = ["Clackamas", "Multnomah", "Yamhill", "Washington"];

  function FetchJobOptions() {
    FetchBusinessNames();
    FetchContactNames();
    FetchPositions();
    FetchIndustries();
  }
  function FetchIndustries() {
    industryOptions = [
      "Production",
      "Manufacturing",
      "Finance",
      "Construction",
      "Hospitality",
      "Accounting",
    ];
  }
  async function FetchContactNames() {
    contactNameOptions = [
      "Keith Karrie",
      "Byrne Earnestine",
      "Dinah Kelsi",
      "Caleb Cailin",
    ];
  }
  function FetchBusinessNames() {
    businessNameOptions = [
      "Nike",
      "Kroger",
      "Intel",
      "Amazon",
      "OHSU",
      "Autodesk",
      "Ford",
    ];
  }
  function FetchPositions() {
    positionOptions = [
      "Cashier",
      "Cook",
      "Clerk",
      "Janitor",
      "Manager",
      "Sales Rep",
      "Host",
    ];
  }

  const ComputedIndustries = computed({
    get() {
      return industryOptions;
    },
  });
  const ComputedContactNames = computed({
    get() {
      return contactNameOptions;
    },
  });
  const ComputedBusinessNames = computed({
    get() {
      return businessNameOptions;
    },
  });
  const ComputedPositions = computed({
    get() {
      return positionOptions;
    },
  });
  function GetIndustries() {
    return ComputedIndustries;
  }
  const GetContactNames = function () {
    return contactNameOptions;
  };
  const GetShifts = function () {
    return shiftOptions;
  };
  const GetPostions = function () {
    return positionOptions;
  };
  const GetBusinessNames = function () {
    return businessNameOptions;
  };
  const GetHours = function () {
    return hoursOptions;
  };
  const GetCities = function () {
    return cityOptions;
  };
  const GetZipCodes = function () {
    return zipCodeOptions;
  };
  const GetCounties = function () {
    return countyOptions;
  };

  return {
    GetContactNames,
    GetBusinessNames,
    GetCities,
    GetZipCodes,
    GetIndustries,
    GetPostions,
    GetShifts,
    GetHours,
    GetCounties,
    FetchJobOptions,
  };
});
