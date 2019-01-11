import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  TiArrowBackOutline,
  TiHeartOutline,
  TiHeartFullOutline
} from 'react-icons/ti';

import * as Helpers from '../utils/helpers';
import TweetsSelector from '../state/selectors/tweets';
import AuthedUserSelector from '../state/selectors/authed-user';

const Avatar = ({ avatar, name }) => (
  <img src={avatar} alt={'Avatar of ' + name} className="avatar" />
);

const PublicationDate = ({ timestamp }) => (
  <div>{Helpers.formatDate(timestamp)}</div>
);

const RepliesCount = ({ replies }) => <span>{replies !== 0 && replies}</span>;

const LikesCount = ({ likes }) => <span>{likes !== 0 && likes}</span>;

const ReplyingToButton = ({ parent, handleClick }) => {
  return (
    <button className="replying-to" onClick={handleClick}>
      Replying to @{parent.author}
    </button>
  );
};

const LikeButon = ({ hasLiked, handleClick }) => (
  <button className="heart-button" onClick={handleClick}>
    {hasLiked ? (
      <TiHeartFullOutline color="#e0245e" className="tweet-icon" />
    ) : (
      <TiHeartOutline className="tweet-icon" />
    )}
  </button>
);

class Tweet extends Component {
  navigateToParentTweet = (event, parentTweet) => {
    event.preventDefault();
    console.log('TODO: navigate to tweet ' + parentTweet.id);
  };

  toggleLike = tweetId => {
    console.log('TODO: toggle like for tweet ' + tweetId);
  };

  render() {
    const { tweet } = this.props;
    if (!tweet) {
      return <div>This tweet does not exist</div>;
    }

    const {
      name,
      avatar,
      timestamp,
      text,
      hasLiked,
      likes,
      replies,
      id,
      parent
    } = tweet;

    return (
      <section className="tweet">
        <Avatar avatar={avatar} name={name} />
        <div className="tweet-info">
          <div>
            <span>{name}</span>
            <PublicationDate timestamp={timestamp} />
            {parent && (
              <ReplyingToButton
                parent={parent}
                handleClick={event => this.navigateToParentTweet(event, parent)}
              />
            )}
            <p>{text}</p>
          </div>

          <div className="tweet-icons">
            <TiArrowBackOutline className="tweet-icon" />
            <RepliesCount replies={replies} />
            <LikeButon
              hasLiked={hasLiked}
              handleClick={() => this.toggleLike(id)}
            />
            <LikesCount likes={likes} />
          </div>
        </div>
      </section>
    );
  }
}

const stateToProps = (state, props) => {
  return {
    tweet: TweetsSelector.tweet(state, props),
    autherUser: AuthedUserSelector.authedUser(state)
  };
};

const dispatchToProps = dispatch => ({});

export default connect(
  stateToProps,
  dispatchToProps
)(Tweet);