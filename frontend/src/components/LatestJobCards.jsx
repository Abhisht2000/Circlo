import React from 'react'
import { Badge } from './ui/badge'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (
        <div onClick={()=> navigate(`/description/${job._id}`)} className='group relative cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl'>
            <div className='flex items-start justify-between gap-3'>
                <div>
                    <h1 className='font-semibold text-lg text-slate-900'>{job?.company?.name}</h1>
                    <p className='mt-1 flex items-center gap-1 text-sm text-slate-500'><MapPin className='h-3.5 w-3.5' />{job?.location}</p>
                </div>
                <ArrowUpRight className='h-5 w-5 text-slate-300 transition group-hover:text-violet-600' />
            </div>
            <div>
                <h1 className='mt-6 font-bold text-xl text-slate-900'>{job?.title}</h1>
                <p className='mt-2 line-clamp-2 text-sm leading-6 text-slate-600'>{job?.description}</p>
            </div>
            <div className='mt-5 flex flex-wrap items-center gap-2'>
                <Badge className={'bg-blue-50 text-blue-700 hover:bg-blue-50'} variant="ghost">{job?.position} openings</Badge>
                <Badge className={'bg-orange-50 text-orange-700 hover:bg-orange-50'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'bg-violet-50 text-violet-700 hover:bg-violet-50'} variant="ghost">₹{job?.salary} LPA</Badge>
            </div>

        </div>
    )
}

export default LatestJobCards
