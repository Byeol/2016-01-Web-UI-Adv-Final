"use strict";

define(["jquery", "handlebars", "./common"], ($, Handlebars, { SELECTORS }) => {
  registerPartial(SELECTORS.TODO_TEMPLATE, "todoItem");
  registerPartial(SELECTORS.TODO_LIST_TEMPLATE, "todoList");

  let todoItem = Handlebars.compile("{{> todoItem}}");
  let todoList = Handlebars.compile("{{> todoList}}");

  return {
    todoItemTemplate: todoItem,
    todoListTemplate: todoList
  };

  function registerPartial(selector, name) {
    let source = $(selector).html();
    let template = Handlebars.compile(source);
    Handlebars.registerPartial(name, template);
  }
});
