import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import config from "../Services/Config";
import qs from "query-string";
import AuthService from "../Services/AuthService";
import { logIn } from "../store/reducers/authReducer";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

export default function SignUp(props) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    password: "",
  });

  const [submitState, setSubmitState] = useState({
    loading: 0,
    response: "",
  });
  const history = useHistory();

  useEffect(() => {
    let platform = props.match.params.platform;
    if (!platform) {
      return;
    } else if (platform === "facebook") {
      setSubmitState({
        loading: 1,
        response: "",
      });
      authenticateFacebook();
    } else if (platform === "instagram") {
      setSubmitState({
        loading: 1,
        response: "",
      });
      authenticateInstagram();
    }
  }, [props.location, props.match.params]); // eslint-disable-line

  const authenticateFacebook = async () => {
    if (props.location.search) {
      let search = qs.parse(props.location.search);
      if (search.code) {
        await AuthService.userFacebookAuthenticate(search.code, "signup")
          .then((res) => {
            console.log(res.data);
            dispatch(logIn(res.data));
            history.push("/");
            // setSubmitState({
            //   loading: 2,
            //   response: "Logged In",
            // });
          })
          .catch((err) => {
            setSubmitState({
              loading: -1,
              response:
                "Failed To Log In. Did you use a different sign in method?",
            });
            console.log(err.response);
          });
      }
    }
  };

  const authenticateInstagram = async () => {
    if (props.location.search) {
      let search = qs.parse(props.location.search);
      if (search.code) {
        await AuthService.userInstagramAuthenticate(search.code, "signup")
          .then((res) => {
            console.log(res.data);
            dispatch(logIn(res.data));
            history.push("/");
            // setSubmitState({
            //   loading: 2,
            //   response: "Logged In",
            // });
          })
          .catch((err) => {
            setSubmitState({
              loading: -1,
              response:
                "Failed To Log In. Did you use a different sign in method?",
            });
            console.log(err);
          });
      }
    }
  };

  const onSubmit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setSubmitState({
      loading: 1,
      response: "",
    });
    AuthService.signup(formData)
      .then((res) => {
        console.log(res.data);
        dispatch(logIn(res.data));
        history.push("/");
        // setSubmitState({
        //   loading: 2,
        //   response: "Logged In",
        // });
      })
      .catch((err) => {
        setSubmitState({
          loading: -1,
          response: "Invalid Email Or Password",
        });
      });
  };

  return (
    <div className='flex flex-col items-center justify-center h-full w-full'>
      <form
        onSubmit={onSubmit}
        className='flex flex-col items-center justify-center gap-2 w-full px-3 md:w-1/3'>
        <div className='mb-5 text-4xl font-thin'>Sign Up</div>
        <input
          className='w-full placeholder-gray-400 border border-gray-200 hover:border-gray-300 focus:border-gray-500 focus:outline-none p-2 rounded-md'
          placeholder='First Name'
          type='text'
          name='firstname'
          value={formData.firstname}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          required
        />
        <input
          className='w-full placeholder-gray-400 border border-gray-200 hover:border-gray-300 focus:border-gray-500 focus:outline-none p-2 rounded-md'
          placeholder='Last Name'
          type='text'
          name='lastname'
          value={formData.lastname}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          required
        />
        <input
          className='w-full placeholder-gray-400 border border-gray-200 hover:border-gray-300 focus:border-gray-500 focus:outline-none p-2 rounded-md'
          placeholder='Email'
          type='email'
          name='email'
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          required
        />
        <input
          className='w-full placeholder-gray-400 border border-gray-200 hover:border-gray-300 focus:border-gray-500 focus:outline-none p-2 rounded-md'
          placeholder='Password'
          type='password'
          name='password'
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          required
        />
        <button className='w-full border hover:border-gray-300 focus:border-gray-500 focus:outline-none p-2 rounded-md'>
          Signup
        </button>
        <div
          className={`my-5 text-sm font-semibold text-center ${submitState.loading === -1 && "text-red-600"
            } ${submitState.loading === 2 && "text-green-600"}`}>
          {submitState.loading !== 1 ? (
            submitState.response
          ) : (
            <div className='w-5 h-5 border-t border-gray-600 animate-spin rounded-full'></div>
          )}
        </div>
        <a
          href={`${config.FB.AUTH_CODE_URL}?client_id=${config.FB.CLIENT_ID
            }&redirect_uri=${config.FB.REDIRECT_URI.replace("login", "signup")}`}
          className='w-full bg-blue-600 hover:bg-blue-700 font-semibold text-white rounded-md p-3 flex gap-2 items-center justify-center'>
          <FontAwesomeIcon
            size='lg'
            icon={["fab", "facebook"]}></FontAwesomeIcon>
          <span>Continue with Facebook</span>
        </a>
        <a
          href={`${config.INSTAGRAM.AUTH_CODE_URL}?client_id=${config.INSTAGRAM.CLIENT_ID
            }&redirect_uri=${config.INSTAGRAM.REDIRECT_URI.replace(
              "login",
              "signup",
            )}&response_type=code&scope=user_profile`}
          className='w-full bg-gradient-to-bl from-pink-600 hover:from-yellow-300 via-purple-600  to-yellow-300 hover:to-pink-600 font-semibold text-white rounded-md p-3 flex gap-2 items-center justify-center'>
          <FontAwesomeIcon
            size='lg'
            icon={["fab", "instagram"]}></FontAwesomeIcon>
          <span>Continue with Instagram</span>
        </a>
      </form>
    </div>
  );
}
