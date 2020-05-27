'use strict'

//require model
const Post = use('App/Models/Post')

class PostController {
    async index({ view }){

        const posts = await Post.all()

        return view.render('posts.index', {
            title: "Latest posts",
            posts: posts.toJSON()
        })
    }

    async details({ view, params }){
        const post = await Post.find(params.id)

        return view.render('posts.show', {
            post
        })
    }

    async add({ view }){
        return view.render('posts.add')
    }
}

module.exports = PostController
