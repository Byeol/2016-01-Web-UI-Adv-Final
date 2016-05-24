"use strict";

define(["jquery"], ($) => class TodoStore {
  constructor() {
    this.cache = {};
    this.count = 15;
  }

  findAll(start, limit) {
    let cacheKey = JSON.stringify({ start: start, limit: limit });

    if (this.cache[cacheKey]) {
      console.info(`cache hit: ${cacheKey}`);
      return Promise.resolve(this.cache[cacheKey]);
    }

    let todos = [];
    limit = Math.min(limit, this.count - start);

    for (let i = 0; i < limit; i++) {
      todos.push({
        "id": start + i + 1,
        "todo": "할 일 " + (start + i + 1),
        "nickname": "mixed",
        "completed": 0,
        "date": "2014-06-25T05:38:12.000Z"
      });
    }

    this.cache[cacheKey] = todos;

    return Promise.resolve(todos);
  }

  getCount() {
    let count = {
      "cnt": this.count
    };

    return Promise.resolve(count);
  }
});
