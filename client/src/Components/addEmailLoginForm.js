import React, { useState } from "react";
import AuthService from "../Services/AuthService";
import { logIn } from "../store/reducers/authReducer";
import { useDispatch } from "react-redux";

export default function AddEmailLoginForm() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    AuthService.addEmailLogin(formData)
      .then((res) => {
        setSubmitState({
          loading: 2,
          response:
            "Succesfully added email login",
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
        <div className='mb-5 text-4xl font-medium'>Add Email Login</div>
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
          Add Email
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
