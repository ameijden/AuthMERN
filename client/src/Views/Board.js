import React, { useEffect, useRef, useState } from 'react'
import BoardComponent from '../Components/Board'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import BoardService from '../Services/BoardService'
import { logIn } from '../store/reducers/authReducer'
import { FacebookShareButton, FacebookIcon } from "react-share";
import config from '../Services/Config'
import Modal from '../Components/Modal'

export default function Board(props) {
    const dispatch = useDispatch()
    const history = useHistory()
    const { user, loggedIn } = useSelector(state => state.auth)
    const favourites = useSelector(state => state.auth.user.favouriteMoodBoards)
    const $modal = useRef()
    const [board, setBoard] = useState(false)
    const [favourite, setFavourite] = useState(false)

    useEffect(() => {
        if (props.location.board) {
            setBoard(props.location.board)
        } else {
            BoardService.getBoardByID(props.match.params.id).then(res => {
                setBoard(res.data)
            }).catch(err => {
                console.log(err);
            })
        }
    }, [props])//eslint-disable-line


    useEffect(() => {
        if (!board) return
        setFavourite(favourites.some(f => f === board._id))
        //console.log(board);
    }, [favourites, board])

    const deleteBoard = async () => {
        const confirm = await $modal.current.confirm({
            title: "Confirm Board Deletion",
            message: "Are you sure you want to delete this board?",
            confirm: {
                color: "red",
                text: "Delete"
            }
        })
        if (confirm) {
            BoardService.deleteBoardByID(board._id).then(() => {
                history.push('/my/boards');
            }).catch(err => console.log(err))
        }
    }

    // const setAsHome = () => {
    //     BoardService.setAsHome(board._id).then(res => {
    //         dispatch(logIn(res.data))
    //         //console.log(res.data)
    //     })
    // }

    const toggleFavorites = async (toggle) => {
        try {
            if (toggle) {
                let res = await BoardService.addToFavorites(board._id)
                dispatch(logIn({ user: res.data }))
            } else {
                let res = await BoardService.removeFromFavorites(board._id)
                dispatch(logIn({ user: res.data }))
            }
        } catch (err) {
            console.log(err)
        }
    }

    const getShareLink = () => {
        try {
            navigator.clipboard.writeText(`${config.CLIENT}/boards/${board._id}`)
        } catch (err) {
            console.log(err)
        }
        $modal.current.hide()
    }

    const useTemplate = async () => {
        const confirm = await $modal.current.confirm({
            title: "Template Board",
            message: "Are you sure you want to use this board as a template to create a new board? You will be redirected from this page.",
            confirm: {
                color: "green",
                text: "Yes"
            }
        })
        if (confirm) {
            localStorage.setItem('board', JSON.stringify(board.images))
            history.push('/boards/new')
        }
    }

    const shareBoard = () => {
        // console.log(`${config.CLIENT}/boards/${board._id}`);
        $modal.current.set(
            <div className="w-60 bg-white flex flex-col items-center justify-center p-2 rounded-md">
                <div className="w-full flex justify-between border-b pb-2 mb-3">
                    <span>Share This Board</span>
                    <button>
                        <FontAwesomeIcon icon="times"></FontAwesomeIcon>
                    </button>
                </div>
                <div className="w-full flex flex-wrap justify-center mb-2 gap-5">
                    <FacebookShareButton className="hover:opacity-75" onShareWindowClose={() => $modal.current.hide()} url={`${config.CLIENT}/boards/${board._id}`}>
                        <FacebookIcon size={32} round={true}></FacebookIcon>
                    </FacebookShareButton>
                    <button title="Copy Link" onClick={() => getShareLink()} className="hover:opacity-75 focus:outline-none w-8 h-8 rounded-full bg-green-500 text-white">
                        <FontAwesomeIcon icon="link"></FontAwesomeIcon>
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="h-full w-full flex flex-col">

            <Modal ref={$modal} closeOnBlur={true}></Modal>
            <div className="w-full h-full inline-grid place-items-center mt-5">

                {!!board ? (
                    <>
                        <div className="w-full flex justify-center gap-5">
                            {/* {loggedIn && (
                                <button title="Set To Home" onClick={() => { setAsHome() }} className={`focus:outline-none h-10 w-10 rounded-full hover:bg-blue-100 ${user.homeBoard === board._id ? 'text-blue-400' : 'text-gray-400'}`}>
                                    <FontAwesomeIcon icon="home"></FontAwesomeIcon>
                                </button>
                            )} */}
                            {loggedIn && (
                                <button title={favourite ? "Remove From Favourites" : "Add To Favourites"} onClick={() => { toggleFavorites(!favourite) }} className={`focus:outline-none h-10 w-10 rounded-full hover:bg-blue-100 ${favourite ? 'text-blue-400' : 'text-gray-400'}`}>
                                    <FontAwesomeIcon icon="star"></FontAwesomeIcon>
                                </button>
                            )}
                            <button title="Use Template" onClick={useTemplate} className="focus:outline-none h-10 w-10 rounded-full hover:bg-green-100 text-green-400">
                                <FontAwesomeIcon icon="clone"></FontAwesomeIcon>
                            </button>
                            <button title="Share" onClick={(e) => { shareBoard() }} className="focus:outline-none h-10 w-10 rounded-full hover:bg-green-100 text-green-400">
                                <FontAwesomeIcon icon="share"></FontAwesomeIcon>
                            </button>
                            {loggedIn && board.user === user._id && (
                                <button title="Delete Board" onClick={(e) => { deleteBoard() }} className="focus:outline-none h-10 w-10 rounded-full hover:bg-red-100 text-red-400">
                                    <FontAwesomeIcon icon="trash"></FontAwesomeIcon>
                                </button>
                            )}
                        </div>

                        <BoardComponent board={board} favourite={favourites.some(f => f === board._id)}>

                        </BoardComponent>
                    </>
                ) : (
                    <FontAwesomeIcon icon="spinner" spin size="2x"></FontAwesomeIcon>
                )}
            </div>
        </div>
    )
}
