import { defineStore } from "pinia";
import { computed } from "vue";

export const useJobDataStore = defineStore("createJob", () => {
  let contactNameOptions = [];
  let businessNameOptions = [];
  let industryOptions = [];
  let positionOptions = [];
  let cities = [
    // Clackamas county cities:
    "Aurora", "Beavercreek", "Barlow", "Canby", "Estacada", "Gladstone", "Happy Valley", "Johnson City", 
    "Lake Oswego", "Milwaukie", "Molalla", "Oregon City", "Portland", "Rivergrove", 
    "Sandy", "Tualatin", "West Linn", "Wilsonville",
    // Multnomah county cities:
    "Fairview", "Gresham", "Maywood Park", 
    "Troutdale", "Wood Village",
    // Yamhill county cities:
    "Amity", "Carlton", "Dayton", "Dundee", "Lafayette", "McMinnville", "Newberg", 
    "Sheridan", "Willamina", "Yamhill",
    // Washington county cities:
    "Banks", "Beaverton", "Cornelius", "Durham", "Forest Grove", "Gaston", "Hillsboro", 
    "King City", "North Plains", "Sherwood", 
    "Tigard"
  ];
  // sort alphabetically and to visually detect if a duplicate city is added
  const cityOptions = cities.sort();

  let zipCodes = [
    // Clackamas county:
    "97002", "97004", "97009", "97011", "97013", "97015", "97017", "97019", "97022", 
    "97023", "97027", "97028", "97032", "97034", "97035", "97036", "97038", "97042",
    "97045", "97049", "97055", "97062", "97067", "97068", "97070", "97071", "97080",
    "97086", "97089", "97132", "97140", "97202", "97206", "97219", "97222", "97267",
    "97268", "97269", "97362", "97375",

    // Multnomah county:
    "97010", "97014", "97024", "97030", "97056", "97060",
    "97124", "97133", "97201", "97203", "97204",
    "97205", "97207", "97208", "97209", "97211", "97212", "97213",
    "97214", "97215", "97216", "97217", "97218", "97220", "97221",
    "97225", "97227", "97228", "97229", "97230", "97231", "97232", "97233", "97236",
    "97238", "97239", "97240", "97242", "97250", "97251", "97252", "97253", "97254",
    "97256", "97266", "97280", "97282", "97283", "97286", "97290", "97292", "97293",
    "97294", "97296",

    // Yamhill county:
    "97101", "97111", "97114", "97115", "97119", "97123", "97127", "97128",
    "97148", "97304", "97347", "97378", "97396",

    // Washington county:
    "97003", "97005", "97006", "97007", "97008", "97064",
    "97075", "97076", "97077", "97078", "97079", "97106", "97109", "97113",
    "97116", "97117", "97125", "97129",
    "97144", "97210", "97223", "97224",
    "97281", "97291", "97298"

  ];
  // sort alphabetically and to visually detect if a duplicate city is added
  const zipCodeOptions = zipCodes.sort();

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
