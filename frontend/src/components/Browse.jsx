import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

// const randomJobs = [1, 2,45];

const Browse = () => {
    useGetAllJobs();
    const {allJobs} = useSelector(store=>store.job);
    const dispatch = useDispatch();
    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""));
        }
    },[])
    return (
        <div>
            <Navbar />
            <main className='page-shell py-10'>
                <div className='mb-8 rounded-3xl bg-slate-950 px-6 py-10 text-white sm:px-10'><p className='text-sm font-semibold uppercase tracking-[0.18em] text-violet-300'>Search results</p><h1 className='mt-2 text-3xl font-bold tracking-tight'>Discover {allJobs.length} open roles</h1><p className='mt-3 max-w-xl text-sm leading-6 text-slate-300'>Browse positions from growing teams, then apply when the fit feels right.</p></div>
                <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
                    {
                        allJobs.map((job) => {
                            return (
                                <Job key={job._id} job={job}/>
                            )
                        })
                    }
                </div>

            </main>
        </div>
    )
}

export default Browse
