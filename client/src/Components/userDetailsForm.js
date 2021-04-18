import React, { useState } from "react";
import AuthService from "../Services/AuthService";
import { logIn } from "../store/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";

export default function UserDetailsForm() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstname: user.firstname ? user.firstname : "",
    lastname: user.lastname ? user.lastname : "",
    age: user.age ? user.age : "",
    street: user.street ? user.street : "",
    city: user.city ? user.city : "",
    zipcode: user.zipcode ? user.zipcode : "",
  });

  const [submitState, setSubmitState] = useState({
    loading: 0,
    response: "",
  });

  const onSubmit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setSubmitState({
      loading: 1,
      response: "",
    });
    console.log(formData);
    AuthService.updateSelf(formData)
      .then((res) => {
        console.log(res.data);
        setSubmitState({
          loading: 2,
          response: "",
        });
        dispatch(logIn(res.data));
      })
      .catch((err) => {
        console.log(err.response.data);
        setSubmitState({
          loading: -1,
          response: err.response.data
            ? err.response.data
            : "Invalid Email Or Password",
        });
      });
  };

  return (
    <div className='flex flex-col items-center justify-center flex-grow w-full overflow-y-auto'>
      <form
        onSubmit={onSubmit}
        className='flex flex-col items-center justify-center gap-2 w-full px-3'>
        <div className='mb-5 text-2xl font-medium'>Finish Setting Up Your Account</div>
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
          placeholder='Age'
          type='text'
          name='age'
          value={formData.age}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          required
        />

        <input
          className='w-full placeholder-gray-400 border border-gray-200 hover:border-gray-300 focus:border-gray-500 focus:outline-none p-2 rounded-md'
          placeholder='Street'
          type='text'
          name='street'
          value={formData.street}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          required
        />

        <input
          className='w-full placeholder-gray-400 border border-gray-200 hover:border-gray-300 focus:border-gray-500 focus:outline-none p-2 rounded-md'
          placeholder='City'
          type='text'
          name='city'
          value={formData.city}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          required
        />

        <input
          className='w-full placeholder-gray-400 border border-gray-200 hover:border-gray-300 focus:border-gray-500 focus:outline-none p-2 rounded-md'
          placeholder='Zipcode'
          type='text'
          name='zipcode'
          value={formData.zipcode}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          required
        />

        <button className='w-full border mt-7 hover:border-gray-300 bg-blue-600 text-white focus:border-gray-500 focus:outline-none p-2 rounded-md'>
          Update User Details
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
      </form>
    </div>
  );
}
