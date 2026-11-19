import React from 'react'
import { Button } from './ui/button'
import { ArrowUpRight, Bookmark, BriefcaseBusiness, MapPin } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
    const navigate = useNavigate();
    // const jobId = "lsekdhjgdsnfvsdkjf";

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }
    
    return (
        <article className='surface-card group flex h-full flex-col p-6 transition duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl'>
            <div className='flex items-center justify-between'>
                <p className='text-xs font-medium text-slate-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Posted today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button variant="ghost" className="rounded-full text-slate-400 hover:text-violet-700" size="icon" aria-label="Save job"><Bookmark className='h-4 w-4' /></Button>
            </div>

            <div className='flex items-center gap-3 my-4'>
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-slate-100 text-sm font-bold text-slate-600">
                    {job?.company?.logo ? <Avatar><AvatarImage src={job.company.logo} /></Avatar> : job?.company?.name?.slice(0, 2).toUpperCase()}
                </div>
                <div>
                    <h1 className='font-semibold text-slate-900'>{job?.company?.name}</h1>
                    <p className='flex items-center gap-1 text-sm text-slate-500'><MapPin className='h-3.5 w-3.5' />{job?.location}</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-xl tracking-tight text-slate-900'>{job?.title}</h1>
                <p className='mt-2 text-sm leading-6 text-slate-600'>{job?.description}</p>
            </div>
            <div className='mt-5 flex flex-wrap items-center gap-2'>
                <Badge className={'bg-violet-50 text-violet-700 hover:bg-violet-50'} variant="ghost">₹{job?.salary} LPA</Badge>
                <Badge className={'bg-slate-100 text-slate-600 hover:bg-slate-100'} variant="ghost"><BriefcaseBusiness className='mr-1 h-3 w-3' />{job?.jobType}</Badge>
            </div>
            <div className='mt-auto flex items-center gap-3 pt-6'>
                <Button onClick={()=> navigate(`/description/${job?._id}`)} variant="outline" className='flex-1 border-slate-200'>View role</Button>
                <Button onClick={()=> navigate(`/description/${job?._id}`)} className="bg-violet-600 hover:bg-violet-700" size="icon" aria-label="View role"><ArrowUpRight className='h-4 w-4' /></Button>
            </div>
        </article>
    )
}

export default Job
