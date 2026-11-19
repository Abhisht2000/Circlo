import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        fitlerType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    useEffect(()=>{
        dispatch(setSearchedQuery(selectedValue));
    },[selectedValue]);
    return (
        <aside className='surface-card w-full p-5'>
            <div className='mb-5 flex items-center justify-between'><h1 className='font-bold text-lg text-slate-900'>Filters</h1>{selectedValue && <button onClick={() => setSelectedValue('')} className='text-xs font-semibold text-violet-600'>Clear</button>}</div>
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    fitlerData.map((data, index) => (
                        <div key={data.fitlerType} className='border-t border-slate-100 py-4 first:border-0 first:pt-0'>
                            <h2 className='mb-3 text-sm font-bold text-slate-900'>{data.fitlerType}</h2>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    return (
                                    <div key={item} className='flex items-center space-x-2 py-1'>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label className='cursor-pointer text-sm font-normal text-slate-600' htmlFor={itemId}>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </aside>
    )
}

export default FilterCard
