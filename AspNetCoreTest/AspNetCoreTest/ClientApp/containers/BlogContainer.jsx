// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as BlogStore from '../store/Blog';
import * as FindBlogStore from '../store/Suggestion';
import FindBlog from '../components/FindBlogPosts';
import Blog from '../components/Blog'

let bindedActionCreators = Object.assign(BlogStore.actionCreators, FindBlogStore.actionCreators);


class BlogContainer extends React.Component {
    componentWillMount() {
        // This method runs when the component is first added to the page
        var startDateIndex = this.props.params.pageNumber || 0;
        this.props.GetAllBlogPosts(startDateIndex);
    }

    componentWillReceiveProps(nextProps) {
        // This method runs when incoming props (e.g., route params) change
        var startDateIndex = nextProps.params.pageNumber || 0;
        this.props.GetAllBlogPosts(startDateIndex);
    }

    renderPagination() {
        var prevStartDateIndex = (this.props.params.pageNumber) * 1 - 1;
        var nextStartDateIndex = (this.props.params.pageNumber) * 1 + 1;

        return <p className='clearfix text-center'>
            <Link className='btn btn-default pull-left' to={ `/blog/${prevStartDateIndex}` }>Previous</Link>
            <Link className='btn btn-default pull-right' to={ `/blog/${nextStartDateIndex}` }>Next</Link>
        </p>;
    }

    render() {

        return this.props.BlogPostList[this.props.params.pageNumber || 0] ? <Blog pageNumber={this.props.params.pageNumber} BlogPostList={this.props.BlogPostList[this.props.params.pageNumber]} >
                    <FindBlog  FindSuggestions={this.props.FindSuggestions} />
                </Blog> : <div>Loading</div>;
    }
}

// Wire up the React component to the Redux store
export default connect(
	(state) =>
	Object.assign(state.blog,
		state.findedSuggestions), // Selects which state properties are merged into the component's props
	bindedActionCreators // Selects which action creators are merged into the component's props
)(BlogContainer);