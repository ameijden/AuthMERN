import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Board from "../Components/Board";
import Modal from "../Components/Modal";
import UserDetailsForm from "../Components/UserDetailsForm";
import BoardService from "../Services/BoardService";

export default function Home() {
  const history = useHistory()
  const $modal = useRef()
  const user = useSelector((state) => state.auth.user);
  const [board, setBoard] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('board')) history.push('/boards/new')
    if (!!user.homeBoard) {
      BoardService.getBoardByID(user.homeBoard).then(res => {
        setBoard(res.data)
      }).catch(err => {
        console.log(err)
      })
    }
  }, [])//eslint-disable-line


  return (
    <div className='h-full w-full inlinegrid place-items-center'>
      {
        !board && (
          <div className="h-full flex flex-col items-center justify-center text-gray-600">
            <span className="text-xl font-thin mb-5">You haven't set a board to your home screen yet</span>
            <Link className="font-semibold hover:bg-gray-100 py-1 px-3 rounded-md" to="/boards/new">
              Create a new board
              <FontAwesomeIcon className="ml-3" icon="arrow-right"></FontAwesomeIcon>
            </Link>
            <span>or</span>
            <Link className="font-semibold hover:bg-gray-100 py-1 px-3 rounded-md" to="/my/favourites">
              View Your Favorites
              <FontAwesomeIcon className="ml-3" icon="arrow-right"></FontAwesomeIcon>
            </Link>
          </div>
        )
      }
      {
        !!board && (
          <Board board={board} favourite={user.favouriteMoodBoards.some(f => f === board._id)}></Board>
        )
      }
      <Modal
        ref={$modal}
        closeOnBlur={false}>
        <UserDetailsForm></UserDetailsForm>
      </Modal>
    </div>
  );
}
