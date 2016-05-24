"use strict";

define(['jquery', 'js/PageNavigation'], ($, PageNavigation) => {
  const PAGINATION_SELECTOR = ".pagination";
  const loadFixture = {
    beforeEach: () => fixture.load('/test/fixture.html'),
    afterEach: () => fixture.cleanup()
  };

  QUnit.module('PageNavigation', loadFixture);

  QUnit.test('change index with same value', assert => {
    // Given
    let pageNavigation = new PageNavigation(PAGINATION_SELECTOR, {
      index: 1,
      max: 5,
      limit: 5
    });
    let eventData = null;
    let eventFp = data => {
      eventData = data;
    };
    pageNavigation.on("move", eventFp);

    // When
    pageNavigation.index = 1;

    // Then
    assert.deepEqual(eventData, null, 'should not broadcast `move` event');
  });

  QUnit.test('change index', assert => {
    // Given
    let pageNavigation = new PageNavigation(PAGINATION_SELECTOR, {
      index: 1,
      max: 5,
      limit: 5
    });
    let eventData = null;
    let eventFp = data => {
      eventData = data;
    };
    pageNavigation.on("move", eventFp);

    // When
    pageNavigation.index = 2;

    // Then
    assert.deepEqual(eventData, {
      index: 2,
      max: 5
    }, 'should broadcast `move` event');
  });

  QUnit.test('prev page button', assert => {
    // Given
    let pageNavigation = new PageNavigation(PAGINATION_SELECTOR, {
      index: 3,
      max: 5,
      limit: 5
    });
    let eventData = null;
    let eventFp = data => {
      eventData = data;
    };
    pageNavigation.on("move", eventFp);

    // When
    $(PAGINATION_SELECTOR).find('li:first-child > a').click();

    // Then
    assert.deepEqual(eventData, {
      index: 2,
      max: 5
    }, 'should broadcast `move` event');
  });

  QUnit.test('next page button', assert => {
    // Given
    let pageNavigation = new PageNavigation(PAGINATION_SELECTOR, {
      index: 3,
      max: 5,
      limit: 5
    });
    let eventData = null;
    let eventFp = data => {
      eventData = data;
    };
    pageNavigation.on("move", eventFp);

    // When
    $(PAGINATION_SELECTOR).find('li:last-child > a').click();

    // Then
    assert.deepEqual(eventData, {
      index: 4,
      max: 5
    }, 'should broadcast `move` event');
  });

  QUnit.test('change page', assert => {
    // Given
    let pageNavigation = new PageNavigation(PAGINATION_SELECTOR, {
      index: 3,
      max: 5,
      limit: 5
    });
    let eventData = null;
    let eventFp = data => {
      eventData = data;
    };
    pageNavigation.on("move", eventFp);
    assert.ok($(PAGINATION_SELECTOR).find('li:contains(\'3\')').hasClass('selected'), 'page `3` should has `selected` class');

    // When
    $(PAGINATION_SELECTOR).find('li:contains(\'2\') > a').click();

    // Then
    assert.deepEqual(eventData, {
      index: 2,
      max: 5
    }, 'should broadcast `move` event');
    assert.ok($(PAGINATION_SELECTOR).find('li:contains(\'2\')').hasClass('selected'), 'page `2` should has `selected` class');
    assert.notOk($(PAGINATION_SELECTOR).find('li:contains(\'3\')').hasClass('selected'), 'page `3` should not has `selected` class');
  });

  QUnit.test('first page', assert => {
    // Given
    let pageNavigation = new PageNavigation(PAGINATION_SELECTOR, {
      index: 1,
      max: 5,
      limit: 5
    });
    let eventData = null;
    let eventFp = data => {
      eventData = data;
    };

    // When
    try {
      $(PAGINATION_SELECTOR).find('li:first-child > a').click();
    } catch (e) {
    }

    // Then
    assert.deepEqual(eventData, null, 'should not broadcast `move` event');
    assert.ok($(PAGINATION_SELECTOR).find('li:first-child').hasClass('disabled'), 'page `prev` should has `disabled` class');
    assert.notOk($(PAGINATION_SELECTOR).find('li:last-child').hasClass('disabled'), 'page `next` should not has `disabled` class');
  });

  QUnit.test('last page', assert => {
    // Given
    let pageNavigation = new PageNavigation(PAGINATION_SELECTOR, {
      index: 5,
      max: 5,
      limit: 5
    });
    let eventData = null;
    let eventFp = data => {
      eventData = data;
    };

    // When
    try {
      $(PAGINATION_SELECTOR).find('li:last-child > a').click();
    } catch (e) {
    }

    // Then
    assert.deepEqual(eventData, null, 'should not broadcast `move` event');
    assert.ok($(PAGINATION_SELECTOR).find('li:last-child').hasClass('disabled'), 'page `next` should has `disabled` class');
    assert.notOk($(PAGINATION_SELECTOR).find('li:first-child').hasClass('disabled'), 'page `prev` should not has `disabled` class');
  });

  QUnit.module('PageNavigation (advanced)', loadFixture);

  QUnit.test('change index', assert => {
    // Given
    let pageNavigation = new PageNavigation(PAGINATION_SELECTOR, {
      index: 1,
      max: 10,
      limit: 5
    });
    let eventData = null;
    let eventFp = data => {
      eventData = data;
    };
    pageNavigation.on("move", eventFp);

    // When
    pageNavigation.index = 6;

    // Then
    assert.deepEqual(eventData, {
      index: 6,
      max: 10
    }, 'should broadcast `move` event');
  });

  QUnit.test('jump to prev page button', assert => {
    // Given
    let pageNavigation = new PageNavigation(PAGINATION_SELECTOR, {
      index: 6,
      max: 10,
      limit: 5
    });
    let eventData = null;
    let eventFp = data => {
      eventData = data;
    };
    pageNavigation.on("move", eventFp);

    // When
    $(PAGINATION_SELECTOR).find('li:first-child > a').click();

    // Then
    assert.deepEqual(eventData, {
      index: 1,
      max: 10
    }, 'should broadcast `move` event');
  });

  QUnit.test('jump to next page button', assert => {
    // Given
    let pageNavigation = new PageNavigation(PAGINATION_SELECTOR, {
      index: 1,
      max: 10,
      limit: 5
    });
    let eventData = null;
    let eventFp = data => {
      eventData = data;
    };
    pageNavigation.on("move", eventFp);

    // When
    $(PAGINATION_SELECTOR).find('li:last-child > a').click();

    // Then
    assert.deepEqual(eventData, {
      index: 6,
      max: 10
    }, 'should broadcast `move` event');
  });

  QUnit.test('first page', assert => {
    // Given
    let pageNavigation = new PageNavigation(PAGINATION_SELECTOR, {
      index: 1,
      max: 10,
      limit: 5
    });
    let eventData = null;
    let eventFp = data => {
      eventData = data;
    };

    // When
    try {
      $(PAGINATION_SELECTOR).find('li:first-child > a').click();
    } catch (e) {
    }

    // Then
    assert.deepEqual(eventData, null, 'should not broadcast `move` event');
    assert.ok($(PAGINATION_SELECTOR).find('li:first-child').hasClass('disabled'), 'page `prev` should has `disabled` class');
    assert.notOk($(PAGINATION_SELECTOR).find('li:last-child').hasClass('disabled'), 'page `next` should not has `disabled` class');
  });

  QUnit.test('last page', assert => {
    // Given
    let pageNavigation = new PageNavigation(PAGINATION_SELECTOR, {
      index: 6,
      max: 10,
      limit: 5
    });
    let eventData = null;
    let eventFp = data => {
      eventData = data;
    };

    // When
    try {
      $(PAGINATION_SELECTOR).find('li:last-child > a').click();
    } catch (e) {
    }

    // Then
    assert.deepEqual(eventData, null, 'should not broadcast `move` event');
    assert.ok($(PAGINATION_SELECTOR).find('li:last-child').hasClass('disabled'), 'page `next` should has `disabled` class');
    assert.notOk($(PAGINATION_SELECTOR).find('li:first-child').hasClass('disabled'), 'page `prev` should not has `disabled` class');
  });
});
