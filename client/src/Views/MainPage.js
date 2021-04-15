import React, { useEffect, useState } from "react";
import RenderHtml from "../Components/RenderHtml";

import Category from "../Components/Category";
import RecordsService from "../Services/RecordsService";
import sv from "../styles/variables";
import { useHistory } from "react-router-dom";
import Welcome from "../Components/Welcome";

export default function MainPage() {
    const history = useHistory();
    const [navbarOpen, setNavbarOpen] = React.useState(true);
    const [searching, setSearching] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const [selectedRecord, setSelectedRecord] = React.useState(null);
    const [results, setResults] = React.useState([]);
    const [showResults, setShowResults] = useState(false);
    const [categories, setCategories] = React.useState([]);

    useEffect(() => {
        RecordsService.fetchCategories()
            .then((res) => {
                setCategories(res.data);
            })
            .catch((err) => {
                if (err.response && err.response.status === 503) history.push('/503')
                return err;
            });
    }, []);// eslint-disable-line

    useEffect(() => {
        setResults([]);
        const timeOutId = setTimeout(() => {
            if (!search) return;
            setSearching(true);
            RecordsService.matchRecordsByInfo(search)
                .then((res) => {
                    setSearching(false);
                    setResults(res.data);
                    // console.log(res.data)
                })
                .catch((err) => {
                    if (err.response && err.response.status === 503) history.push('/503')
                    setSearching(false);
                    return err;
                });
        }, 500);
        return () => clearTimeout(timeOutId);
    }, [search]);// eslint-disable-line

    let getCategories = (r, cats = []) => {
        for (let k in cats) {
            let c = cats[k];
            if (c._id === r.parent) {
                return new Array(1).fill(c.name);
            } else if (c.categories) {
                let find = getCategories(r, c.categories);
                if (find.length > 0) {
                    find.unshift(c.name);
                    return find;
                }
            }
        }
        return [];
    };

    let handleRecordClick = (record, cats = null) => {
        if (!cats) cats = getCategories(record, categories);
        setSelectedRecord({
            ...record,
            categories: [...cats],
        });
        if (window.innerWidth <= 768) {
            setNavbarOpen(false);
        }
    };
    return (
        <div className="h-full overflow-y-scroll no-scrollbar">
            <Welcome />
            <div id="main" className='flex flex-col w-full h-full'>
                <div className='flex flex-row h-full relative'>
                    <div className='z-30 w-full absolute flex justify-between p-2.5'>
                        <button
                            className='text-white space-y-1.5 cursor-pointer text-xl leading-none py-1 border border-solid border-transparent rounded bg-transparent block outline-none focus:outline-none'
                            type='button'
                            onClick={() => setNavbarOpen(!navbarOpen)}>
                            <div
                                className={`w-3 h-0.5 bg-${sv.primary
                                    } transition-all duration-500 transform rotate-45 "
                            ${navbarOpen ? "-rotate-45" : "rotate-45"}`}></div>
                            <div
                                className={`w-3 h-0.5 bg-${sv.primary
                                    } transition-all duration-500 transform -rotate-45"
                            ${navbarOpen ? "rotate-45" : "-rotate-45"}`}></div>
                        </button>
                    </div>

                    <div
                        className={`flex flex-col h-full pt-5 bg-gray-50 border-r border-gray-200 transition-all duration-500 md:w-80 w-full
                        ${navbarOpen
                                ? "md:relative md:z-0 z-20 absolute opacity-100"
                                : "absolute z-0 opacity-0"
                            }`}
                        style={{ minWidth: "20rem" }}>
                        <div className='group flex flex-col w-full my-3 relative justify-center items-center px-2'>
                            <input
                                onFocus={() => setShowResults(true)}
                                onBlur={() => setShowResults(false)}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder='Search for records...'
                                className={`w-full mt-1 p-2 border-gray-300 border focus:ring-1 focus:border-${sv.primary} focus:outline-none shadow-sm sm:text-sm rounded-md`}
                            />
                            {searching && (
                                <div className='z-10 absolute self-end p-2 mt-1'>
                                    <div
                                        className={`w-3 h-3 rounded-full border-t-2 border-${sv.primary} animate-spin`}></div>
                                </div>
                            )}
                            <div
                                className={`relative w-full ${showResults ? "block" : "hidden"}`}>
                                {results.length > 0 && showResults && (
                                    <div className='w-full absolute z-10 bg-white border border-gray-300 overflow-y-auto max-h-40 rounded-md mt-1'>
                                        <div className="flex flex-col">
                                            {results.map((r, i) => (
                                                <button
                                                    onMouseDown={() => handleRecordClick(r)}
                                                    className='text-sm w-full truncate hover:bg-gray-100 p-2'
                                                    key={i}
                                                    value={r}>
                                                    {r.info}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='flex flex-col flex-grow overflow-y-auto px-2'>
                            {categories.length > 0 &&
                                categories.map((c, i) => (
                                    <Category
                                        category={c}
                                        key={i}
                                        recordSelected={handleRecordClick}
                                        selectedRecord={selectedRecord}
                                    />
                                ))}
                            <div className='py-6'></div>
                        </div>
                    </div>
                    <div className='z-10 transition-all flex h-full justify-center duration-500 flex-grow bg-white overflow-y-auto'>
                        {!!selectedRecord ? (
                            <div className='flex flex-col w-4/5 border-l border-r px-5 py-10'>
                                <div className='w-full flex flex-row flex-wrap'>
                                    <span className='text-sm text-gray-800 mr-2'>
                                        {selectedRecord.categories[0]}
                                    </span>
                                    <span className='text-sm text-gray-800 mr-2'>{">"}</span>
                                    <span className='text-sm text-gray-700 mr-2'>
                                        {selectedRecord.categories[1]}
                                    </span>
                                    <span className='text-sm text-gray-800 mr-2'>{">"}</span>
                                    <span className='text-sm text-gray-600 mr-2'>
                                        {selectedRecord.categories[2]}
                                    </span>
                                </div>
                                {selectedRecord.tags && (
                                    <div className='mb-10 items-center flex flex-wrap rounded mt-5 text-sm space-y-1'>
                                        <span>Tagged as: </span>
                                        {selectedRecord.tags.split(',').map((item, index) => (
                                            <span
                                                className={`rounded-3xl border border-${sv.primary} text-${sv.primary} py-0.5 px-2 ml-1`}
                                                key={index}>
                                                <span>{item}</span>
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <span
                                    className={`
                            text-${sv.mainPanel.record.info.textColor} 
                            sm:text-${sv.mainPanel.record.info.lg.textSize} 
                            text-${sv.mainPanel.record.info.sm.textSize} 
                            font-${sv.mainPanel.record.info.textWeight} 
                            mb-5 border-b pb-2`}>
                                    {selectedRecord.info}
                                </span>
                                <span
                                    className={`
                            text-${sv.mainPanel.record.mnemonic.textColor} 
                            sm:text-${sv.mainPanel.record.mnemonic.lg.textSize} 
                            text-${sv.mainPanel.record.mnemonic.sm.textSize} 
                            font-${sv.mainPanel.record.mnemonic.textWeight} 
                            mb-7`}>
                                    <span>Mnemonic:</span>
                                    <span className='ml-3'>{selectedRecord.mnemonic}</span>
                                </span>
                                <span>
                                    <div className='sm:text-2xl text-xl text-gray-800 font-bold border-b pb-1'>
                                        Explanation:
                                </div>
                                    {/* <div dangerouslySetInnerHTML={{ __html: selectedRecord.explanation }} className='ml-5 font-semibold'></div> */}
                                    <div className='mt-5 mb-48'>
                                        {selectedRecord.explanation.map((block, index) => (
                                            <RenderHtml block={block} key={index}></RenderHtml>
                                        ))}
                                    </div>
                                </span>
                            </div>
                        ) : (
                            <div className='h-full w-full flex flex-col p-2 items-center justify-center'>
                                <div
                                    className={`lg:text-4xl text-2xl text-center text-${sv.primary} opacity-50 font-thin select-none`}>
                                    Select a record to view it here
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
}
