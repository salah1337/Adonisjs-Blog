'use strict'

//require model
const Post = use('App/Models/Post')

//require validator
const { validate } = use('Validator')

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

    async edit({ params, view }){
        const post = await Post.find(params.id)

        return view.render('posts.edit', {
            post
        })
    }

    async store({ request, response, session}){

        const validation = await validate(request.all(), {
            title: 'required|min:3|max:100',
            body: 'required|min:3'
        })

        if(validation.fails()){
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }

        const post = new Post();
        post.title = request.input('title')
        post.body = request.input('body')
        await post.save()

        session.flash({ notification: "Post Added!" })

        return response.redirect('/posts')
    }

    async update({ params, request, response, session}){
        const validation = await validate(request.all(), {
            title: 'required|min:3|max:100',
            body: 'required|min:3'
        })

        if(validation.fails()){
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }

        const post = await Post.find(params.id)
        post.title = request.input('title')
        post.body = request.input('body')
        await post.save()

        session.flash({ notification: "Post Updated!" })

        return response.redirect(`/posts/${params.id}`)
    }

    async destroy({ params, session, response}) {
        const post = await Post.find(params.id)

        await post.delete()

        session.flash({ notification: "Post deleted!" })

        return response.redirect(`/posts`)
    }
}

module.exports = PostController
