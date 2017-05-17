'use strict';

const feedparser = require('feedparser-promised');

/*
 * Proxy call Wordpress for a list of blog posts
 */

class PostsHandler {
    constructor(config) {
        this.url = config.POSTS_URL;
    }

    handle(req, context) {
        feedparser.parse(this.url).then((items) => {
            let data = items.map((item) => {
                return {
                    title: item.title,
                    pubdate: item.pubdate,
                    link: item.link
                };
            });
            context.done(null, {data: data});
        }).catch((err) => {
            console.log(err);
            context.done('ERR_INTERNAL_ERROR');
        });
    }
}

module.exports = PostsHandler;
