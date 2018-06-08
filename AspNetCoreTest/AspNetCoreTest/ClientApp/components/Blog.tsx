// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as BlogStore from '../store/Blog';
import * as FindBlogStore from '../store/Suggestion';
import * as FindBlog from '../components/FindBlogPosts';
import BlogPost = BlogStore.BlogPost;

interface BlogProps
{
    pageNumber: number;
    BlogPostList: BlogPost[];
}

class Blog extends React.Component<BlogProps, {}> {

    private renderPagination() {
        let prevStartDateIndex = (this.props.pageNumber || 0)*1 - 1;
        let nextStartDateIndex = (this.props.pageNumber || 0)*1 + 1;

        return <p className='clearfix text-center'>
                   <Link className='btn btn-default pull-left' to={`/blog/${prevStartDateIndex}`}>Previous</Link>
                   <Link className='btn btn-default pull-right' to={`/blog/${nextStartDateIndex}`}>Next</Link>
               </p>;
    }

    public render() {
        var style = {
            margin: 20
        }
        return this.props.BlogPostList[this.props.pageNumber || 0]
            ? <div className="container-fluid" style={style}>
                <div>
                    {this.props.children}
                </div>
                <div className="row">
                      {
                        this.props.BlogPostList.map(blog =>
                            <div className="col-sm-10">
                                <div className="page-header">
                                      <h1>{blog.title}</h1>
                                      <p>Posted by <span className="glyphicon glyphicon-user"></span> <a href="#">{
                                    blog.author.lastName
                                    }</a> on <span className="glyphicon glyphicon-time"></span> 12 January 2015 10:00 am
                                      </p>
                                </div>
                                <div>{blog.text}</div>
                              </div>
                          )
                      }
                </div>
                <div>
                    {this.renderPagination()}
                </div>
              </div>
            : <div></div>;
    }
}

// Wire up the React component to the Redux store
export default Blog;