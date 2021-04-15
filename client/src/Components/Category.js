import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import RecordsService from '../Services/RecordsService'
import sv from "../styles/variables"

export default function Category({ category, recordSelected, selectedRecord }) {
    const history = useHistory();
    let [toggle, setToggle] = useState(false)
    let [loading, setLoading] = useState(false)
    let [records, setRecords] = useState([])

    const handleCategoryClick = () => {
        if (!category.categories && !toggle && records.length === 0) {
            setLoading(true)
            RecordsService.fetchRecordsByCategories(category._id).then(res => {
                setRecords(res.data)
                setLoading(false)
            }).catch(err => {
                setLoading(false)
                if (err.response && err.response.status === 503) history.push('/503')
                return err
            })
        }
        setToggle(!toggle)
    }



    const handleRecordClick = (r, categories = null) => {
        if (categories) {
            categories.unshift(category.name)
        } else {
            categories = [category.name]
        }
        recordSelected(r, categories);
    }

    useEffect(() => {
        setToggle(false)
        if (!!selectedRecord && selectedRecord.categories[category.level] && selectedRecord.categories[category.level] === category.name) {
            setToggle(true)
            if (!category.categories && !toggle && records.length === 0) {
                setLoading(true)
                RecordsService.fetchRecordsByCategories(category._id).then(res => {
                    setRecords(res.data)
                    setLoading(false)
                }).catch(err => {
                    setLoading(false)
                    if (err.response && err.response.status === 503) history.push('/503')
                    return err
                })
            }
        }
    }, [selectedRecord, category])// eslint-disable-line

    return (
        <div className="flex flex-col my-1">
            <button onClick={handleCategoryClick} className={`flex flex-row items-center justify-between w-full text-left  
            text-${sv.sidePanel.category[category.level].textColor} 
            text-${sv.sidePanel.category[category.level].textSize} 
            font-${sv.sidePanel.category[category.level].textWeight} 
            focus:outline-none hover:opacity-100 opacity-70`}>

                <span>{category.name}</span>
                {loading && (
                    <div
                        className={`
                    inline-block w-3 h-3 ml-3 rounded-full border-t-2 
                    border-${sv.sidePanel.category[category.level].textColor} 
                    animate-spin`}></div>
                )}
                {!loading && (
                    <div className="inline-block font-bold w-4 text-center">
                        <span>{toggle ? '- ' : '+ '}</span>
                    </div>
                )}
            </button>
            <div className={`ml-1.5 flex flex-col ${toggle ? "block" : "hidden"}`}>
                {category.categories && category.categories.map((c, i) => (
                    <Category category={c} key={i} recordSelected={handleRecordClick} selectedRecord={selectedRecord} />
                ))}
                {!category.categories && records.length === 0 && !loading && (
                    <div className="text-gray-400 text-xs ml-4">No Records</div>
                )}
                {records.length > 0 && records.map((r, i) => (
                    <button key={i} onClick={() => handleRecordClick(r)}
                        className={`
                    leading-4 my-2 text-sm ml-5 max-w-xs text-wrap text-left 
                    text-${sv.sidePanel.record.textColor} 
                    text-${sv.sidePanel.record.textSize} 
                    font-${sv.sidePanel.record.textWeight} 
                    focus:outline-none hover:opacity-100 opacity-70`}>
                        <span className={`${selectedRecord && selectedRecord._id === r._id ? 'font-semibold' : ''}`}>{r.info}</span>
                    </button>
                ))}
            </div>
        </div >
    )
}
