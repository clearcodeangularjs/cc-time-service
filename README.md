Clearcode Time Service
=========

This service consists of methods that operate on time object.

Installation
--------------
``` bower install clearcodeangularjs/cc-time-service --save ```


Usage
------

Add ``` cc.time.service ``` module to your app module list :


```
angular
    .module('yourAwesomeApp', [
        'cc.time.service'
    ]);
```
and you are ready to go!

How to use service methods:

*time.getNowDate*

```
time.getNowDate(); // -> returns mockedDate or new Date();

```

*time.currentTime*

```
time.currentTime(); // -> returns mockedDate.getTime() or new Date().getTime();

```


*time.setNowDate*

```
time.setNowDate(date); // -> sets mockedDate

```


*time.setDay*

```
time.setDay(date, day); //  -> sets day in date

```


*time.utc*

```
date.utc(date); // -> returns utc parsed date

```


*time.getTimeRange*

```
time.getTimeRange(id); // returns time range between now and set range - object {min:min, max:max}

```
possible ranges:
- yesterday
- this_week
- last_week
- this_month
- last_month
- last_X_days
- last_X_months


*time.dateToUTCString*

```
time.dateToUTCString(date); // -> returns UTC string of date

```


*time.stringifyAgo*

```
time.stringifyAgo(timestamp, now_timestamp); // -> returns stringified diff between timestamps 'xx min ago''

```


*time.getTimezoneOffset*

```
time.getTimezoneOffset() // -> returns timezone offset of _datetime

```

*time.getDateTimeObject*

```
time.getDateObject(); // -> returns date object stored in _datetime variable.

```

*time.getDateObject*

```
time.getDateObject(); // -> returns date with hours, seconds, minutes, and miliseconds set on 0

```

*time.setDateTime*

```
time.setDateTime(dateTime timeZone); // -> sets date in _dateTime object

```
Author
------

Roman Sek
Jacek Kowalczyk


License
----

LGPL

