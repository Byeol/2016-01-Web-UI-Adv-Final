"use strict";

define(["jquery", "common"], ($, {apiBaseUrl}) => class TodoStore {
  constructor(nickname) {
    this.baseUrl = `${apiBaseUrl}/${nickname}`;
    this.cache = {};
  }

  findAll(start, limit) {
    let cacheKey = JSON.stringify({ start: start, limit: limit });

    if (this.cache[cacheKey]) {
      console.info(`cache hit: ${cacheKey}`);
      return Promise.resolve(this.cache[cacheKey]);
    }

    let url = `${this.baseUrl}/page?start=${start}&limit=${limit}`;
    let promise = Promise.resolve($.get(url));

    promise.then(todos => {
      this.cache[cacheKey] = todos;
    });

    return promise;
  }

  getCount() {
    let url = `${this.baseUrl}/count`;
    let promise = Promise.resolve($.get(url));

    return promise;
  }
});
