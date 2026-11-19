import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <section className='bg-gradient-to-b from-violet-50 via-white to-white'>
            <div className='mx-auto flex max-w-5xl flex-col gap-6 px-4 py-20 text-center sm:py-28'>
                <span className='mx-auto rounded-full border border-violet-100 bg-white px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm'>Find work that fits your next chapter</span>
                <h1 className='text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl'>Search, apply and land your <span className='text-[#6A38C2]'>next great role.</span></h1>
                <p className='mx-auto max-w-2xl text-base leading-7 text-slate-600'>Explore hand-picked opportunities from ambitious teams across India and remote-first companies.</p>
                <div className='flex w-full max-w-2xl shadow-lg border border-violet-100 bg-white pl-4 rounded-full items-center gap-4 mx-auto'>
                    <input
                        type="text"
                        placeholder='Job title, skill or company'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full'

                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2]">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
