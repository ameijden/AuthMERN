import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import config from "../Services/Config";
import AuthService from "../Services/AuthService";
import Modal from "../Components/modal";
import AddEmailLoginForm from "../Components/addEmailLoginForm";
import qs from 'query-string'

import { logIn } from "../store/reducers/authReducer";
import { useDispatch } from "react-redux";

function Profile(props) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const [submitState, setSubmitState] = useState({
    loading: 0,
    response: "",
  });


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
        await AuthService.userFacebookAuthenticate(search.code, "profile")
          .then((res) => {
            setSubmitState({
              loading: 2,
              response:
                "Succesfully added Facebook login",
            });
            dispatch(logIn(res.data));
          })
          .catch((err) => {
            setSubmitState({
              loading: -1,
              response:
                "Failed to register this login method",
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
        await AuthService.userInstagramAuthenticate(search.code, "profile")
          .then((res) => {
            setSubmitState({
              loading: 2,
              response:
                "Succesfully added Instagram login",
            });
            dispatch(logIn(res.data));
          })
          .catch((err) => {
            setSubmitState({
              loading: -1,
              response:
                "Failed to register this login method",
            });
            console.log(err);
          });
      }
    }
  };


  return (
    <div className='py-5 px-5 sm:py-10 sm:px-10 md:py-14 md:px-14 lg:py-20 lg:px-20'>
      <div className='pb-7 text-xl font-semibold'>User Details</div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 sm:gap-14 md:gap-16 lg:gap-20'>
        <div>
          <div className='ml-2'>
            <div className='ml-1'>First Name</div>
            <div className='w-32 h-1 bg-blue-600 rounded-xl mt-1'></div>
          </div>
          <div className='my-3 p-3 bg-gray-100 rounded-md'>
            {user.firstname}
          </div>
        </div>
        <div>
          <div className='ml-2'>
            <div className='ml-1'>Last Name</div>
            <div className='w-32 h-1 bg-blue-600 rounded-xl mt-1'></div>
          </div>
          <div className='my-3 p-3 bg-gray-100 rounded-md'>{user.lastname}</div>
        </div>
        <div>
          <div className='ml-2'>
            <div className='ml-1'>Email</div>
            <div className='w-32 h-1 bg-blue-600 rounded-xl mt-1'></div>
          </div>
          <div className='truncate my-3 p-3 bg-gray-100 rounded-md'>
            {user.email}
          </div>
        </div>
        <div className=''>
          <div className='ml-2'>
            <div className='ml-1'>Age</div>
            <div className='w-32 h-1 bg-blue-600 rounded-xl mt-1'></div>
          </div>
          <div className='my-3 p-3 bg-gray-100 rounded-md'>
            {user.age} years
          </div>
        </div>
        <div>
          <div className='ml-2'>
            <div className='ml-1'>Street</div>
            <div className='w-32 h-1 bg-blue-600 rounded-xl mt-1'></div>
          </div>
          <div className='my-3 p-3 bg-gray-100 rounded-md'>{user.street}</div>
        </div>
        <div>
          <div className='ml-2'>
            <div className='ml-1'>Zipcode</div>
            <div className='w-32 h-1 bg-blue-600 rounded-xl mt-1'></div>
          </div>
          <div className='my-3 p-3 bg-gray-100 rounded-md'>{user.zipcode}</div>
        </div>
        <div>
          <div className='ml-2'>
            <div className='ml-1'>City</div>
            <div className='w-32 h-1 bg-blue-600 rounded-xl mt-1'></div>
          </div>
          <div className='my-3 p-3 bg-gray-100 rounded-md'>{user.city}</div>
        </div>
      </div>

      <Modal
        open={isOpen}
        onClose={toggleModal}
        closeButtonShow={true}
        outSideTouchClose={false}>
        <AddEmailLoginForm
        ></AddEmailLoginForm>
      </Modal>

      <div className='w-full h-0.5 my-10 bg-gray-500'></div>
      <div className='text-xl font-semibold'>Set Login Method</div>
      <div className='my-10 flex flex-col items-center gap-5'>
        <span className={`text-sm font-semibold ${submitState.loading === 2 && 'text-green-600'} ${submitState.loading === -1 && 'text-red-600'}`}>{submitState.response}</span>
        {!!user.email && !!user.facebook_id && !!user.instagram_id && (
          <span className="text-gray-400 text-lg">All Login Methods Configured!</span>
        )}
        {user.email === null && (
          <button
            className='py-3 max-w-xs w-full bg-gray-700 text-white rounded font-semibold space-x-3'
            onClick={toggleModal}>
            <FontAwesomeIcon
              size='lg'
              icon={["fa", "envelope"]}></FontAwesomeIcon>
            <span>Add Email Login</span>
          </button>
        )}
        {user.facebook_id === null && (
          <a
            href={`${config.FB.AUTH_CODE_URL}?client_id=${config.FB.CLIENT_ID
              }&redirect_uri=${config.FB.REDIRECT_URI.replace(
                "login",
                "profile",
              )}`}
            className='w-full bg-blue-600 hover:bg-blue-700 font-semibold text-white rounded-md p-3 flex gap-2 items-center justify-center max-w-xs'>
            <FontAwesomeIcon
              size='lg'
              icon={["fab", "facebook"]}></FontAwesomeIcon>
            <span>Add Facebook Login</span>
          </a>
        )}
        {user.instagram_id === null && (
          <a
            href={`${config.INSTAGRAM.AUTH_CODE_URL}?client_id=${config.INSTAGRAM.CLIENT_ID
              }&redirect_uri=${config.INSTAGRAM.REDIRECT_URI.replace(
                "login",
                "profile",
              )}&response_type=code&scope=user_profile`}
            className='w-full bg-gradient-to-bl from-pink-600 hover:from-yellow-300 via-purple-600  to-yellow-300 hover:to-pink-600 font-semibold text-white rounded-md p-3 flex gap-2 items-center justify-center
							max-w-xs
						'>
            <FontAwesomeIcon
              size='lg'
              icon={["fab", "instagram"]}></FontAwesomeIcon>
            <span>Add Instagram Login</span>
          </a>
        )}
      </div>
    </div>
  );
}

export default Profile;
