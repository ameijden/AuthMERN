require('dotenv').config();
const User = require('../models/user');
const axios = require('axios').default;
const request = require('request');

const signedIn = req => !!req.session.userId;

exports.ensureSignedIn = (req, res, next) => {
  if (!signedIn(req)) {
    res.status(401).json('You must be signed in.');
    return;
  }
  next();
};

exports.isSignedIn = (req, res, next) => {
  if (!signedIn(req)) {
    res.status(200).json(false);
    return;
  } else {
    res.status(200).json(true);
  }
};

exports.signUp = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    req.session.userId = user._id;
    res.status(201).json({ user: user });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.continueWithFacebook = async (req, res, next) => {
  const { code, redirect_uri, type } = req.body;
  let fb_access = undefined;

  //using code to get access token
  await axios
    .get(
      `https://graph.facebook.com/v10.0/oauth/access_token?client_id=${process.env.FB_CLIENT_ID}&redirect_uri=${redirect_uri}&client_secret=${process.env.FB_CLIENT_SECRET}&code=${code}`
    )
    .then(result => {
      fb_access = result.data;
    })
    .catch(err => {
      console.log(err.response);
    });

  //return if access token not found
  if (!fb_access) {
    res
      .status(400)
      .json('Authentication Failed via Facebook: Access Token not Found');
    return;
  }

  let fb_user = undefined;

  //using access token to get user details
  await axios
    .get(
      `https://graph.facebook.com/me?fields=id,name&access_token=${fb_access.access_token}`
    )
    .then(result => {
      fb_user = result.data;
    })
    .catch(err => {
      console.log(err.response);
    });

  //return if user details not found
  if (!fb_user) {
    res.status(400).json('Authentication Failed via Facebook: User not Found');
    return;
  }

  if (signedIn(req)) {
    try {
      let user = await User.findById(req.session.userId);
      if (user.facebook_id === undefined) {
        user.facebook_id = fb_user.id;
        user.save();
        res.status(200).json({ user: user });
      } else {
        res.status(406).json('Facebook Already Added.');
      }
      return
    } catch (error) {
      res.status(500).json(error);
      return
    }
    return
  }

  //finding user in database
  let user = await User.findOne({ facebook_id: fb_user.id });
  if (!!user) {
    req.session.userId = user._id;
    console.log(req.session)
    res.status(200).json({ user: user });
    return;
  } else if (!user && type === 'signup') {
    let model = {
      facebook_id: fb_user.id
    };
    let first_name_space = fb_user.name.indexOf(' ');
    if (first_name_space >= 0) {
      model.firstname = fb_user.name.slice(0, first_name_space);
      model.lastname = fb_user.name.slice(first_name_space + 1);
    }
    user = await User.create(model);
    req.session.userId = user._id;
    console.log(req.session)
    res.status(201).json({ user: user });
    return;
  } else {
    res.status(404).json('User Not Found');
    return;
  }
};

exports.continueWithInstagram = async (req, res, next) => {
  const { code, redirect_uri, type } = req.body;
  let i_access = undefined;
  //using code to get access token
  let options = {
    url: 'https://api.instagram.com/oauth/access_token',
    method: 'POST',
    form: {
      client_id: process.env.INSTAGRAM_CLIENT_ID,
      client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
      redirect_uri: redirect_uri,
      code: code,
      grant_type: 'authorization_code'
    }
  };
  request(options, async function (error, response, body) {
    if (!error && response.statusCode == 200) {
      i_access = JSON.parse(body);
    }

    //return if access token not found
    if (!i_access) {
      res
        .status(400)
        .json('Authentication Failed via Instagram: Access Token not Found');
      return;
    }

    if (signedIn(req)) {
      try {
        let user = await User.findById(req.session.userId);
        if (user.instagram_id === undefined) {
          user.instagram_id = i_access.user_id;
          user.save();
          res.status(200).json({ user: user });
        } else {
          res.status(406).json('Instagram Already Added.');
        }
        return
      } catch (error) {
        res.status(500).json(error);
        return
      }
    }

    //finding user in database
    let user = await User.findOne({ instagram_id: i_access.user_id });
    if (!!user) {
      req.session.userId = user._id;
      console.log(req.session.userId)
      res.status(201).json({ user: user });
      return;
    } else if (!user && type === 'signup') {
      let model = {
        instagram_id: i_access.user_id
      };
      user = await User.create(model);
      req.session.userId = user._id;
      console.log(req.session)
      res.status(201).json({ user: user });
      return;
    } else {
      res.status(404).json('User Not Found');
      return;
    }
  });
};

exports.signIn = async (req, res, next) => {
  const { email, password } = req.body;
  if (signedIn(req)) {
    res.status(406).json('Already Signed In');
    return;
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    res.status(400).json('Please enter a correct email.');
    return;
  }
  if (!(await user.matchPassword(password))) {
    res.status(400).json('Please enter a correct password.');
    return;
  }
  req.session.userId = user.id;
  res.status(200).json({ msg: 'Signed In', user: user });
};

exports.signOut = async (req, res) => {
  if (!signedIn(req)) {
    res.status(406).json('Already Signed Out');
    return;
  }
  req.session.destroy(err => {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.clearCookie(process.env.SESSION_NAME);
    res.status(200).json('Signed Out');
  });
};

exports.getSelf = async (req, res) => {
  if (!signedIn(req)) {
    res.status(406).json('Not Signed In');
    return;
  }
  let user = await User.findById(req.session.userId);
  res.status(200).json({ user: user });
};

exports.addEmailLogin = async (req, res) => {
  if (!signedIn(req)) {
    res.status(406).json('Not Signed In');
    return;
  }
  try {
    let user = await User.findById(req.session.userId);
    console.log(user);
    if (user.email === undefined && user.password === undefined) {
      user.email = req.body.email;
      user.password = req.body.password;
      user.save();
      res.status(200).json({ user: user });
    } else {
      res.status(406).json('Email Login Is Already Added.');
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateSelf = async (req, res) => {
  if (!signedIn(req)) {
    res.status(406).json('Not Signed In');
    return;
  }
  try {
    let user = await User.findByIdAndUpdate(
      req.session.userId,
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        street: req.body.street,
        city: req.body.city,
        zipcode: req.body.zipcode,
        username: req.body.username
      },
      { new: true }
    );
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(500).json(error);
  }
};
