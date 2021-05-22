import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import BoardService from "../Services/BoardService";

export default function Home() {
  const history = useHistory()
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('board')) history.push('/boards/new')
    BoardService.getLatestBoards().then(res => {
      setBoards(res.data)
      console.log(res.data)
    }).catch(err => console.log(err))
  }, [])//eslint-disable-line



  return (
    <div className='h-full w-full inlinegrid place-items-center'>
      {!!boards.length && (
        <div className="w-full text-center p-4 text-2xl">Our Latest Additions</div>
      )}
      <div className="w-full flex flex-wrap gap-2 justify-center">

        {!!boards.length && boards.map((b, i) => (
          // eslint-disable-next-line
          <div key={i} onClick={() => history.push({ pathname: `/boards/${b._id}`, board: b })} className="cursor-pointer px-2 py-5 border rounded-md justify-center hover:bg-gray-100">
            <div className="flex flex-wrap justify-center max-w-xs gap-2">
              {b.images.map(im => (
                <div className="w-20 h-10 overflow-hidden rounded-md">
                  <img src={im.resource || ''} alt="  " className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            {/* <div className="flex gap-3 sm:justify-end sm:w-auto w-full justify-center mt-2">
            {loggedIn && (
                            <button onClick={(e) => { e.stopPropagation(); setAsHome(b._id) }} className={`focus:outline-none h-10 w-10 rounded-full hover:bg-blue-100 ${user.homeBoard === b._id ? 'text-blue-400' : 'text-gray-400'}`}>
                                <FontAwesomeIcon icon="home"></FontAwesomeIcon>
                            </button>
                        )}
            {loggedIn && (
              <button onClick={(e) => { e.stopPropagation(); toggleFavorites(b._id, !(favourites.some(f => f === b._id))) }} className={`focus:outline-none h-10 w-10 rounded-full hover:bg-blue-100 ${favourites.some(f => f === b._id) ? 'text-blue-400' : 'text-gray-400'}`}>
                <FontAwesomeIcon icon="star"></FontAwesomeIcon>
              </button>
            )}
            {loggedIn && b.user === user._id && (
              <button onClick={(e) => { e.stopPropagation(); deleteBoard(b._id, i) }} className="focus:outline-none h-10 w-10 rounded-full hover:bg-red-100 text-red-400">
                <FontAwesomeIcon icon="trash"></FontAwesomeIcon>
              </button>
            )}
          </div> */}
          </div>

        ))}
      </div>
      <div className="w-full py-5 flex flex-col items-center justify-center text-gray-600">
        {/* <span className="text-xl font-thin mb-5">You haven't set a board to your home screen yet</span> */}
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
    </div>
  );
}
