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
'use strict';

angular.module('cc.time.service').service(
    'time', ['$filter',
    function( $filter){
    this._mockedNowDate;

    this.getNowDate = function(){
        return this._mockedNowDate || new Date();
    };

    this.currentTime = function(){
        return this._mockedNowDate.getTime() || new Date().getTime();
    };

    this.setNowDate = function(nowDate){
        this._mockedNowDate = nowDate;
    };

    this.setDay = function(date, day){
        var distance = day - date.getDay();
        date.setDate(date.getDate() + distance);
    };

    this.utc = function(d){
        return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(),
            d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(),
            d.getUTCMilliseconds());
    };

    this.getTimeRange = function(id){
        var max = new Date(this.getNowDate().getTime());
        var min = new Date(max.getTime());
        var idArray = id.split('_');
        if(idArray.length == 3){
        	switch(idArray[2]){
        		case 'days':
        			min.setDate(min.getDate() - (parseInt(idArray[1])-1) );
        			break;

        		case 'months':
        			min.setMonth(min.getMonth() - (parseInt(idArray[ 1])-1) );
        			break;
        	}
        } else{
        	switch(id){
            case 'yesterday':
                min.setDate(min.getDate() - 1);
                max.setDate(max.getDate() - 1);
                break;

            case 'this_week':
                this.setDay(min, 0);
                break;

            case 'last_week':
                this.setDay(min, -6);
                this.setDay(max, 0);
                break;

            case 'this_month':
                min.setDate(1);
                max.setDate(1);
                max.setMonth(max.getMonth() + 1);
                max.setDate(0);
                break;

            case 'last_month':
                min.setDate(1);
                min.setMonth(min.getMonth() - 1);
                max.setDate(0);
                break;
        }
        }

        return {min: min, max: max};
    };

    this.dateToUTCString = function(date){
        return $filter('date')(this.utc(date), 'yyyy-MM-dd');
    };

    this._stringifyAgo = function(diff, unit, text){
        var count = parseInt(diff / unit);
        var text = count + ' ' + text;

        return text;
    };

    this.stringifyAgo = function(timestamp, now_timestamp){
        var minute = 60;
        var hour = minute * 60;
        var day = hour * 24;
        var week = day * 7;
        var month = day * 30;
        var year = day * 365;

        var timestamp = +timestamp;
        var now = now_timestamp || (new Date().getTime() / 1000);
        var diff =  now - timestamp;

        if (diff < 1){
            diff = 1;
        }

        if (diff < minute){
            return this._stringifyAgo(diff, 1, 'sec ago');
        } else if (diff < hour){
            return this._stringifyAgo(diff, minute, 'min ago');
        } else if (diff < day){
            return this._stringifyAgo(diff, hour, 'hr ago');
        } else if (diff < week){
            return this._stringifyAgo(diff, day, 'day ago');
        } else if (diff < month){
            return this._stringifyAgo(diff, week, 'week ago');
        } else if (diff < year){
            return this._stringifyAgo(diff, month, 'month ago');
        } else {
            return this._stringifyAgo(diff, year, 'year ago');
        }
    };
    var _datetime;

    this.getTimezoneOffset = function(){
        return this.getDateTimeObject().getTimezoneOffset();
    };

    this.getDateTimeObject = function(){
        return _datetime || new Date();
    };


    this.getDateObject = function(){
        var date, datetime = this.getDateTimeObject();
        date = angular.copy(datetime);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);

        if(date.getTimezoneOffset !== datetime.getTimezoneOffset) {
            date.getTimezoneOffset = datetime.getTimezoneOffset;
        }

        return date;
    };

    this.setDateTime = function(datetime, timezone){
        if(datetime instanceof Date) {
            _datetime = angular.copy(datetime);

            if(angular.isNumber(timezone)) {
                _datetime.getTimezoneOffset = function() {
                    return timezone;
                };
            }
        }
    };
}]);
