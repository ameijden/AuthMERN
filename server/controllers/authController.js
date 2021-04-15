require("dotenv").config();
const User = require("../models/user");
const axios = require('axios').default;

const signedIn = (req) => req.session.userId;

exports.ensureSignedIn = (req, res, next) => {
	if (!signedIn(req)) {
		res.status(401).json("You must be signed in.");
		return;
	}
	next();
}


exports.isSignedIn = (req, res, next) => {
	if (!signedIn(req)) {
		res.status(200).json(false);
		return;
	} else {
		res.status(200).json(true);
	}
}


exports.signUp = async (req, res, next) => {
	const user = await User.create(req.body);
	req.session.userId = user.id;
	res.status(201).json({ user: user });
}

exports.signUpOrLoginWithFacebook = async (req, res, next) => {
	const { code, type } = req.body;
	let fb_access = undefined;
	//using code to get access token 
	await axios.get(`https://graph.facebook.com/v10.0/oauth/access_token?client_id=${process.env.FB_CLIENT_ID}&redirect_uri=${process.env.FB_CALLBACK_URI}&client_secret=${process.env.FB_CLIENT_SECRET}&code=${code}`).then(
		result => {
			fb_access = result.data
		}
	).catch(err => {
		console.log(err.response)
	})
	//return if access token not found
	if (!fb_access) {
		res.status(400).json('Authentication Failed via Facebook: Access Token not Found');
		return
	}
	let fb_user = undefined;
	//using access token to get user details
	await axios.get(`https://graph.facebook.com/me?fields=id,name&access_token=${fb_access.token}`).then(result => {
		fb_user = result.data;
	}).catch(err => {
		console.log(err.response)
	})
	//return if user details not found
	if (!fb_user) {
		res.status(400).json('Authentication Failed via Facebook: User not Found');
		return
	}
	let user = await User.findOne({ facebook_id: fb_user.id });
	if (!!user) {
		req.session.userId = user.id;
		res.status(201).json({ user: user });
		return
	}
	else if (!user && type === 'signup') {
		let model = {
			facebook_id: fb_user.id,
		}
		let first_name_space = fb_user.name.indexOf(' ');
		if (first_name_space >= 0) {
			model.firstname = fb_user.name.slice(0, first_name_space);
			model.lastname = fb_user.name.slice(first_name_space + 1)
		}
		user = await User.create(model)
		req.session.userId = user.id;
		req.session.userId = user.id;
		res.status(201).json({ user: user });
		return
	} else {
		res.status(404).json('User Not Found');
		return
	}


	return
}

exports.signIn = async (req, res, next) => {
	const { email, password } = req.body;
	if (signedIn(req)) {
		res.status(406).json("Already Signed In");
		return;
	}
	const user = await User.findOne({ email: email });
	if (!user) {
		res.status(400).json("Please enter a correct username.");
		return;
	}
	if (!(await user.matchPassword(password))) {
		res.status(400).json("Please enter a correct password.");
		return;
	}
	req.session.userId = user.id;
	res.status(200).json({ msg: "Signed In", user: user });
}


exports.signOut = async (req, res) => {
	if (!signedIn(req)) {
		res.status(406).json("Already Signed Out");
		return;
	}
	req.session.destroy((err) => {
		if (err) {
			res.status(500).json(err);
			return;
		}
		res.clearCookie(process.env.SESSION_NAME);
		res.status(200).json("Signed Out");
	}
	);
}



