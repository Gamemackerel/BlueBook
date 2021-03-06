const geolib = require('geolib');

const isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};

const isEmpty = (string) => {
  if (string.trim() === '') return true;
  else return false;
};

exports.validateSignupData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) {
    errors.email = 'Must not be empty';
  } else if (!isEmail(data.email)) {
    errors.email = 'Must be a valid email address';
  }

  if (isEmpty(data.password)) errors.password = 'Must not be empty';
  if (data.password !== data.confirmPassword)
    errors.confirmPassword = 'Passwords must match';
  if (isEmpty(data.handle)) errors.handle = 'Must not be empty';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

exports.validateUploadMusic = (headers) => {
  let errors ={};
  let musicName = headers.musicName;
  let musicAuthor = headers.musicAuthor;
  let userName = headers.userName;
  if (isEmpty(musicName)) errors.musicname = 'Must not be empty';
  if (isEmpty(musicAuthor)) errors.musicauthor = 'Must not be empty';
  if (isEmpty(userName)) errors.userhandle = 'Must not be empty';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  }
}


exports.validateLoginData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) errors.email = 'Must not be empty';
  if (isEmpty(data.password)) errors.password = 'Must not be empty';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

exports.reduceUserDetails = (data) => {
  let userDetails = {};

  if (!isEmpty(data.bio.trim())) userDetails.bio = data.bio;
  if (!isEmpty(data.website.trim())) {
    // https://website.com
    if (data.website.trim().substring(0, 4) !== 'http') {
      userDetails.website = `http://${data.website.trim()}`;
    } else userDetails.website = data.website;
  }
  if (!isEmpty(data.location.trim())) userDetails.location = data.location;

  return userDetails;
};

exports.withinFriendshipCircle = (friend1, friend2) => {
  var friend1LL = friend1.data().coordinates;
  var friend2LL = friend2.data().coordinates;

  var distance = geolib.getDistance(friend1LL, friend2LL);
  distance = distance*0.000621371192;
  console.log("distance: " + distance)
  return distance < 50;
}
