import Resource from "./Resource.js";

// Set to true run locally
const local = false;

export const testData = [
  {
    name: "User sample preferences",
    "default-variant": "first-variant",
    type: "Feature",
    "all-variants": ["first-variant", "normalized variant"],
    variants: {
      "first-variant": {
        "variant-name": "first-variant",
        dimensions: 3,
        created: "2020-08-09-0290499",
        owner: "Simba Khadder",
        visibility: "private",
        revision: "2020-08-10-39402409",
        tags: ["model2vec", "compressed"],
        description: "Vector generated based on user preferences",
      },
      "normalized variant": {
        "variant-name": "normalized variant",
        dimensions: 3,
        created: "2020-08-09-0290499",
        owner: "Simba Khadder",
        visibility: "private",
        revision: "2020-08-10-39402409",
        tags: ["model2vec", "compressed"],
        description: "Vector generated based on user preferences, normalized",
      },
    },
  },
];

export const testListData = {
  "Source": [
    {
      "all-variants": ["default"],
      "type": "Source",
      "default-variant": "default",
      "name": "my_transformation",
      "variants": {
        "default": {
          "created": "2022-12-15T00:41:10.247138911Z",
          "description": "A dummy transformation",
          "name": "my_transformation",
          "source-type": "Transformation",
          "owner": "default_user",
          "provider": "k8s",
          "variant": "default",
          "labels": null,
          "features": null,
          "training-sets": null,
          "status": "READY",
          "error": "",
          "definition": ""
        }
      }
    }
    ]
}
export const testDetailsData = {
  "sources":
    {
      my_transformation: {
        "all-variants": ["default", "empty_specs"],
        "type": "Source",
        "default-variant": "default",
        "name": "my_transformation",
        "variants": {
          "default": {
            "created": "2022-12-15T00:41:10.247138911Z",
            "description": "A dummy transformation",
            "name": "my_transformation",
            "source-type": "Transformation",
            "owner": "default_user",
            "provider": "k8s",
            "variant": "default",
            "labels": {},
            "features": {},
            "training-sets": {},
            "status": "READY",
            "error": "",
            "definition": "",
            "specifications": {
              "Docker Image": "featureformcom/k8s_runner:latest"
            }
          },
          "empty_specs": {
            "created": "2022-12-15T00:41:10.247138911Z",
            "description": "A dummy transformation",
            "name": "my_transformation",
            "source-type": "Transformation",
            "owner": "default_user",
            "provider": "k8s",
            "variant": "default",
            "labels": {},
            "features": {},
            "training-sets": {},
            "status": "READY",
            "error": "",
            "definition": "",
            "specifications": {
              "Docker Image": ""
            }
          }
        }
      }
    }
}


export const providerLogos = Object.freeze({
  REDIS: "static/Redis_Logo.svg",
  BIGQUERY: "static/google_bigquery-ar21.svg",
  "APACHE SPARK": "static/Apache_Spark_logo.svg",
  POSTGRES: "static/Postgresql_elephant.svg",
  SNOWFLAKE: "static/Snowflake_Logo.svg",
  LOCALMODE: "static/Featureform_logo_pink.svg",
});

var hostname = "localhost";
var port = 3000;

if (typeof window !== 'undefined') {
  hostname = window.location.hostname;
  port = window.location.port;
}

var API_URL = "//" + hostname + ":" + port;

if (typeof process.env.REACT_APP_API_URL != "undefined") {
  API_URL = process.env.REACT_APP_API_URL.trim();
}

export var PROMETHEUS_URL = API_URL + "/prometheus";

if (typeof process.env.REACT_APP_PROMETHEUS_URL != "undefined") {
  PROMETHEUS_URL = process.env.REACT_APP_PROMETHEUS_URL.trim();
}

export default class ResourcesAPI {
  checkStatus() {
    return fetch(API_URL, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        res.json().then((json_data) => ({ data: json_data }));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  fetchResources(type) {
    var fetchAddress;
    let resourceType = Resource[type];
    if (local) {
      return { data: testListData[type] }
    } else {
      fetchAddress = `${API_URL + "/data"}${resourceType.urlPath}`;
    }
    if (process.env.REACT_APP_EMPTY_RESOURCE_VIEW === "true") {
      fetchAddress = "/data/lists/wine-data-empty.json";
    }
    return fetch(fetchAddress, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) =>
        res.json().then((json_data) => {
          if (local) {
            return { data: testData[type] };
          } else {
            return { data: json_data };
          }
        })
      )
      .catch((error) => {
        console.error(error);
      });
  }

  fetchEntity(type, title) {
    var fetchAddress;
    if (local) {
      return { data: testDetailsData[type][title] }
    } else {
      fetchAddress = `${API_URL + "/data"}/${type}/${title}`;
    }

    return fetch(fetchAddress, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) =>
        res.json().then((json_data) => {
          return { data: json_data };
        })
      )
      .catch((error) => {
        console.error(error);
      });
  }

  fetchSearch(query) {
    return new Promise(() => {
       return {"hits":[]}
    })
  }

  fetchVariantSearchStub(query) {
    const fetchAddress = "/data/lists/search_results_example.json";

    return fetch(fetchAddress, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json().then((json_data) => ({ data: json_data })))
      .catch((error) => {
        console.error(error);
      });
  }
}