const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0 : blogs.length === 1
      ? blogs[0].likes : blogs.map(blog => blog.likes).reduce((a,b) => a+b)
}

const favBlog = (blogs) => {
  const fav = blogs.find(blog => blog.likes === blogs.map(blog => blog.likes).reduce((a,b) => a>b ? a : b))
  const favRest = {
    author: fav.author,
    likes: fav.likes,
    title: fav.title
  }
  return favRest
}

const mostBlogs = (blogs) => {
  const temp = blogs.map(blog => blog.author).reduce((acc,el) => {
    if(acc[el]){
      acc[el]++
    }else {
      acc[el]=1
    }
    return acc
  },{})
  const most = Object.entries(temp).reduce((acc,el) => acc[1]>el[1] ? acc : el)
  return {
    author: most[0],
    blogs: most[1]
  }

}

module.exports = {
  dummy,
  totalLikes,
  favBlog,
  mostBlogs
}
