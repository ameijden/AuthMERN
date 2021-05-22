import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Modal from '../Components/Modal'
import BoardService from '../Services/BoardService'
import config from '../Services/Config'

const initBoard = Array(12).fill({
    resource: undefined
})

export default function CreateBoard() {
    const history = useHistory()
    const loggedIn = useSelector(state => state.auth.loggedIn)
    const $modal = useRef()
    const [board, setBoard] = useState(JSON.parse(localStorage.getItem('board')) || initBoard)
    const [resourceImages, setResourceImages] = useState([])
    const [localState, setLocalState] = useState({
        loading: 0,
        response: ""
    })

    useEffect(() => {
        if (localStorage.getItem('board')) localStorage.removeItem('board')
        BoardService.getResources().then(res => {
            console.log(res.data)
            setResourceImages(res.data)
            if (board[0].resource === undefined) {
                setBoard(b => {
                    b[0] = {
                        position: 0,
                        resource: `${config.SERVER}/resources/${res.data[0]}`
                    }
                    return [...b]
                })
            }
        }).catch(err => console.log(err))
    }, [])//eslint-disable-line

    const setResource = async (i) => {
        let resolve;
        let resource = new Promise(res => { resolve = res })
        $modal.current.set(
            <div className="relative max-h-screen max-w-screen-lg flex flex-col bg-white">
                <div className="sticky border-b w-full flex justify-between items-center py-5 px-5">
                    <span className="text-xl">Select An Image</span>
                    <button onClick={() => $modal.current.hide()} className="inline-grid place-items-center focus:outline-none h-8 w-8 hover:bg-gray-100 rounded-full">
                        <FontAwesomeIcon icon="times" className="text-xl"></FontAwesomeIcon>
                    </button>
                </div>
                <div className="w-full flex flex-wrap justify-center overflow-y-auto no-scrollbar">
                    {resourceImages.map((resource) => (
                        <div key={resource} className="lg:w-80 sm:w-64 w-80 lg:h-40 sm:h-32 h-40 p-2 overflow-hidden">
                            <div onClick={() => resolve(`${config.SERVER}/resources/${resource}`)} className="group relative cursor-pointer inline-grid place-items-center w-full h-full bg-gray-100 rounded-md hover:shadow transition-all duration-300">
                                <img className="border h-full w-full object-cover" src={`${config.SERVER}/resources/${resource}`} alt=" " />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            ,
            resolve
        )
        resource = await resource;
        $modal.current.hide()
        if (!!resource) {
            setBoard(b => {
                b[i] = {
                    position: i,
                    resource: resource
                }
                return [...b]
            })
        }
    }

    const deleteResource = (e, i) => {
        e.stopPropagation();
        setBoard(b => {
            b[i] = {
                position: i,
                resource: undefined
            }
            return [...b]
        })
    }

    const showInfo = () => {
        $modal.current.set(
            <div className="bg-white max-w-lg flex flex-col p-2 rounded-lg">
                <div className="w-full py-2 px-2 border-b text-lg font-semibold flex justify-between">
                    <span>
                        How Does This Work?
                    </span>
                    <button onClick={$modal.current.hide} className="focus:outline-none">
                        <FontAwesomeIcon icon="times"></FontAwesomeIcon>
                    </button>
                </div>
                <div className="w-full px-2 py-2">
                    Mood boards are physical or digital collages that arrange images, or other design
                    elements into a format that's representative of the final design's style.
                    <br />
                    <br />
                    To start creating a Mood Board, click on any of the empty boxes on the screen select an image
                    of your choice from the resulting images displayed on the screen. You'll see that the image has
                    now filled the empty box you clicked. Keep following this method to fill in all boxes with images
                    of your choice.
                    <br />
                    <br />
                    You can replace an image by simply clicking on the image again and
                    reselecting another image of your choice
                    <br />
                    <br />
                    You can delete an image by clicking on the small red button displayed on the top right of each image
                    <br />
                    <br />
                    Once you've filled in all the boxes, click the Save button displayed below the board.
                    <br />
                    (You must be logged in to save the board)
                </div>
            </div>
        )
    }

    const save = () => {
        setLocalState({
            loading: 1,
            response: ""
        })
        const hasEmptyBlocks = board.some(b => !b.resource)
        if (hasEmptyBlocks) {
            setLocalState({
                loading: -1,
                response: "Some boxes are still empty. Please fill in all boxes with images"
            })
            return
        }
        if (!loggedIn) {
            // dispatch(sb(board))
            localStorage.setItem("board", JSON.stringify(board))
            history.push('/login')
        } else {
            //do your thing
            BoardService.createBoard(board).then(res => {
                history.push('/my/boards')
            })
        }
    }

    return (
        <div className="h-full w-full">
            <div className="flex flex-col items-center justify-center h-full w-full">
                <Modal closeOnBlur={true} ref={$modal}></Modal>
                <div className="w-full flex justify-end py-2 px-5">
                    <button onClick={showInfo} className="focus:outline-none text-gray-400 hover:text-gray-500 text-2xl">
                        <FontAwesomeIcon icon="info-circle"></FontAwesomeIcon>
                    </button>
                </div>
                <div className="w-full max-w-screen-lg flex flex-wrap justify-center">
                    {board.map((b, i) => (
                        <div key={i} className="lg:w-80 sm:w-64 w-80 lg:h-40 sm:h-32 h-40 p-2">
                            <div onClick={() => setResource(i)} className={`overflow-hidden group relative cursor-pointer inline-grid place-items-center w-full h-full ${!b.resource ? 'bg-gray-100' : 'bg-gray-50'} rounded-md hover:shadow-lg transition-all duration-300 ${localState.loading === -1 && !b.resource ? 'ring-1 ring-red-400' : ''}`}>
                                <img className="h-full w-full object-cover z-10" src={b.resource || ''} alt=" " />
                                {!!b.resource && (
                                    <button onClick={(e) => deleteResource(e, i)} className="inlinegrid place-items-center absolute z-10 top-2 right-2 h-6 w-6 rounded-full bg-red-400 bg-opacity-70 hover:bg-opacity-100">
                                        <FontAwesomeIcon className="text-white" icon="times" size="1x"></FontAwesomeIcon>
                                    </button>
                                )}
                                <FontAwesomeIcon className="z-0 absolute text-gray-400 group-hover:text-gray-500 transition-colors duration-300" icon="plus"></FontAwesomeIcon>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="w-full flex flex-col items-center py-5">
                    <div className={`mb-2 text-sm ${localState.loading === -1 ? 'text-red-600' : "text-green-600"}`}>{localState.response}</div>
                    <button onClick={save} className="w-80 bg-blue-400 p-2 font-semibold text-white rounded-md hover:bg-blue-500 focus:outline-none">Save Board</button>
                </div>
            </div>

        </div>
    )
}
