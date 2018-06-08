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
import BlogState = BlogStore.BlogState;
import SuggestionState = FindBlogStore.SuggestionsState;

let bindedActionCreators = Object.assign(BlogStore.actionCreators, FindBlogStore.actionCreators);

type BlogProps = BlogState & SuggestionState & typeof bindedActionCreators
    & RouteComponentProps<{ pageNumber: number }> ;

class BlogContainer extends React.Component<BlogProps, {}> {
    constructor(props: BlogProps) {
        super(props);
        this.props = props;
    }


    componentWillMount() {
        // This method runs when the component is first added to the page
        let startDateIndex = this.props.match.params.pageNumber || 0;
        this.props.GetAllBlogPosts(startDateIndex);
    }

    componentWillReceiveProps(nextProps: BlogProps) {
        // This method runs when incoming props (e.g., route params) change
        let startDateIndex = nextProps.match.params.pageNumber || 0;
        this.props.GetAllBlogPosts(startDateIndex);
    }

    private renderPagination() {
        let prevStartDateIndex = (this.props.match.params.pageNumber) * 1 - 1;
        let nextStartDateIndex = (this.props.match.params.pageNumber) * 1 + 1;

        return <p className='clearfix text-center'>
            <Link className='btn btn-default pull-left' to={ `/blog/${prevStartDateIndex}` }>Previous</Link>
            <Link className='btn btn-default pull-right' to={ `/blog/${nextStartDateIndex}` }>Next</Link>
        </p>;
    }

    public render() {

        return this.props.BlogPostList[this.props.match.params.pageNumber || 0] ? <Blog pageNumber={this.props.match.params.pageNumber} BlogPostList={this.props.BlogPostList[this.props.match.params.pageNumber]} >
                    <FindBlog  FindSuggestions={this.props.FindSuggestions} />
                </Blog> : <div>Loading</div>;
    }
}

// Wire up the React component to the Redux store
export default connect(
    (state: ApplicationState) => Object.assign(state.blog, state.findedSuggestions), // Selects which state properties are merged into the component's props
    bindedActionCreators    // Selects which action creators are merged into the component's props
)(BlogContainer) as typeof BlogContainer;