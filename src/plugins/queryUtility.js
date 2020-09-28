const fields_mapping = require("@/config/fields_mapping.json");
const all_mapping_fields_config = require("@/config/all_mapping_fields_config.json");
const data_source_index = fields_mapping["data_source_index"];
const data_type_index = fields_mapping["data_type_index"];
let mapping_fields_config = JSON.parse(
  localStorage.getItem("all_mapping_fields_config")
);
import i18n from "./i18n.js";
export default {
  convertDecimalToBinaryArray(dataSource) {
    let data_sources = [];
    let Binary = parseInt(dataSource)
      .toString(2)
      .split("")
      .reverse();
    for (let i = 0; i < Binary.length; i++) {
      if (Binary[i] != 0) {
        data_sources.push(2 ** i);
      }
    }
    return data_sources;
  },

  getDataSourceArray(dataSource) {
    let data_source = this.convertDecimalToBinaryArray(dataSource);
    if (
      data_source.includes(4) &&
      data_source.includes(data_source_index.endpoint)
    ) {
      return data_source.filter(item => item != 4);
    } else if (
      data_source.includes(4) &&
      !data_source.includes(data_source_index.endpoint)
    ) {
      data_source = data_source.filter(item => item != 4);
      data_source.push(data_source_index.endpoint);
      return data_source;
    }
    return data_source;
  },

  getAllFieldsBySourceAndType(data_source, data_type) {
    let search_mapping_option = {};
    let search_fields_mapping = {};
    let search_fields_i18n = {};
    let search_raw_fields = {};
    let mixed_type = this.getSourceAndTypeMixedName(data_source, data_type);
    // console.log(
    //   "getAllFieldsBySourceAndType",
    //   data_source,
    //   data_type,
    //   mixed_type
    // );
    if (mapping_fields_config === null) {
      mapping_fields_config = all_mapping_fields_config;
    }
    switch (mixed_type) {
      case "mixed_and_cas":
        search_mapping_option = mapping_fields_config["mail_mix_search"];
        search_fields_mapping =
          fields_mapping["cas_mixed_search_fields_mapping"];
        search_fields_i18n = i18n.t("HOME.cas_search_fields");
        search_raw_fields = mapping_fields_config["mail_mix_raw_fields"];
        break;
      case "telemetry_and_cas":
        search_mapping_option = mapping_fields_config["mail_telemetry_search"];
        search_fields_mapping = fields_mapping["cas_search_fields_mapping"];
        search_raw_fields = mapping_fields_config["mail_telemetry_raw_fields"];
        search_fields_i18n = i18n.t("HOME.cas_search_fields");
        break;
      case "detection_and_cas":
        search_mapping_option = mapping_fields_config["mail_detection_search"];
        search_fields_mapping =
          fields_mapping["cas_detection_search_fields_mapping"];
        search_raw_fields = mapping_fields_config["mail_detection_raw_fields"];
        search_fields_i18n = i18n.t("HOME.cas_search_fields");
        break;
      case "mixed_and_endpoint":
        search_mapping_option = mapping_fields_config["endpoint_mix_search"];
        search_fields_mapping =
          fields_mapping["edl_mixed_search_fields_mapping"];
        search_fields_i18n = i18n.t("HOME.edl_cross_search_fields");
        search_raw_fields =
          mapping_fields_config["endpoint_mix_search_raw_fields"];
        break;
      case "telemetry_and_endpoint":
        search_mapping_option =
          mapping_fields_config["endpoint_telemetry_search"];
        search_fields_mapping = fields_mapping["edl_search_fields_mapping"];
        search_raw_fields =
          mapping_fields_config["endpoint_telemetry_raw_fields"];
        search_fields_i18n = i18n.t("HOME.edl_search_fields");
        break;
      case "detection_and_endpoint":
        search_mapping_option =
          mapping_fields_config["endpoint_detection_search"];
        search_fields_mapping =
          fields_mapping["edl_detection_search_fields_mapping"];
        search_fields_i18n = i18n.t("HOME.edl_search_fields");
        search_raw_fields =
          mapping_fields_config["endpoint_detection_raw_fields"];
        break;
      case "telemetry_and_network":
        // search_raw_fields = fields_mapping["endpoint_detection_raw_fields"];
        break;
      case "detection_and_network":
        search_mapping_option =
          mapping_fields_config["network_detection_search"];
        search_fields_mapping =
          fields_mapping["network_detection_search_fields_mapping"];
        //TODO:NETWORK I18N
        search_fields_i18n = i18n.t("HOME.network_search_fields");
        search_raw_fields =
          mapping_fields_config["network_detection_raw_fields"];
        break;
      case "mixed_and_network":
        search_mapping_option =
          mapping_fields_config["network_detection_search"];
        search_fields_mapping =
          fields_mapping["network_detection_search_fields_mapping"];
        //TODO:NETWORK I18N
        search_fields_i18n = i18n.t("HOME.network_search_fields");
        search_raw_fields =
          mapping_fields_config["network_detection_raw_fields"];
        break;
      default:
        search_mapping_option = mapping_fields_config["cross_search"];
        search_fields_mapping = fields_mapping["mixed_search_fields_mapping"];
        search_fields_i18n = i18n.t("HOME.mixed_search_fields");
        search_raw_fields = mapping_fields_config["cross_search_raw_fields"];
        break;
    }
    // console.log(
    //   "getAllFieldsBySourceAndType",
    //   search_mapping_option,
    //   search_fields_mapping,
    //   search_fields_i18n,
    //   search_raw_fields
    // );
    return {
      search_mapping_option,
      search_fields_mapping,
      search_fields_i18n,
      search_raw_fields
    };
  },

  getSourceAndTypeMixedName(data_source, data_type) {
    let mixed = "";
    if (data_source.length > 1) {
      mixed = "mixed_all";
    } else if (data_source.includes(data_source_index.email)) {
      // email
      if (data_type.length > 1) {
        mixed = "mixed_and_cas";
      } else if (data_type.includes(data_type_index.telemetry)) {
        mixed = "telemetry_and_cas";
      } else if (data_type.includes(data_type_index.detection)) {
        mixed = "detection_and_cas";
      }
    } else if (data_source.includes(data_source_index.endpoint)) {
      //endpoint
      if (data_type.length > 1) {
        mixed = "mixed_and_endpoint";
      } else if (data_type.includes(data_type_index.telemetry)) {
        mixed = "telemetry_and_endpoint";
      } else if (data_type.includes(data_type_index.detection)) {
        mixed = "detection_and_endpoint";
      }
    } else if (data_source.includes(data_source_index.network)) {
      //network
      if (data_type.length > 1) {
        mixed = "mixed_and_network";
      } else if (data_type.includes(data_type_index.telemetry)) {
        mixed = "telemetry_and_network";
      } else if (data_type.includes(data_type_index.detection)) {
        mixed = "detection_and_network";
      }
    }
    // console.log(
    //   `response getSourceAndTypeMixedName, source = ${data_source}, type = ${data_type}, mixed=${mixed}`
    // );
    return mixed;
  },

  formatSearchFieldConfig(config) {
    if (config) {
      config["mail_telemetry_search"] = this.filterSearchField(
        fields_mapping["cas_search_fields_mapping"],
        config["mail_telemetry_search"]
      );
      config["mail_detection_search"] = this.filterSearchField(
        fields_mapping["cas_detection_search_fields_mapping"],
        config["mail_detection_search"]
      );
      config["mail_mix_search"] = this.filterSearchField(
        fields_mapping["cas_mixed_search_fields_mapping"],
        config["mail_mix_search"]
      );
      config["endpoint_telemetry_search"] = this.filterSearchField(
        fields_mapping["edl_search_fields_mapping"],
        config["endpoint_telemetry_search"]
      );
      config["endpoint_detection_search"] = this.filterSearchField(
        fields_mapping["edl_detection_search_fields_mapping"],
        config["endpoint_detection_search"]
      );
      config["endpoint_mix_search"] = this.filterSearchField(
        fields_mapping["edl_mixed_search_fields_mapping"],
        config["endpoint_mix_search"]
      );
      config["network_detection_search"] = this.filterSearchField(
        fields_mapping["network_detection_search_fields_mapping"],
        config["network_detection_search"]
      );
      config["cross_search"] = this.filterSearchField(
        fields_mapping["mixed_search_fields_mapping"],
        config["cross_search"]
      );
    }
    return config;
  },

  filterSearchField(ui_search_fields_mapping, config_search_fields_mapping) {
    let ui_search_fields = ui_search_fields_mapping;
    let config_search_fields = config_search_fields_mapping;
    let temp = {};
    for (let key in ui_search_fields) {
      if (config_search_fields.hasOwnProperty(ui_search_fields[key])) {
        temp[key] = config_search_fields[ui_search_fields[key]];
      }
    }
    return temp;
  },

  convertBinaryArrayToDecimal(data_source_list) {
    // console.log(data_source_list);
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    return data_source_list.reduce(reducer);
  },
  getMappingKeyFromDataSourceIndex(data_source) {
    let mapping_key;
    switch (data_source) {
      case 1: {
        mapping_key = "cas_raw_fields_2_search_fields";
        break;
      }
      case 4: {
        mapping_key = "edl_raw_fields_2_search_fields";
        break;
      }
    }
    return mapping_key;
  }
};
