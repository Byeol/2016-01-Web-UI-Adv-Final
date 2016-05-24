"use strict";

define(["jquery", "handlebars", "eventEmitter", "./common"], ($, Handlebars, EventEmitter, {CLASSNAME, CHARACTER}) => class PageNavigation {
  constructor(selector, {index, max, limit = 5}) {
    this.ee = new EventEmitter();
    this.$ele = $(selector);
    this._index = index;
    this._max = max;
    this._limit = limit;
    this._template = this.template;
    this._replaceDOM(1, max);
    this._updateDOM(index);
    this._init();
  }

  get template() {
    var limit = this._limit;
    Handlebars.registerHelper('pageFor', function (startIdx, endIdx, block) {
      var accum = '';
      endIdx > limit ? accum += block.fn('&laquo;') : null;
      accum += block.fn('&lsaquo;');
      for (var i = startIdx; i < Math.min(startIdx + limit, endIdx + 1); i += 1) {
        accum += block.fn(i);
      }
      accum += block.fn('&rsaquo;');
      endIdx > limit ? accum += block.fn('&raquo;') : null;
      return accum;
    });

    let itemTemplate = Handlebars.compile("<li><a href=\"#\">{{{this}}}</a></li>");
    Handlebars.registerPartial('pageItem', itemTemplate);

    return Handlebars.compile("{{#pageFor startIdx endIdx}}{{> pageItem}}{{/pageFor}}");
  }

  getPage(index) {
    return Math.ceil(index / this._limit);
  }

  get max() {
    return this._max;
  }

  set max(max) {
    max = Number(max);

    if (Number.isNaN(max)) {
      throw new Error("Max is NaN!");
    }

    if (max < 1) {
      throw new Error("Max is out of range!");
    }

    this._max = max;
  }

  get index() {
    return this._index;
  }

  set index(index) {
    index = Number(index);

    if (Number.isNaN(index)) {
      throw new Error("Index is NaN!");
    }

    if (index < 1 || index > this.max) {
      throw new Error("Index is out of range!");
    }

    if (this._index !== index) {
      if (this.getPage(this._index) !== this.getPage(index)) {
        this._replaceDOM((this.getPage(index) - 1) * this._limit + 1, this.max);
      }

      this._updateDOM(index, this.index);
      this._index = index;
      this._broadcast({
        "index": index,
        "max": this.max
      });
    }
  }

  _init() {
    this.$ele.on("click", "li > a", $.proxy(this, "_change"));
  }

  _change(event) {
    let index = $(event.target).text();

    switch (index) {
      case CHARACTER.LSAQUO:
        this.index -= 1;
        break;
      case CHARACTER.LAQUO:
        this.index -= this._limit;
        break;
      case CHARACTER.RSAQUO:
        this.index += 1;
        break;
      case CHARACTER.RAQUO:
        this.index += this._limit;
        break;
      default:
        this.index = index;
        break;
    }
  }

  _replaceDOM(startIdx, endIdx) {
    this.$ele.html(this._template({
      startIdx: startIdx,
      endIdx: endIdx
    }));
  }

  _updateDOM(index, prev) {
    if (prev !== undefined) {
      this._find(prev).removeClass(CLASSNAME.SELECTED);
      if (prev === 1) {
        this.$ele.find(`li:contains('${CHARACTER.LSAQUO}')`).removeClass(CLASSNAME.DISABLED);
      }
      if (prev === this.max) {
        this.$ele.find(`li:contains('${CHARACTER.RSAQUO}')`).removeClass(CLASSNAME.DISABLED);
      }
    }

    this._find(index).addClass(CLASSNAME.SELECTED);
    if (index === 1) {
      this.$ele.find(`li:contains('${CHARACTER.LSAQUO}')`).addClass(CLASSNAME.DISABLED);
    }
    if (index === this.max) {
      this.$ele.find(`li:contains('${CHARACTER.RSAQUO}')`).addClass(CLASSNAME.DISABLED);
    }

    if (this.getPage(index) === 1) {
      this.$ele.find(`li:contains('${CHARACTER.LAQUO}')`).addClass(CLASSNAME.DISABLED);
    }
    if (this.getPage(index) === this.getPage(this.max)) {
      this.$ele.find(`li:contains('${CHARACTER.RAQUO}')`).addClass(CLASSNAME.DISABLED);
    }
  }

  _find(index) {
    return this.$ele.find(`li:has(a:contains('${index}'))`);
  }

  _broadcast({index, max}) {
    this.ee.emit("move", {
      "index": index,
      "max": max
    });
  }

  on(eventName, fp) {
    this.ee.addListener(eventName, fp);
  }

  off(eventName, fp) {
    this.ee.removeListener(eventName, fp);
  }
});
