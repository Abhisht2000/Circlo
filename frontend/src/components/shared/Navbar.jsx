import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, Menu, User2, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <header className='sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl'>
            <div className='page-shell flex h-[72px] items-center justify-between'>
                <Link to="/" className='flex items-center gap-2' onClick={() => setMenuOpen(false)}>
                    <span className='grid h-9 w-9 place-items-center rounded-xl bg-violet-600 text-lg font-black text-white shadow-lg shadow-violet-200'>C</span>
                    <h1 className='text-xl font-extrabold tracking-tight text-slate-900'>Circlo</h1>
                </Link>
                <div className='hidden items-center gap-8 md:flex'>
                    <ul className='flex font-medium items-center gap-6 text-sm text-slate-600'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                    <li><Link to="/browse">Browse</Link></li>
                                </>
                            )
                        }


                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant="outline">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className=''>
                                        <div className='flex gap-2 space-y-2'>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium'>{user?.fullname}</h4>
                                                <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2 text-gray-600'>
                                            {
                                                user && user.role === 'student' && (
                                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                        <User2 />
                                                        <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
                                                    </div>
                                                )
                                            }

                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <LogOut />
                                                <Button onClick={logoutHandler} variant="link">Logout</Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }

                </div>
                <Button variant="ghost" size="icon" className='md:hidden' onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</Button>
            </div>
            {menuOpen && <div className='border-t border-slate-100 bg-white px-4 py-4 md:hidden'>
                <div className='flex flex-col gap-3 text-sm font-medium text-slate-700'>
                    <Link onClick={() => setMenuOpen(false)} to="/">Home</Link><Link onClick={() => setMenuOpen(false)} to="/jobs">Jobs</Link><Link onClick={() => setMenuOpen(false)} to="/browse">Browse</Link>
                    {!user && <div className='flex gap-2 pt-2'><Link className='flex-1' to="/login"><Button variant="outline" className='w-full'>Log in</Button></Link><Link className='flex-1' to="/signup"><Button className='w-full bg-violet-600 hover:bg-violet-700'>Join Circlo</Button></Link></div>}
                </div>
            </div>}
        </header>
    )
}

export default Navbar
