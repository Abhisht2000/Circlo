import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { ArrowLeft, BriefcaseBusiness, Building2, CalendarDays, MapPin, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JobDescription = () => {
    const {singleJob} = useSelector(store => store.job);
    const {user} = useSelector(store=>store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
            
            if(res.data.success){
                setIsApplied(true); // Update the local state
                const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(()=>{
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob(); 
    },[jobId,dispatch, user?._id]);

    return (
        <main className='page-shell py-8 sm:py-12'>
            <button onClick={() => navigate(-1)} className='mb-7 flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-violet-700'><ArrowLeft className='h-4 w-4' /> Back to roles</button>
            <div className='grid gap-7 lg:grid-cols-[1fr_320px]'>
                <section className='surface-card overflow-hidden'>
                    <div className='bg-gradient-to-br from-violet-700 via-violet-600 to-indigo-700 p-7 text-white sm:p-10'>
                        <p className='mb-3 text-sm font-semibold text-violet-100'>{singleJob?.company?.name || 'Circlo opportunity'}</p>
                        <h1 className='text-3xl font-bold tracking-tight sm:text-4xl'>{singleJob?.title}</h1>
                        <div className='mt-5 flex flex-wrap gap-2'>
                            <Badge className='bg-white/15 text-white hover:bg-white/15' variant="ghost"><MapPin className='mr-1 h-3 w-3' />{singleJob?.location}</Badge>
                            <Badge className='bg-white/15 text-white hover:bg-white/15' variant="ghost"><BriefcaseBusiness className='mr-1 h-3 w-3' />{singleJob?.jobType}</Badge>
                            <Badge className='bg-white/15 text-white hover:bg-white/15' variant="ghost">₹{singleJob?.salary} LPA</Badge>
                        </div>
                    </div>
                    <div className='space-y-8 p-7 sm:p-10'><div><p className='eyebrow mb-3'>The role</p><p className='text-base leading-8 text-slate-600'>{singleJob?.description}</p></div><div><p className='eyebrow mb-3'>What you’ll bring</p><div className='flex flex-wrap gap-2'>{singleJob?.requirements?.map((item) => <Badge key={item} className='bg-slate-100 text-slate-700 hover:bg-slate-100' variant='ghost'>{item}</Badge>)}</div></div></div>
                </section>
                <aside className='surface-card h-fit p-6'><p className='text-sm font-bold text-slate-900'>Role overview</p><div className='mt-5 space-y-4 text-sm text-slate-600'><p className='flex gap-3'><Building2 className='h-4 w-4 text-violet-600' />{singleJob?.company?.name}</p><p className='flex gap-3'><Users className='h-4 w-4 text-violet-600' />{singleJob?.position} opening{singleJob?.position !== 1 ? 's' : ''}</p><p className='flex gap-3'><CalendarDays className='h-4 w-4 text-violet-600' />{singleJob?.experienceLevel || 0}+ years experience</p></div><Button onClick={isApplied ? null : applyJobHandler} disabled={isApplied} className={`mt-7 w-full ${isApplied ? 'bg-slate-500' : 'bg-violet-600 hover:bg-violet-700'}`}>{isApplied ? 'Application submitted' : 'Apply now'}</Button><p className='mt-3 text-center text-xs text-slate-500'>{singleJob?.applications?.length || 0} applicant{singleJob?.applications?.length === 1 ? '' : 's'} so far</p></aside>
            </div>
        </main>
    )
}

export default JobDescription
