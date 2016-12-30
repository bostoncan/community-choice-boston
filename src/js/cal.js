/* globals moment */
(function() {
    'use strict';
    var CAL_ID = 't4lcptng6vkplmbu5suikicdog@group.calendar.google.com',
        BROWSER_KEY = 'not-a-real-key';

    var el = $('#next-event'),
        template = $('#template-cal-event').html();

    function error() {
        el.html('<div class="col-sm-12"><h4 class="text-center">No upcoming events</h4></div>');
    }

    function success(resp) {
        try {
            var start = moment(new Date(resp.items[0].start.dateTime));
            var content = template
                .replace('{{isoformat}}', start.toISOString())
                .replace('{{day}}', start.format('dddd'))
                .replace('{{month}}', start.format('MMMM'))
                .replace('{{date}}', start.format('D'))
                .replace('{{when}}', start.format('h:mm a'))
                .replace('{{where}}', resp.items[0].location)
                .replace('{{where-enc}}', encodeURI(resp.items[0].location))
                .replace('{{title}}', resp.items[0].summary)
                .replace('{{description}}', resp.items[0].description);
            el.html(content);
        } catch(e) {
            error()
        }
    }

    $.ajax('https://www.googleapis.com/calendar/v3/calendars/' + CAL_ID + '/events?' +
           'orderBy=startTime&singleEvents=True&maxResults=1&key=' + BROWSER_KEY, {
        success: success,
        error: error
    });
}());
