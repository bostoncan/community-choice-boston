'use strict';

const feedparser = require('feedparser-promised');

/*
 * Proxy call Wordpress for a list of blog posts
 */

class PostsHandler {
    constructor(config) {
        this.url = config.POSTS_URL;
    }

    async handle(req) {
        const items = await feedparser.parse(this.url);
        const data = items.map((item) => ({
            title: item.title,
            pubdate: item.pubdate,
            link: item.link
        }));
        return {data};
    }
}

module.exports = PostsHandler;
