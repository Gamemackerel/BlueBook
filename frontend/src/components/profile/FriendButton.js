import React, { Component } from 'react';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// REdux
import { connect } from 'react-redux';
import { addFriend, removeFriend, getFriends } from '../../redux/actions/dataActions';

export class FriendButton extends Component {
  getFriends = () => {
    this.props.getFriends(this.props.handle);
  };
  alreadyFriends = () => {
    let myHandle = this.props.user.credentials.handle
    if (
      this.props.getFriends(myHandle) &&
      this.props.getFriends(myHandle).find(
        (friendHandle) => friendHandle === this.props.handle
      )
    )
      return true;
    else return false;
  };
  addFriend = () => {
    this.props.addFriend(this.props.handle);
  };
  removeFriend = () => {
    this.props.removeFriend(this.props.handle);
  };
  render() {
    const { authenticated } = this.props.user;
    const FriendButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.alreadyFriends() ? (
      <MyButton tip="Undo like" onClick={this.removeFriend}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.addFriend}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return FriendButton;
  }
}

FriendButton.propTypes = {
  user: PropTypes.object.isRequired,
  handle: PropTypes.string.isRequired,
  addFriend: PropTypes.func.isRequired,
  removeFriend: PropTypes.func.isRequired,
  getFriends: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = {
  addFriend,
  removeFriend,
  getFriends
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(FriendButton);
