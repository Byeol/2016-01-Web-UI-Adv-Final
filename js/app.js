"use strict";

const defaultNickname = "Byeol";

define(["./common", "./TodoList", "./TodoStore"], ({SELECTORS}, TodoList, TodoStore) => ({
  initialize: () => new TodoList(SELECTORS.TODO_LIST, defaultNickname, new TodoStore(), {})
}));
