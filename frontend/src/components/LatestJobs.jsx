import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job);
   
    return (
        <section className='max-w-7xl mx-auto my-20 px-4'>
            <div className='mb-7 flex items-end justify-between gap-4'>
                <div>
                    <p className='mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-violet-600'>Fresh opportunities</p>
                    <h1 className='text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl'>Latest & <span className='text-[#6A38C2]'>top openings</span></h1>
                </div>
                <span className='hidden text-sm text-slate-500 sm:block'>{allJobs.length} roles available</span>
            </div>
            <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
                {
                    allJobs.length <= 0 ? <span>No Job Available</span> : allJobs?.slice(0,6).map((job) => <LatestJobCards key={job._id} job={job}/>)
                }
            </div>
        </section>
    )
}

export default LatestJobs
