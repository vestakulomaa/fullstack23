const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const total = (sum, blog) => {
        return sum + blog.likes
    }
    
    if (blogs.length == 0){
        return 0
    }
    else {
       return blogs.reduce(total, 0)
    }
}

const favouriteBlog = (blogs) => {
    const compare_likes = (most_likes, blog) => {
        if (most_likes.likes > blog.likes) {
            return most_likes
        }
        else {
            return blog
        }
    }
     
    if (blogs.length == 0){
        const no_blogs = "No blogs"
        return no_blogs
    }
    else {
        return blogs.reduce(compare_likes, blogs[0])
    }
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}