import { Action, Reducer,ActionCreator } from 'redux';
import { fetch, addTask } from 'domain-task';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.


export interface BlogState {
    BlogPostList: {
        [key: number]: BlogPost[]
    };
    LoadedPages: Number[];
}

export interface BlogPost {
    title: string;
    text: string;
    author: any;
}


// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

interface GetAllBlogPosts { type: 'GET_ALL_BLOG_POSTS'; blogposts: BlogPost[]; PageIndex: Number }


// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = GetAllBlogPosts;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    GetAllBlogPosts: (PageIndex: Number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        if (getState().blog.LoadedPages.indexOf(PageIndex) == -1) {
            let fetchTask = fetch(`api/BlogPosts/byPage?pageIndex=${PageIndex}`)
                    .then(response => response.json() as Promise<BlogPost[]>)
                    .then(data => {
                        dispatch({ type: 'GET_ALL_BLOG_POSTS', PageIndex: PageIndex, blogposts: data });
                    });

                //addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
                //dispatch({ type: 'REQUEST_WEATHER_FORECASTS', startDateIndex: startDateIndex });
            }

    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer: Reducer<any> = (state: any = { BlogPostList: {}, LoadedPages: [] } , action: KnownAction | any) => {
    switch (action.type) {
        case 'GET_ALL_BLOG_POSTS':
            {
                let blogpostlist = Object.assign({}, state.BlogPostList);
                blogpostlist[action.PageIndex] = action.blogposts;
                return <BlogState>{
                    BlogPostList: blogpostlist,
                    LoadedPages: state.LoadedPages.concat(action.PageIndex)
                }
            };
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || <BlogState>{ BlogPostList: {}, LoadedPages: [] };
};

