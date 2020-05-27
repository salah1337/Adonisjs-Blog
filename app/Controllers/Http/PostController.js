'use strict'

class PostController {
    async index({ view }){
        return view.render('posts.index', {
            title: "Latest posts"
        })
    }
}

module.exports = PostController
