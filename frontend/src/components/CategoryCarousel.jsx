import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Code2, Database, Palette, Sparkles, Layers3 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    ["Frontend Developer", Code2], ["Backend Developer", Database], ["Data Science", Sparkles], ["Graphic Designer", Palette], ["FullStack Developer", Layers3]
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <section className='page-shell my-16'>
            <div className='mb-6 flex items-center justify-between'><div><p className='eyebrow mb-2'>Explore by craft</p><h2 className='text-2xl font-bold tracking-tight text-slate-900'>What do you want to work on?</h2></div></div>
            <Carousel className="w-full">
                <CarouselContent>
                    {
                        category.map(([cat, Icon]) => (
                            <CarouselItem key={cat} className="basis-4/5 sm:basis-1/2 lg:basis-1/4">
                                <button onClick={()=>searchJobHandler(cat)} className="surface-card flex w-full items-center gap-3 p-4 text-left transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-lg">
                                    <span className='grid h-10 w-10 place-items-center rounded-xl bg-violet-50 text-violet-700'><Icon className='h-5 w-5' /></span><span className='font-semibold text-slate-800'>{cat}</span>
                                </button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </section>
    )
}

export default CategoryCarousel
