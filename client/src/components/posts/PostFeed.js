import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem';
import Allposts from './AllPosts';

class PostFeed extends Component {
  render() {
    const { posts } = this.props;
    const post= posts.map(post => <PostItem key={post._id} post={post} />);
    return (
      <div>
      <Allposts/>
      {post}
      </div>
    )
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostFeed;
