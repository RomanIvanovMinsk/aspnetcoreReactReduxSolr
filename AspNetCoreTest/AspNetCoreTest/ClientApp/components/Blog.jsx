import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';

class Blog extends React.Component {
    renderPagination() {
        var prevStartDateIndex = (this.props.pageNumber || 0)*1 - 1;
        var nextStartDateIndex = (this.props.pageNumber || 0)*1 + 1;

        return <p className='clearfix text-center'>
                   <Link className='btn btn-default pull-left' to={`/blog/${prevStartDateIndex}`}>Previous</Link>
                   <Link className='btn btn-default pull-right' to={`/blog/${nextStartDateIndex}`}>Next</Link>
               </p>;
    }

    render() {
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