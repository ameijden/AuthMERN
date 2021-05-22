import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import Modal from '../Components/Modal'
import BoardService from '../Services/BoardService'
import { logIn } from '../store/reducers/authReducer'

export default function Boards(props) {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.auth.user)
    const favourites = useSelector(state => state.auth.user.favouriteMoodBoards)
    const loggedIn = useSelector(state => state.auth.loggedIn)

    const $modal = useRef()
    const [boards, setBoards] = useState([])
    const [localState, setLocalState] = useState(1)

    useEffect(() => {
        if (props.match.params.user === "my") {
            if (!user._id) history.push('/login')
            fetchBoards(user._id)
        } else {
            fetchBoards(props.match.params.user)
        }
        //console.log(user.favouriteMoodBoards);
    }, [props.match.params.user])//eslint-disable-line

    const fetchBoards = (user) => {
        setLocalState(1)
        BoardService.getBoardsByUser(user).then(res => {
            // console.log(res.data)
            setBoards(res.data)
            setLocalState(2)
        }).catch(err => {
            console.log(err)
            setLocalState(-1)
        })
    }

    const deleteBoard = async (board_id, i) => {
        const confirm = await $modal.current.confirm({
            title: "Confirm Board Deletion",
            message: "Are you sure you want to delete the selected board?",
            confirm: {
                color: "red",
                text: "Delete"
            }
        })
        if (confirm) {
            BoardService.deleteBoardByID(board_id).then(() => {
                setBoards(bs => {
                    bs.splice(i, 1)
                    return [...bs]
                })
            }).catch(err => console.log(err))
        }
    }

    // const setAsHome = (board_id) => {
    //     BoardService.setAsHome(board_id).then(res => {
    //         dispatch(logIn({ user: res.data }))
    //     }).catch(err => {
    //         console.log(err);
    //     })
    // }

    const toggleFavorites = async (board_id, toggle) => {
        try {
            if (toggle) {
                let res = await BoardService.addToFavorites(board_id)
                dispatch(logIn({ user: res.data }))
            } else {
                let res = await BoardService.removeFromFavorites(board_id)
                dispatch(logIn({ user: res.data }))
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="h-full w-full flex flex-col">
            <Modal ref={$modal} closeOnBlur={true}></Modal>
            <div className="w-full flex justify-between p-5 mb-5">
                <div className="flex gap-3 items-end">
                    <div className="px-2 text-2xl mb-1.5">User Boards</div>
                    {(props.match.params.user === "my" || props.match.params.user === user._id) && (
                        <Link to={'/my/favourites'} className="px-2 text-lg p-1 rounded-md hover:bg-gray-100 text-gray-600">View Favourites</Link>

                    )}
                </div>
                <Link to="/boards/new" className="px-2 text-lg p-1 rounded-md hover:bg-gray-100 text-gray-600">
                    <FontAwesomeIcon icon="plus" className="mr-3"></FontAwesomeIcon>
                    <span>New Board</span>
                </Link>
            </div>
            {localState === 1 && (
                <div className="w-full text-center">
                    <FontAwesomeIcon className="mt-10" icon="spinner" spin></FontAwesomeIcon>

                </div>
            )}
            {localState === 2 && !boards.length && (
                <div key={'asd'} className="w-full opacity-50 text-center text-sm">No boards to show</div>
            )}
            {boards.map((b, i) => (
                // eslint-disable-next-line
                <div key={i} onClick={() => history.push({ pathname: `/boards/${b._id}`, board: b })} className="cursor-pointer border-b px-5 py-2 w-full flex flex-wrap sm:justify-between justify-center hover:bg-gray-100">
                    <div className="flex flex-wrap w-52 gap-2">
                        {b.images.map(im => (
                            <div className="w-16 h-8 overflow-hidden rounded-md">
                                <img src={im.resource || ''} alt="  " className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-3 sm:justify-end sm:w-auto w-full justify-center mt-2">
                        {/* {loggedIn && (
                            <button onClick={(e) => { e.stopPropagation(); setAsHome(b._id) }} className={`focus:outline-none h-10 w-10 rounded-full hover:bg-blue-100 ${user.homeBoard === b._id ? 'text-blue-400' : 'text-gray-400'}`}>
                                <FontAwesomeIcon icon="home"></FontAwesomeIcon>
                            </button>
                        )} */}
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
                    </div>
                </div>
            ))}
        </div>
    )
}
