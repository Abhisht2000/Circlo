import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);

    return (
        <div>
            <Navbar />
            <main className='page-shell py-8 sm:py-10'>
                <div className='mb-8'><p className='eyebrow mb-2'>Opportunity board</p><h1 className='text-3xl font-bold tracking-tight text-slate-900'>Find a role worth growing into</h1><p className='mt-2 text-slate-600'>{filterJobs.length} curated opportunities ready for you.</p></div>
                <div className='flex flex-col gap-6 lg:flex-row'>
                    <div className='w-full lg:w-64 lg:shrink-0'>
                        <FilterCard />
                    </div>
                    {
                        filterJobs.length <= 0 ? <div className='surface-card flex flex-1 flex-col items-center justify-center p-12 text-center'><h2 className='text-lg font-bold'>No roles match that filter</h2><p className='mt-2 text-sm text-slate-500'>Try a different keyword or clear the filters.</p></div> : (
                            <div className='flex-1 pb-5'>
                                <div className='grid gap-5 sm:grid-cols-2 xl:grid-cols-3'>
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                key={job?._id}>
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </main>


        </div>
    )
}

export default Jobs
