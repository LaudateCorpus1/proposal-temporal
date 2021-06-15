// Copyright (C) 2021 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
description: |
    This defines helper objects and functions for testing Temporal.
defines: [TemporalHelpers]
features: [Symbol.species, Symbol.iterator, Temporal]
---*/

var TemporalHelpers = {
  /*
   * assertDuration(duration, years, ...,  nanoseconds[, description]):
   *
   * Shorthand for asserting that each field of a Temporal.Duration is equal to
   * an expected value.
   */
  assertDuration(duration, years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds, description = "") {
    assert(duration instanceof Temporal.Duration, `${description} instanceof`);
    assert.sameValue(duration.years, years, `${description} years result`);
    assert.sameValue(duration.months, months, `${description} months result`);
    assert.sameValue(duration.weeks, weeks, `${description} weeks result`);
    assert.sameValue(duration.days, days, `${description} days result`);
    assert.sameValue(duration.hours, hours, `${description} hours result`);
    assert.sameValue(duration.minutes, minutes, `${description} minutes result`);
    assert.sameValue(duration.seconds, seconds, `${description} seconds result`);
    assert.sameValue(duration.milliseconds, milliseconds, `${description} milliseconds result`);
    assert.sameValue(duration.microseconds, microseconds, `${description} microseconds result`);
    assert.sameValue(duration.nanoseconds, nanoseconds, `${description} nanoseconds result`);
  },

  /*
   * assertPlainDate(date, year, ..., nanosecond[, description[, era, eraYear]]):
   *
   * Shorthand for asserting that each field of a Temporal.PlainDate is equal to
   * an expected value. (Except the `calendar` property, since callers may want
   * to assert either object equality with an object they put in there, or the
   * result of date.calendar.toString().)
   */
  assertPlainDate(date, year, month, monthCode, day, description = "", era = undefined, eraYear = undefined) {
    assert(date instanceof Temporal.PlainDate, `${description} instanceof`);
    assert.sameValue(date.era, era, `${description} era result`);
    assert.sameValue(date.eraYear, eraYear, `${description} eraYear result`);
    assert.sameValue(date.year, year, `${description} year result`);
    assert.sameValue(date.month, month, `${description} month result`);
    assert.sameValue(date.monthCode, monthCode, `${description} monthCode result`);
    assert.sameValue(date.day, day, `${description} day result`);
  },

  /*
   * assertPlainDateTime(datetime, year, ..., nanosecond[, description[, era, eraYear]]):
   *
   * Shorthand for asserting that each field of a Temporal.PlainDateTime is
   * equal to an expected value. (Except the `calendar` property, since callers
   * may want to assert either object equality with an object they put in there,
   * or the result of datetime.calendar.toString().)
   */
  assertPlainDateTime(datetime, year, month, monthCode, day, hour, minute, second, millisecond, microsecond, nanosecond, description = "", era = undefined, eraYear = undefined) {
    assert(datetime instanceof Temporal.PlainDateTime, `${description} instanceof`);
    assert.sameValue(datetime.era, era, `${description} era result`);
    assert.sameValue(datetime.eraYear, eraYear, `${description} eraYear result`);
    assert.sameValue(datetime.year, year, `${description} year result`);
    assert.sameValue(datetime.month, month, `${description} month result`);
    assert.sameValue(datetime.monthCode, monthCode, `${description} monthCode result`);
    assert.sameValue(datetime.day, day, `${description} day result`);
    assert.sameValue(datetime.hour, hour, `${description} hour result`);
    assert.sameValue(datetime.minute, minute, `${description} minute result`);
    assert.sameValue(datetime.second, second, `${description} second result`);
    assert.sameValue(datetime.millisecond, millisecond, `${description} millisecond result`);
    assert.sameValue(datetime.microsecond, microsecond, `${description} microsecond result`);
    assert.sameValue(datetime.nanosecond, nanosecond, `${description} nanosecond result`);
  },

  /*
   * assertPlainMonthDay(monthDay, monthCode, day[, description]):
   *
   * Shorthand for asserting that each field of a Temporal.PlainMonthDay is
   * equal to an expected value. (Except the `calendar` property, since callers
   * may want to assert either object equality with an object they put in there,
   * or the result of monthDay.calendar.toString().)
   */
  assertPlainMonthDay(monthDay, monthCode, day, description = "") {
    assert(monthDay instanceof Temporal.PlainMonthDay, `${description} instanceof`);
    assert.sameValue(monthDay.monthCode, monthCode, `${description} monthCode result`);
    assert.sameValue(monthDay.day, day, `${description} day result`);
  },

  /*
   * assertPlainTime(time, hour, ..., nanosecond[, description]):
   *
   * Shorthand for asserting that each field of a Temporal.PlainTime is equal to
   * an expected value.
   */
  assertPlainTime(time, hour, minute, second, millisecond, microsecond, nanosecond, description = "") {
    assert(time instanceof Temporal.PlainTime, `${description} instanceof`);
    assert.sameValue(time.hour, hour, `${description} hour result`);
    assert.sameValue(time.minute, minute, `${description} minute result`);
    assert.sameValue(time.second, second, `${description} second result`);
    assert.sameValue(time.millisecond, millisecond, `${description} millisecond result`);
    assert.sameValue(time.microsecond, microsecond, `${description} microsecond result`);
    assert.sameValue(time.nanosecond, nanosecond, `${description} nanosecond result`);
  },

  /*
   * assertPlainYearMonth(yearMonth, year, month, monthCode[, description[, era, eraYear]]):
   *
   * Shorthand for asserting that each field of a Temporal.PlainYearMonth is
   * equal to an expected value. (Except the `calendar` property, since callers
   * may want to assert either object equality with an object they put in there,
   * or the result of yearMonth.calendar.toString().)
   */
  assertPlainYearMonth(yearMonth, year, month, monthCode, description = "", era = undefined, eraYear = undefined) {
    assert(yearMonth instanceof Temporal.PlainYearMonth, `${description} instanceof`);
    assert.sameValue(yearMonth.era, era, `${description} era result`);
    assert.sameValue(yearMonth.eraYear, eraYear, `${description} eraYear result`);
    assert.sameValue(yearMonth.year, year, `${description} year result`);
    assert.sameValue(yearMonth.month, month, `${description} month result`);
    assert.sameValue(yearMonth.monthCode, monthCode, `${description} monthCode result`);
  },

  /*
   * checkCalendarDateUntilLargestUnitSingular(func, expectedLargestUnitCalls):
   *
   * When an options object with a largestUnit property is synthesized inside
   * Temporal and passed to user code such as calendar.dateUntil(), the value of
   * the largestUnit property should be in the singular form, even if the input
   * was given in the plural form.
   * (This doesn't apply when the options object is passed through verbatim.)
   *
   * func(calendar, largestUnit, index) is the operation under test. It's called
   * with an instance of a calendar that keeps track of which largestUnit is
   * passed to dateUntil(), each key of expectedLargestUnitCalls in turn, and
   * the key's numerical index in case the function needs to generate test data
   * based on the index. At the end, the actual values passed to dateUntil() are
   * compared with the array values of expectedLargestUnitCalls.
   */
  checkCalendarDateUntilLargestUnitSingular(func, expectedLargestUnitCalls) {
    const actual = [];

    class DateUntilOptionsCalendar extends Temporal.Calendar {
      constructor() {
        super("iso8601");
      }

      dateUntil(earlier, later, options) {
        actual.push(options.largestUnit);
        return super.dateUntil(earlier, later, options);
      }

      toString() {
        return "date-until-options";
      }
    }

    const calendar = new DateUntilOptionsCalendar();
    Object.entries(expectedLargestUnitCalls).forEach(([largestUnit, expected], index) => {
      func(calendar, largestUnit, index);
      assert.compareArray(actual, expected, `largestUnit passed to calendar.dateUntil() for largestUnit ${largestUnit}`);
      actual.splice(0, actual.length); // empty it for the next check
    });
  },

  /*
   * checkFractionalSecondDigitsOptionWrongType(temporalObject):
   *
   * Checks the string-or-number type handling of the fractionalSecondDigits
   * option to the various types' toString() methods. temporalObject is an
   * instance of the Temporal type under test.
   */
  checkFractionalSecondDigitsOptionWrongType(temporalObject) {
    // null is not a number, and converts to the string "null", which is an invalid string value
    assert.throws(RangeError, () => temporalObject.toString({ fractionalSecondDigits: null }), "null");
    // Booleans are not numbers, and convert to the strings "true" or "false", which are invalid
    assert.throws(RangeError, () => temporalObject.toString({ fractionalSecondDigits: true }), "true");
    assert.throws(RangeError, () => temporalObject.toString({ fractionalSecondDigits: false }), "false");
    // Symbols are not numbers and cannot convert to strings
    assert.throws(TypeError, () => temporalObject.toString({ fractionalSecondDigits: Symbol() }), "symbol");
    // BigInts are not numbers and convert to strings which are invalid
    assert.throws(RangeError, () => temporalObject.toString({ fractionalSecondDigits: 2n }), "bigint");

    // Objects are not numbers and prefer their toString() methods when converting to a string
    assert.throws(RangeError, () => temporalObject.toString({ fractionalSecondDigits: {} }), "plain object");

    const toStringExpected = temporalObject.toString({ fractionalSecondDigits: 'auto' });
    const expected = [
      "get fractionalSecondDigits.toString",
      "call fractionalSecondDigits.toString",
    ];
    const actual = [];
    const observer = TemporalHelpers.toPrimitiveObserver(actual, "auto", "fractionalSecondDigits");
    const result = temporalObject.toString({ fractionalSecondDigits: observer });
    assert.sameValue(result, toStringExpected, "object with toString");
    assert.compareArray(actual, expected, "order of operations");
  },

  /*
   * checkPlainDateTimeConversionFastPath(func):
   *
   * ToTemporalDate and ToTemporalTime should both, if given a
   * Temporal.PlainDateTime instance, convert to the desired type by reading the
   * PlainDateTime's internal slots, rather than calling any getters.
   *
   * func(datetime, calendar) is the actual operation to test, that must
   * internally call the abstract operation ToTemporalDate or ToTemporalTime.
   * It is passed a Temporal.PlainDateTime instance, as well as the instance's
   * calendar object (so that it doesn't have to call the calendar getter itself
   * if it wants to make any assertions about the calendar.)
   */
  checkPlainDateTimeConversionFastPath(func) {
    const actual = [];
    const expected = [];

    const calendar = new Temporal.Calendar("iso8601");
    const datetime = new Temporal.PlainDateTime(2000, 5, 2, 12, 34, 56, 987, 654, 321, calendar);
    const prototypeDescrs = Object.getOwnPropertyDescriptors(Temporal.PlainDateTime.prototype);
    ["year", "month", "monthCode", "day", "hour", "minute", "second", "millisecond", "microsecond", "nanosecond"].forEach((property) => {
      Object.defineProperty(datetime, property, {
        get() {
          actual.push(`get ${property}`);
          const value = prototypeDescrs[property].get.call(this);
          return {
            toString() {
              actual.push(`toString ${property}`);
              return value.toString();
            },
            valueOf() {
              actual.push(`valueOf ${property}`);
              return value;
            },
          };
        },
      });
    });
    Object.defineProperty(datetime, "calendar", {
      get() {
        actual.push("get calendar");
        return calendar;
      },
    });

    func(datetime, calendar);
    assert.compareArray(actual, expected, "property getters not called");
  },

  /*
   * Check that an options bag that accepts units written in the singular form,
   * also accepts the same units written in the plural form.
   * func(unit) should call the method with the appropriate options bag
   * containing unit as a value. This will be called twice for each element of
   * validSingularUnits, once with singular and once with plural, and the
   * results of each pair should be the same (whether a Temporal object or a
   * primitive value.)
   */
  checkPluralUnitsAccepted(func, validSingularUnits) {
    const plurals = {
      year: 'years',
      month: 'months',
      week: 'weeks',
      day: 'days',
      hour: 'hours',
      minute: 'minutes',
      second: 'seconds',
      millisecond: 'milliseconds',
      microsecond: 'microseconds',
      nanosecond: 'nanoseconds',
    };

    validSingularUnits.forEach((unit) => {
      const singularValue = func(unit);
      const pluralValue = func(plurals[unit]);
      if (singularValue instanceof Temporal.Duration) {
        assert.sameValue(pluralValue.years, singularValue.years, "years value");
        assert.sameValue(pluralValue.months, singularValue.months, "months value");
        assert.sameValue(pluralValue.weeks, singularValue.weeks, "weeks value");
        assert.sameValue(pluralValue.days, singularValue.days, "days value");
        assert.sameValue(pluralValue.hours, singularValue.hours, "hours value");
        assert.sameValue(pluralValue.minutes, singularValue.minutes, "minutes value");
        assert.sameValue(pluralValue.seconds, singularValue.seconds, "seconds value");
        assert.sameValue(pluralValue.milliseconds, singularValue.milliseconds, "milliseconds value");
        assert.sameValue(pluralValue.microseconds, singularValue.microseconds, "microseconds value");
        assert.sameValue(pluralValue.nanoseconds, singularValue.nanoseconds, "nanoseconds value");
      } else if (
        singularValue instanceof Temporal.Instant ||
        singularValue instanceof Temporal.PlainDateTime ||
        singularValue instanceof Temporal.PlainTime ||
        singularValue instanceof Temporal.ZonedDateTime
      ) {
        assert(pluralValue.equals(singularValue), "Temporal objects equal");
      } else {
        assert.sameValue(pluralValue, singularValue);
      }
    });
  },

  /*
   * checkRoundingIncrementOptionWrongType(checkFunc, assertTrueResultFunc, assertObjectResultFunc):
   *
   * Checks the type handling of the roundingIncrement option.
   * checkFunc(roundingIncrement) is a function which takes the value of
   * roundingIncrement to test, and calls the method under test with it,
   * returning the result. assertTrueResultFunc(result, description) should
   * assert that result is the expected result with roundingIncrement: true, and
   * assertObjectResultFunc(result, description) should assert that result is
   * the expected result with roundingIncrement being an object with a valueOf()
   * method.
   */
  checkRoundingIncrementOptionWrongType(checkFunc, assertTrueResultFunc, assertObjectResultFunc) {
    // null converts to 0, which is out of range
    assert.throws(RangeError, () => checkFunc(null), "null");
    // Booleans convert to either 0 or 1, and 1 is allowed
    const trueResult = checkFunc(true);
    assertTrueResultFunc(trueResult, "true");
    assert.throws(RangeError, () => checkFunc(false), "false");
    // Symbols and BigInts cannot convert to numbers
    assert.throws(TypeError, () => checkFunc(Symbol()), "symbol");
    assert.throws(TypeError, () => checkFunc(2n), "bigint");

    // Objects prefer their valueOf() methods when converting to a number
    assert.throws(RangeError, () => checkFunc({}), "plain object");

    const expected = [
      "get roundingIncrement.valueOf",
      "call roundingIncrement.valueOf",
    ];
    const actual = [];
    const observer = TemporalHelpers.toPrimitiveObserver(actual, 2, "roundingIncrement");
    const objectResult = checkFunc(observer);
    assertObjectResultFunc(objectResult, "object with valueOf");
    assert.compareArray(actual, expected, "order of operations");
  },

  /*
   * checkStringOptionWrongType(propertyName, value, checkFunc, assertFunc):
   *
   * Checks the type handling of a string option, of which there are several in
   * Temporal.
   * propertyName is the name of the option, and value is the value that
   * assertFunc should expect it to have.
   * checkFunc(value) is a function which takes the value of the option to test,
   * and calls the method under test with it, returning the result.
   * assertFunc(result, description) should assert that result is the expected
   * result with the option value being an object with a toString() method
   * which returns the given value.
   */
  checkStringOptionWrongType(propertyName, value, checkFunc, assertFunc) {
    // null converts to the string "null", which is an invalid string value
    assert.throws(RangeError, () => checkFunc(null), "null");
    // Booleans convert to the strings "true" or "false", which are invalid
    assert.throws(RangeError, () => checkFunc(true), "true");
    assert.throws(RangeError, () => checkFunc(false), "false");
    // Symbols cannot convert to strings
    assert.throws(TypeError, () => checkFunc(Symbol()), "symbol");
    // Numbers convert to strings which are invalid
    assert.throws(RangeError, () => checkFunc(2), "number");
    // BigInts convert to strings which are invalid
    assert.throws(RangeError, () => checkFunc(2n), "bigint");

    // Objects prefer their toString() methods when converting to a string
    assert.throws(RangeError, () => checkFunc({}), "plain object");

    const expected = [
      `get ${propertyName}.toString`,
      `call ${propertyName}.toString`,
    ];
    const actual = [];
    const observer = TemporalHelpers.toPrimitiveObserver(actual, value, propertyName);
    const result = checkFunc(observer);
    assertFunc(result, "object with toString");
    assert.compareArray(actual, expected, "order of operations");
  },

  /*
   * checkSubclassingIgnored(construct, constructArgs, method, methodArgs,
   *   resultAssertions):
   *
   * Methods of Temporal classes that return a new instance of the same class,
   * must not take the constructor of a subclass into account, nor the @@species
   * property. This helper runs tests to ensure this.
   *
   * construct(...constructArgs) must yield a valid instance of the Temporal
   * class. instance[method](...methodArgs) is the method call under test, which
   * must also yield a valid instance of the same Temporal class, not a
   * subclass. See below for the individual tests that this runs.
   * resultAssertions() is a function that performs additional assertions on the
   * instance returned by the method under test.
   */
  checkSubclassingIgnored(...args) {
    this.checkSubclassConstructorNotObject(...args);
    this.checkSubclassConstructorUndefined(...args);
    this.checkSubclassConstructorThrows(...args);
    this.checkSubclassConstructorNotCalled(...args);
    this.checkSubclassSpeciesInvalidResult(...args);
    this.checkSubclassSpeciesNotAConstructor(...args);
    this.checkSubclassSpeciesNull(...args);
    this.checkSubclassSpeciesUndefined(...args);
    this.checkSubclassSpeciesThrows(...args);
  },

  /*
   * Checks that replacing the 'constructor' property of the instance with
   * various primitive values does not affect the returned new instance.
   */
  checkSubclassConstructorNotObject(construct, constructArgs, method, methodArgs, resultAssertions) {
    function check(value, description) {
      const instance = new construct(...constructArgs);
      instance.constructor = value;
      const result = instance[method](...methodArgs);
      assert.sameValue(Object.getPrototypeOf(result), construct.prototype, description);
      resultAssertions(result);
    }

    check(null, "null");
    check(true, "true");
    check("test", "string");
    check(Symbol(), "Symbol");
    check(7, "number");
    check(7n, "bigint");
  },

  /*
   * Checks that replacing the 'constructor' property of the subclass with
   * undefined does not affect the returned new instance.
   */
  checkSubclassConstructorUndefined(construct, constructArgs, method, methodArgs, resultAssertions) {
    let called = 0;

    class MySubclass extends construct {
      constructor() {
        ++called;
        super(...constructArgs);
      }
    }

    const instance = new MySubclass();
    assert.sameValue(called, 1);

    MySubclass.prototype.constructor = undefined;

    const result = instance[method](...methodArgs);
    assert.sameValue(called, 1);
    assert.sameValue(Object.getPrototypeOf(result), construct.prototype);
    resultAssertions(result);
  },

  /*
   * Checks that making the 'constructor' property of the instance throw when
   * called does not affect the returned new instance.
   */
  checkSubclassConstructorThrows(construct, constructArgs, method, methodArgs, resultAssertions) {
    function CustomError() {}
    const instance = new construct(...constructArgs);
    Object.defineProperty(instance, "constructor", {
      get() {
        throw new CustomError();
      }
    });
    const result = instance[method](...methodArgs);
    assert.sameValue(Object.getPrototypeOf(result), construct.prototype);
    resultAssertions(result);
  },

  /*
   * Checks that when subclassing, the subclass constructor is not called by
   * the method under test.
   */
  checkSubclassConstructorNotCalled(construct, constructArgs, method, methodArgs, resultAssertions) {
    let called = 0;

    class MySubclass extends construct {
      constructor() {
        ++called;
        super(...constructArgs);
      }
    }

    const instance = new MySubclass();
    assert.sameValue(called, 1);

    const result = instance[method](...methodArgs);
    assert.sameValue(called, 1);
    assert.sameValue(Object.getPrototypeOf(result), construct.prototype);
    resultAssertions(result);
  },

  /*
   * Check that the constructor's @@species property is ignored when it's a
   * constructor that returns a non-object value.
   */
  checkSubclassSpeciesInvalidResult(construct, constructArgs, method, methodArgs, resultAssertions) {
    function check(value, description) {
      const instance = new construct(...constructArgs);
      instance.constructor = {
        [Symbol.species]: function() {
          return value;
        },
      };
      const result = instance[method](...methodArgs);
      assert.sameValue(Object.getPrototypeOf(result), construct.prototype, description);
      resultAssertions(result);
    }

    check(undefined, "undefined");
    check(null, "null");
    check(true, "true");
    check("test", "string");
    check(Symbol(), "Symbol");
    check(7, "number");
    check(7n, "bigint");
    check({}, "plain object");
  },

  /*
   * Check that the constructor's @@species property is ignored when it's not a
   * constructor.
   */
  checkSubclassSpeciesNotAConstructor(construct, constructArgs, method, methodArgs, resultAssertions) {
    function check(value, description) {
      const instance = new construct(...constructArgs);
      instance.constructor = {
        [Symbol.species]: value,
      };
      const result = instance[method](...methodArgs);
      assert.sameValue(Object.getPrototypeOf(result), construct.prototype, description);
      resultAssertions(result);
    }

    check(true, "true");
    check("test", "string");
    check(Symbol(), "Symbol");
    check(7, "number");
    check(7n, "bigint");
    check({}, "plain object");
  },

  /*
   * Check that the constructor's @@species property is ignored when it's null.
   */
  checkSubclassSpeciesNull(construct, constructArgs, method, methodArgs, resultAssertions) {
    let called = 0;

    class MySubclass extends construct {
      constructor() {
        ++called;
        super(...constructArgs);
      }
    }

    const instance = new MySubclass();
    assert.sameValue(called, 1);

    MySubclass.prototype.constructor = {
      [Symbol.species]: null,
    };

    const result = instance[method](...methodArgs);
    assert.sameValue(called, 1);
    assert.sameValue(Object.getPrototypeOf(result), construct.prototype);
    resultAssertions(result);
  },

  /*
   * Check that the constructor's @@species property is ignored when it's
   * undefined.
   */
  checkSubclassSpeciesUndefined(construct, constructArgs, method, methodArgs, resultAssertions) {
    let called = 0;

    class MySubclass extends construct {
      constructor() {
        ++called;
        super(...constructArgs);
      }
    }

    const instance = new MySubclass();
    assert.sameValue(called, 1);

    MySubclass.prototype.constructor = {
      [Symbol.species]: undefined,
    };

    const result = instance[method](...methodArgs);
    assert.sameValue(called, 1);
    assert.sameValue(Object.getPrototypeOf(result), construct.prototype);
    resultAssertions(result);
  },

  /*
   * Check that the constructor's @@species property is ignored when it throws,
   * i.e. it is not called at all.
   */
  checkSubclassSpeciesThrows(construct, constructArgs, method, methodArgs, resultAssertions) {
    function CustomError() {}

    const instance = new construct(...constructArgs);
    instance.constructor = {
      get [Symbol.species]() {
        throw new CustomError();
      },
    };

    const result = instance[method](...methodArgs);
    assert.sameValue(Object.getPrototypeOf(result), construct.prototype);
  },

  /*
   * checkSubclassingIgnoredStatic(construct, method, methodArgs, resultAssertions):
   *
   * Static methods of Temporal classes that return a new instance of the class,
   * must not use the this-value as a constructor. This helper runs tests to
   * ensure this.
   *
   * construct[method](...methodArgs) is the static method call under test, and
   * must yield a valid instance of the Temporal class, not a subclass. See
   * below for the individual tests that this runs.
   * resultAssertions() is a function that performs additional assertions on the
   * instance returned by the method under test.
   */
  checkSubclassingIgnoredStatic(...args) {
    this.checkStaticInvalidReceiver(...args);
    this.checkStaticReceiverNotCalled(...args);
    this.checkThisValueNotCalled(...args);
  },

  /*
   * Check that calling the static method with a receiver that's not callable,
   * still calls the intrinsic constructor.
   */
  checkStaticInvalidReceiver(construct, method, methodArgs, resultAssertions) {
    function check(value, description) {
      const result = construct[method].apply(value, methodArgs);
      assert.sameValue(Object.getPrototypeOf(result), construct.prototype);
      resultAssertions(result);
    }

    check(undefined, "undefined");
    check(null, "null");
    check(true, "true");
    check("test", "string");
    check(Symbol(), "symbol");
    check(7, "number");
    check(7n, "bigint");
    check({}, "Non-callable object");
  },

  /*
   * Check that calling the static method with a receiver that returns a value
   * that's not callable, still calls the intrinsic constructor.
   */
  checkStaticReceiverNotCalled(construct, method, methodArgs, resultAssertions) {
    function check(value, description) {
      const receiver = function () {
        return value;
      };
      const result = construct[method].apply(receiver, methodArgs);
      assert.sameValue(Object.getPrototypeOf(result), construct.prototype);
      resultAssertions(result);
    }

    check(undefined, "undefined");
    check(null, "null");
    check(true, "true");
    check("test", "string");
    check(Symbol(), "symbol");
    check(7, "number");
    check(7n, "bigint");
    check({}, "Non-callable object");
  },

  /*
   * Check that the receiver isn't called.
   */
  checkThisValueNotCalled(construct, method, methodArgs, resultAssertions) {
    let called = false;

    class MySubclass extends construct {
      constructor(...args) {
        called = true;
        super(...args);
      }
    }

    const result = MySubclass[method](...methodArgs);
    assert.sameValue(called, false);
    assert.sameValue(Object.getPrototypeOf(result), construct.prototype);
    resultAssertions(result);
  },

  /*
   * Check that any iterable returned from a custom time zone's
   * getPossibleInstantsFor() method is exhausted.
   * The custom time zone object is passed in to func().
   * expected is an array of strings representing the expected calls to the
   * getPossibleInstantsFor() method. The PlainDateTimes that it is called with,
   * are compared (using their toString() results) with the array.
   */
  checkTimeZonePossibleInstantsIterable(func, expected) {
    // A custom time zone that returns an iterable instead of an array from its
    // getPossibleInstantsFor() method, and for testing purposes skips
    // 00:00-01:00 UTC on January 1, 2030, and repeats 00:00-01:00 UTC+1 on
    // January 3, 2030. Otherwise identical to the UTC time zone.
    class TimeZonePossibleInstantsIterable extends Temporal.TimeZone {
      constructor() {
        super("UTC");
        this.getPossibleInstantsForCallCount = 0;
        this.getPossibleInstantsForCalledWith = [];
        this.getPossibleInstantsForReturns = [];
        this.iteratorExhausted = [];
      }

      toString() {
        return "Custom/Iterable";
      }

      getOffsetNanosecondsFor(instant) {
        if (Temporal.Instant.compare(instant, "2030-01-01T00:00Z") >= 0 &&
          Temporal.Instant.compare(instant, "2030-01-03T01:00Z") < 0) {
          return 3600_000_000_000;
        } else {
          return 0;
        }
      }

      getPossibleInstantsFor(dateTime) {
        this.getPossibleInstantsForCallCount++;
        this.getPossibleInstantsForCalledWith.push(dateTime);

        // Fake DST transition
        let retval = super.getPossibleInstantsFor(dateTime);
        if (dateTime.toPlainDate().equals("2030-01-01") && dateTime.hour === 0) {
          retval = [];
        } else if (dateTime.toPlainDate().equals("2030-01-03") && dateTime.hour === 0) {
          retval.push(retval[0].subtract({ hours: 1 }));
        } else if (dateTime.year === 2030 && dateTime.month === 1 && dateTime.day >= 1 && dateTime.day <= 2) {
          retval[0] = retval[0].subtract({ hours: 1 });
        }

        this.getPossibleInstantsForReturns.push(retval);
        this.iteratorExhausted.push(false);
        return {
          callIndex: this.getPossibleInstantsForCallCount - 1,
          timeZone: this,
          *[Symbol.iterator]() {
            yield* this.timeZone.getPossibleInstantsForReturns[this.callIndex];
            this.timeZone.iteratorExhausted[this.callIndex] = true;
          },
        };
      }
    }

    const timeZone = new TimeZonePossibleInstantsIterable();
    func(timeZone);

    assert.sameValue(timeZone.getPossibleInstantsForCallCount, expected.length, "getPossibleInstantsFor() method called correct number of times");

    for (let index = 0; index < expected.length; index++) {
      assert.sameValue(timeZone.getPossibleInstantsForCalledWith[index].toString(), expected[index], "getPossibleInstantsFor() called with expected PlainDateTime");
      assert(timeZone.iteratorExhausted[index], "iterated through the whole iterable");
    }
  },

  /*
   * Check that any calendar-carrying Temporal object has its [[Calendar]]
   * internal slot read by ToTemporalCalendar, and does not fetch the calendar
   * by calling getters.
   * The custom calendar object is passed in to func() so that it can do its
   * own additional assertions involving the calendar if necessary. (Sometimes
   * there is nothing to assert as the calendar isn't stored anywhere that can
   * be asserted about.)
   */
  checkToTemporalCalendarFastPath(func) {
    class CalendarFastPathCheck extends Temporal.Calendar {
      constructor() {
        super("iso8601");
      }

      toString() {
        return "fast-path-check";
      }
    }
    const calendar = new CalendarFastPathCheck();

    const plainDate = new Temporal.PlainDate(2000, 5, 2, calendar);
    const plainDateTime = new Temporal.PlainDateTime(2000, 5, 2, 12, 34, 56, 987, 654, 321, calendar);
    const plainMonthDay = new Temporal.PlainMonthDay(5, 2, calendar);
    const plainYearMonth = new Temporal.PlainYearMonth(2000, 5, calendar);
    const zonedDateTime = new Temporal.ZonedDateTime(1_000_000_000_000_000_000n, "UTC", calendar);

    [plainDate, plainDateTime, plainMonthDay, plainYearMonth, zonedDateTime].forEach((temporalObject) => {
      const actual = [];
      const expected = [];

      Object.defineProperty(temporalObject, "calendar", {
        get() {
          actual.push("get calendar");
          return calendar;
        },
      });

      func(temporalObject, calendar);
      assert.compareArray(actual, expected, "calendar getter not called");
    });
  },

  checkToTemporalInstantFastPath(func) {
    const actual = [];
    const expected = [];

    const datetime = new Temporal.ZonedDateTime(1_000_000_000_987_654_321n, "UTC");
    Object.defineProperty(datetime, 'toString', {
      get() {
        actual.push("get toString");
        return function (options) {
          actual.push("call toString");
          return Temporal.ZonedDateTime.prototype.toString.call(this, options);
        };
      },
    });

    func(datetime);
    assert.compareArray(actual, expected, "toString not called");
  },

  checkToTemporalPlainDateTimeFastPath(func) {
    const actual = [];
    const expected = [];

    const calendar = new Temporal.Calendar("iso8601");
    const date = new Temporal.PlainDate(2000, 5, 2, calendar);
    const prototypeDescrs = Object.getOwnPropertyDescriptors(Temporal.PlainDate.prototype);
    ["year", "month", "monthCode", "day"].forEach((property) => {
      Object.defineProperty(date, property, {
        get() {
          actual.push(`get ${property}`);
          const value = prototypeDescrs[property].get.call(this);
          return TemporalHelpers.toPrimitiveObserver(actual, value, property);
        },
      });
    });
    ["hour", "minute", "second", "millisecond", "microsecond", "nanosecond"].forEach((property) => {
      Object.defineProperty(date, property, {
        get() {
          actual.push(`get ${property}`);
          return undefined;
        },
      });
    });
    Object.defineProperty(date, "calendar", {
      get() {
        actual.push("get calendar");
        return calendar;
      },
    });

    func(date, calendar);
    assert.compareArray(actual, expected, "property getters not called");
  },

  /*
   * A custom calendar that returns an iterable instead of an array from its
   * fields() method, otherwise identical to the ISO calendar.
   */
  calendarFieldsIterable() {
    class CalendarFieldsIterable extends Temporal.Calendar {
      constructor() {
        super("iso8601");
        this.fieldsCallCount = 0;
        this.fieldsCalledWith = [];
        this.iteratorExhausted = [];
      }

      toString() {
        return "fields-iterable";
      }

      fields(fieldNames) {
        this.fieldsCallCount++;
        this.fieldsCalledWith.push(fieldNames.slice());
        this.iteratorExhausted.push(false);
        return {
          callIndex: this.fieldsCallCount - 1,
          calendar: this,
          *[Symbol.iterator]() {
            yield* this.calendar.fieldsCalledWith[this.callIndex];
            this.calendar.iteratorExhausted[this.callIndex] = true;
          },
        };
      }
    }
    return new CalendarFieldsIterable();
  },

  /*
   * A custom calendar that modifies the fields object passed in to
   * dateFromFields, sabotaging its time properties.
   */
  calendarMakeInfinityTime() {
    class CalendarMakeInfinityTime extends Temporal.Calendar {
      constructor() {
        super("iso8601");
      }

      dateFromFields(fields, options) {
        const retval = super.dateFromFields(fields, options);
        fields.hour = Infinity;
        fields.minute = Infinity;
        fields.second = Infinity;
        fields.millisecond = Infinity;
        fields.microsecond = Infinity;
        fields.nanosecond = Infinity;
        return retval;
      }
    }
    return new CalendarMakeInfinityTime();
  },

  /*
   * A custom calendar that defines getters on the fields object passed into
   * dateFromFields that throw, sabotaging its time properties.
   */
  calendarMakeInvalidGettersTime() {
    class CalendarMakeInvalidGettersTime extends Temporal.Calendar {
      constructor() {
        super("iso8601");
      }

      dateFromFields(fields, options) {
        const retval = super.dateFromFields(fields, options);
        const throwingDescriptor = {
          get() {
            throw new Test262Error("reading a sabotaged time field");
          },
        };
        Object.defineProperties(fields, {
          hour: throwingDescriptor,
          minute: throwingDescriptor,
          second: throwingDescriptor,
          millisecond: throwingDescriptor,
          microsecond: throwingDescriptor,
          nanosecond: throwingDescriptor,
        });
        return retval;
      }
    }
    return new CalendarMakeInvalidGettersTime();
  },

  /*
   * A custom calendar whose mergeFields() method returns a proxy object with
   * all of its Get and HasProperty operations observable, as well as adding a
   * "shouldNotBeCopied": true property.
   */
  calendarMergeFieldsGetters() {
    class CalendarMergeFieldsGetters extends Temporal.Calendar {
      constructor() {
        super("iso8601");
        this.mergeFieldsReturnOperations = [];
      }

      toString() {
        return "merge-fields-getters";
      }

      dateFromFields(fields, options) {
        assert.sameValue(fields.shouldNotBeCopied, undefined, "extra fields should not be copied");
        return super.dateFromFields(fields, options);
      }

      yearMonthFromFields(fields, options) {
        assert.sameValue(fields.shouldNotBeCopied, undefined, "extra fields should not be copied");
        return super.yearMonthFromFields(fields, options);
      }

      monthDayFromFields(fields, options) {
        assert.sameValue(fields.shouldNotBeCopied, undefined, "extra fields should not be copied");
        return super.monthDayFromFields(fields, options);
      }

      mergeFields(fields, additionalFields) {
        const retval = super.mergeFields(fields, additionalFields);
        retval._calendar = this;
        retval.shouldNotBeCopied = true;
        return new Proxy(retval, {
          get(target, key) {
            target._calendar.mergeFieldsReturnOperations.push(`get ${key}`);
            const result = target[key];
            if (result === undefined) {
              return undefined;
            }
            return TemporalHelpers.toPrimitiveObserver(target._calendar.mergeFieldsReturnOperations, result, key);
          },
          has(target, key) {
            target._calendar.mergeFieldsReturnOperations.push(`has ${key}`);
            return key in target;
          },
        });
      }
    }
    return new CalendarMergeFieldsGetters();
  },

  /*
   * oneShiftTimeZone(shiftInstant, shiftNanoseconds):
   *
   * In the case of a spring-forward time zone offset transition (skipped time),
   * and disambiguation === 'earlier', BuiltinTimeZoneGetInstantFor subtracts a
   * negative number of nanoseconds from a PlainDateTime, which should balance
   * with the microseconds field.
   *
   * This returns an instance of a custom time zone class which skips a length
   * of time equal to shiftNanoseconds (a number), at the Temporal.Instant
   * shiftInstant. Before shiftInstant, it's identical to UTC, and after
   * shiftInstant it's a constant-offset time zone.
   *
   * It provides a getPossibleInstantsForCalledWith member which is an array
   * with the result of calling toString() on any PlainDateTimes passed to
   * getPossibleInstantsFor().
   */
  oneShiftTimeZone(shiftInstant, shiftNanoseconds) {
    class OneShiftTimeZone extends Temporal.TimeZone {
      constructor(shiftInstant, shiftNanoseconds) {
        super("+00:00");
        this._shiftInstant = shiftInstant;
        this._epoch1 = shiftInstant.epochNanoseconds;
        this._epoch2 = this._epoch1 + BigInt(shiftNanoseconds);
        this._shiftNanoseconds = shiftNanoseconds;
        this._shift = new Temporal.Duration(0, 0, 0, 0, 0, 0, 0, 0, 0, this._shiftNanoseconds);
        this.getPossibleInstantsForCalledWith = [];
      }

      _isBeforeShift(instant) {
        return instant.epochNanoseconds < this._epoch1;
      }

      getOffsetNanosecondsFor(instant) {
        return this._isBeforeShift(instant) ? 0 : this._shiftNanoseconds;
      }

      getPossibleInstantsFor(plainDateTime) {
        this.getPossibleInstantsForCalledWith.push(plainDateTime.toString());
        const [instant] = super.getPossibleInstantsFor(plainDateTime);
        if (this._shiftNanoseconds > 0) {
          if (this._isBeforeShift(instant)) return [instant];
          if (instant.epochNanoseconds < this._epoch2) return [];
          return [instant.add(this._shift)];
        }
        if (instant.epochNanoseconds < this._epoch2) return [instant];
        const shifted = instant.add(this._shift);
        if (this._isBeforeShift(instant)) return [instant, shifted];
        return [shifted];
      }

      getNextTransition(instant) {
        return this._isBeforeShift(instant) ? this._shiftInstant : null;
      }

      getPreviousTransition(instant) {
        return this._isBeforeShift(instant) ? null : this._shiftInstant;
      }

      toString() {
        return "Custom/One_Shift";
      }
    }
    return new OneShiftTimeZone(shiftInstant, shiftNanoseconds);
  },

  /*
   * springForwardFallBackTimeZone():
   *
   * This returns an instance of a custom time zone class that implements one
   * single spring-forward/fall-back transition, for the purpose of testing the
   * disambiguation option, without depending on system time zone data.
   *
   * The spring-forward occurs at epoch second 954669600 (2000-04-02T02:00
   * local) and goes from offset -08:00 to -07:00.
   *
   * The fall-back occurs at epoch second 972810000 (2000-10-29T02:00 local) and
   * goes from offset -07:00 to -08:00.
   */
  springForwardFallBackTimeZone() {
    const { compare } = Temporal.PlainDateTime;
    const springForwardLocal = new Temporal.PlainDateTime(2000, 4, 2, 2);
    const springForwardEpoch = 954669600_000_000_000n;
    const fallBackLocal = new Temporal.PlainDateTime(2000, 10, 29, 1);
    const fallBackEpoch = 972810000_000_000_000n;
    const winterOffset = new Temporal.TimeZone('-08:00');
    const summerOffset = new Temporal.TimeZone('-07:00');

    class SpringForwardFallBackTimeZone extends Temporal.TimeZone {
      constructor() {
        super("-08:00");
      }

      getOffsetNanosecondsFor(instant) {
        if (instant.epochNanoseconds < springForwardEpoch ||
          instant.epochNanoseconds >= fallBackEpoch) {
          return winterOffset.getOffsetNanosecondsFor(instant);
        }
        return summerOffset.getOffsetNanosecondsFor(instant);
      }

      getPossibleInstantsFor(datetime) {
        if (compare(datetime, springForwardLocal) >= 0 && compare(datetime, springForwardLocal.add({ hours: 1 })) < 0) {
          return [];
        }
        if (compare(datetime, fallBackLocal) >= 0 && compare(datetime, fallBackLocal.add({ hours: 1 })) < 0) {
          return [summerOffset.getInstantFor(datetime), winterOffset.getInstantFor(datetime)];
        }
        if (compare(datetime, springForwardLocal) < 0 || compare(datetime, fallBackLocal) >= 0) {
          return [winterOffset.getInstantFor(datetime)];
        }
        return [summerOffset.getInstantFor(datetime)];
      }

      getPreviousTransition(instant) {
        if (instant.epochNanoseconds > fallBackEpoch) return new Temporal.Instant(fallBackEpoch);
        if (instant.epochNanoseconds > springForwardEpoch) return new Temporal.Instant(springForwardEpoch);
        return null;
      }

      getNextTransition(instant) {
        if (instant.epochNanoseconds < springForwardEpoch) return new Temporal.Instant(springForwardEpoch);
        if (instant.epochNanoseconds < fallBackEpoch) return new Temporal.Instant(fallBackEpoch);
        return null;
      }

      toString() {
        return "Custom/Spring_Fall";
      }
    }
    return new SpringForwardFallBackTimeZone();
  },

  /*
   * Returns an object that will append logs of any Gets or Calls of its valueOf
   * or toString properties to the array calls. Both valueOf and toString will
   * return the actual primitiveValue. propertyName is used in the log.
   */
  toPrimitiveObserver(calls, primitiveValue, propertyName) {
    return {
      get valueOf() {
        calls.push(`get ${propertyName}.valueOf`);
        return function () {
          calls.push(`call ${propertyName}.valueOf`);
          return primitiveValue;
        };
      },
      get toString() {
        calls.push(`get ${propertyName}.toString`);
        return function () {
          calls.push(`call ${propertyName}.toString`);
          if (primitiveValue === undefined) return undefined;
          return primitiveValue.toString();
        };
      },
    };
  },
};
