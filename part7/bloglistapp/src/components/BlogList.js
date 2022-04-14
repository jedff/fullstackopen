import React from "react";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import BlogItem from "./BlogItem";
import Table from 'react-bootstrap/Table'

const BlogList = ({blogs}) =>{
 const blogList = [...blogs]
 return (
   <div className="bloglist">
    <Togglable buttonLabel="Add new blog">
      <BlogForm></BlogForm>
    </Togglable>
      <Table striped hover>
        <tbody>
        {blogList
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
              <BlogItem className="blog" blog={blog} key={blog.id}/>
          ))
          }
        </tbody>
      </Table>
   </div>
 )
}

export default BlogList