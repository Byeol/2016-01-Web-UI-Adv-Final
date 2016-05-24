"use strict";

define(["jquery", "./templates", "./PageNavigation"], ($, { todoListTemplate }, PageNavigation) => class TodoList {
  constructor(selector, nickname, store, {limit = 3}) {
    this.$ele = $(selector);
    this.nickname = nickname;
    this.store = store;
    this.limit = limit;
    this._init();
  }

  _init() {
    this.retrieve(0);
    this._navInit();
  }

  _navInit() {
    return this.store.getCount().then(response => {
      this.pageNavigation = new PageNavigation(".pagination", {
        index: 1,
        max: Math.ceil(response.cnt / this.limit)
      });
      this.pageNavigation.on("move", ({index, max}) =>
        this.retrieve((index - 1) * this.limit));
    });
  }

  retrieve(start) {
    return this.store.findAll(start, this.limit).then(response =>
      this.$ele.html(todoListTemplate({
        todo: response
      })));
  }
});
