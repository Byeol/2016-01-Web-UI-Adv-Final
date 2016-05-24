"use strict";

const apiBaseUrl = "http://128.199.76.9:8002/";

const SELECTORS = {
  TODO_TEMPLATE: "#todo-template",
  TODO_LIST_TEMPLATE: "#todo-list-template",
  TODO_LIST: ".todo-list"
};

const CLASSNAME = {
  SELECTED: "active selected",
  DISABLED: "disabled"
};

const CHARACTER = {
  LAQUO: "«",
  LSAQUO: "‹",
  RAQUO: "»",
  RSAQUO: "›"
};

define({
  apiBaseUrl: apiBaseUrl,
  SELECTORS: SELECTORS,
  CLASSNAME: CLASSNAME,
  CHARACTER: CHARACTER
});
