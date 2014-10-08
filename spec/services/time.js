/*

    Copyright (C) 2012-2013 by Clearcode <http://clearcode.cc>
    and associates (see AUTHORS).

    This file is part of cc-time-service.

    cc-time-service is free software: you can redistribute it and/or modify
    it under the terms of the Lesser GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    cc-time-service is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with cc-time-service.  If not, see <http://www.gnu.org/licenses/>.

*/
'use strict'

describe('time service', function(){
    beforeEach(module('sandboxApp'));

    var time;

    beforeEach(inject(function(_time_){
        time = _time_;
        time.setNowDate(new Date(2014, 3, 16));
    }));

    describe('.getTimeRange()', function(){
        it('should return yesterday time range', function(){
            expect(time.getTimeRange('yesterday')).toEqual(
                {min: new Date(2014, 3, 15), max:new Date(2014, 3, 15)});
        });

        it('should return last_7_days range', function(){
            expect(time.getTimeRange('last_7_days')).toEqual(
                {min: new Date(2014, 3, 10), max: new Date(2014, 3, 16)});
        });

        it('should return this_week range', function(){
            expect(time.getTimeRange('this_week')).toEqual(
                {min: new Date(2014, 3, 13), max: new Date(2014, 3, 16)});
        });

        it('should return last_week range', function(){
            expect(time.getTimeRange('last_week')).toEqual(
                {min: new Date(2014, 3, 7), max: new Date(2014, 3, 13)});
        });

        it('should last_14_days range', function(){
            expect(time.getTimeRange('last_14_days')).toEqual(
                {min: new Date(2014, 3, 3), max: new Date(2014, 3, 16)});
        });

        it('should return this_month range', function(){
            expect(time.getTimeRange('this_month')).toEqual(
                {min: new Date(2014, 3, 1), max: new Date(2014, 3, 30)});
        });

        it('should return last_30_days range', function(){
            expect(time.getTimeRange('last_30_days')).toEqual(
                {min: new Date(2014, 2, 18), max: new Date(2014, 3, 16)});
        });

        it('should return last_month range', function(){
            expect(time.getTimeRange('last_month')).toEqual(
                {min: new Date(2014, 2, 1), max: new Date(2014, 2, 31)});
        });
    });

    describe('when current day is the last day of the month', function(){
        beforeEach(function(){
            time.setNowDate(new Date(2014, 4, 31));
        });

        it('should return this_month range', function(){
            expect(time.getTimeRange('this_month')).toEqual(
                {min: new Date(2014, 4, 1), max: new Date(2014, 4, 31)});
        });

        it('should return last_month range', function(){
            expect(time.getTimeRange('last_month')).toEqual(
                {min: new Date(2014, 3, 1), max: new Date(2014, 3, 30)});
        });
    });

    describe('stringifyAgo function', function(){

            var now;

            beforeEach(function () {
                now = Date.now() / 1000;
            });

            it('should converts to seconds when diff equals 20 seconds', inject(function () {
                var then = now - 20;
                var result = time.stringifyAgo(then, now);

                expect(result).toBe('20 sec ago');
            }));

            it('should converts to seconds when diff equals 40 seconds', inject(function () {
                var then = now - 40;
                var result = time.stringifyAgo(then, now);

                expect(result).toBe('40 sec ago');
            }));

            it('should converts to minutes when diff larger than minute', inject(function () {
                var diff = 80;
                var then = now - diff;
                var result = time.stringifyAgo(then, now);

                expect(result).toBe('1 min ago');
            }));

            it('should converts to minutes when diff less than hour', inject(function () {
                var diff = 60 * 60 - 1;
                var then = now - diff;
                var result = time.stringifyAgo(then, now);

                expect(result).toBe('59 min ago');
            }));

            it('should converts to hours when diff more than hour', inject(function () {
                var diff = 60 * 60 + 1;
                var then = now - diff;
                var result = time.stringifyAgo(then, now);

                expect(result).toBe('1 hr ago');
            }));

            it('should converts to hours when diff less than day', inject(function () {
                var diff = 60 * 60 * 24 - 1;
                var then = now - diff;
                var result = time.stringifyAgo(then, now);

                expect(result).toBe('23 hr ago');
            }));

            it('should converts to weeks when diff more than week', inject(function () {
                var diff = 60 * 60 * 24 * 7 + 1;
                var then = now - diff;
                var result = time.stringifyAgo(then, now);

                expect(result).toBe('1 week ago');
            }));

            it('should converts to weeks when diff less than month', inject(function () {
                var diff = 60 * 60 * 24 * 7 * 4 - 1;
                var then = now - diff;
                var result = time.stringifyAgo(then, now);

                expect(result).toBe('3 week ago');
            }));

            it('should converts to months when diff more than month', inject(function () {
                var diff = 60 * 60 * 24 * 30 + 1;
                var then = now - diff;
                var result = time.stringifyAgo(then, now);

                expect(result).toBe('1 month ago');
            }));

            it('should converts to months when diff less than year', inject(function () {
                var diff = 60 * 60 * 24 * 365 - 1;
                var then = now - diff;
                var result = time.stringifyAgo(then, now);

                expect(result).toBe('12 month ago');
            }));

            it('should converts to year when diff more than year', inject(function () {
                var diff = 60 * 60 * 24 * 365 + 1;
                var then = now - diff;
                var result = time.stringifyAgo(then, now);

                expect(result).toBe('1 year ago');
            }));

        });

    var time;

    beforeEach(inject(function(_time_){
        time = _time_;
    }));

    describe('when datetime is set to "2012-05-13 22:43:12 +0500"', function() {
        beforeEach(function() {
            time.setDateTime(new Date(2012, 4, 13, 22, 43, 12), 5 * 60);
        });

        describe('getDateTimeObject', function() {
            it('should return "2012-05-13 22:43:12 +0500"', function() {
                var datetime = time.getDateTimeObject();
                expect(datetime).toEqual(new Date(2012, 4, 13, 22, 43, 12));
                expect(datetime.getTimezoneOffset()).toBe(5 * 60);
            });
        });

        describe('getTimezoneOffset', function() {
            it('should return 5 * 60', function() {
                expect(time.getTimezoneOffset()).toBe(5 * 60);
            });
        });

        describe('getDateObject', function() {
            it('should return "2012-05-13 00:00:00 +0500"', function() {
                var datetime = time.getDateObject();
                expect(datetime).toEqual(new Date(2012, 4, 13));
                expect(datetime.getTimezoneOffset()).toBe(5 * 60);
            });
        });
    });

    describe('when datetime is set to undefined', function() {
        beforeEach(function() {
            time.setDateTime();
        });

        describe('getDateTimeObject', function() {
            it('should return current datetime', function() {
                var start, stop, datetime;
                start = new Date(+new Date() - 1);
                datetime = time.getDateTimeObject();
                stop = new Date(+new Date() + 1);

                expect(datetime.getTime()).toBeGreaterThan(start.getTime());
                expect(datetime.getTime()).toBeLessThan(stop.getTime());
                expect(datetime.getTimezoneOffset()).toBe(stop.getTimezoneOffset());
            });
        });

        describe('getTimezoneOffset', function() {
            it('should return current timezone', function() {
                expect(time.getTimezoneOffset()).toBe((new Date()).getTimezoneOffset());
            });
        });

        describe('getDateObject', function() {
            it('should return current date', function() {
                var datetime = time.getDateObject(),
                    current_datetime = new Date();
                expect(datetime).toEqual(new Date(current_datetime.getFullYear(), current_datetime.getMonth(), current_datetime.getDate()));
                expect(datetime.getTimezoneOffset()).toBe(current_datetime.getTimezoneOffset());
            });
        });
    });

});
