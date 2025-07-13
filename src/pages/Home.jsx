import React from 'react'
import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { Link } from 'react-router-dom'
import Message from '../assets/message.png'
import Search from '../assets/search.png'
import Ana from '../assets/ana.png'
import Mia from '../assets/mia.png'
import Eren from '../assets/eren.png'
import Services from '../assets/services.png'
import Fav from '../assets/fav.png'
import Bell from '../assets/bell.png'
import User from '../assets/user.png'
import ProductForm from '../components/ProductForm'
import Authentication from '../components/Auth'

function Home() {
  const [user, setUser] = useState(null)
  const [pro, setPro] = useState(null)

  const nombrePro = (nombre) =>{
    setPro(nombre)
  }
  console.log(pro)

  useEffect(() => {
    // Verifica si ya hay sesión al cargar
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)// guardamos identidad
    })

    // Escucha cambios en autenticación
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])
  if (!user) {
    return (
      <>
      <div className='flex flex-col items-center justify-evenly h-[854px] w-[425px] bg-gradient-to-b from-[#F06A3E] to-white'>
      <div className='flex flex-col items-center gap-4 p-6'>
        <p>No estás autenticado</p>
        <Authentication />
      </div>
      </div>
      </>
    )
  }

  return (
    <>
    <div className='flex flex-col justify-evenly h-[854px] w-[425px] bg-gradient-to-b from-[#F06A3E] to-white'>
         <div className='flex justify-around'>
            <div className='flex flex-col'>
            <h1 className='text-2xl'>Hola,</h1><h1 className='text-2xl'> {user.user_metadata.full_name}</h1>
            </div>
            <img className='rounded-full' referrerPolicy='no-referrer' src={user.user_metadata.picture}/>
            </div> 
        <div className='flex flex-col gap-9'>
            <div className='flex justify-evenly gap-86'>
                <img src={Message}/><img src={Search}/>
            </div>
            <div className='border-b-2 border-[#0F0F17] pb-2'>
                <h1 className='text-5xl ml-2.5'>SPESIALISTS</h1>
            </div>
        </div>
        <div className='flex justify-around items-center'>
            <div className='flex flex-col gap-3'>
                <h1 className='text-3xl'>Makeup</h1>
                <p className='text-[18px]'>Anna Leonchart</p>
                <Link to='/Productos' element={<ProductForm profesional={pro} cliente={user.user_metadata.full_name} />}><button onClick={() => nombrePro('Anna Leonchart')} className='border p-2 w-33'>From $20</button></Link>
            </div>
            <img src={Ana}/>
        </div>
        <div className='flex justify-around items-center'>
            <img src={Mia}/>
            <div className='flex flex-col gap-3'>
                <h1 className='text-3xl'>Skincare</h1>
                <p className='text-[18px]'>Mia Lissa</p>
                <Link to='/Productos' element={<ProductForm profesional={pro} />}><button onClick={() => nombrePro('Mia Lissa')} className='border p-2 w-33'>From $20</button></Link>
            </div>
        </div>
        <div className='flex justify-around items-center mb-10'>
            <div className='flex flex-col gap-3'>
                <h1 className='text-3xl'>Hairsyle</h1>
                <p className='text-[18px]'>Eren Akerman</p>
                <Link to='/Productos' element={<ProductForm profesional={pro} />}><button onClick={() => nombrePro('Eren Akerman')} className='border p-2 w-33'>From $20</button></Link>
            </div>
            <img src={Eren}/>
        </div>
<div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 ">
    <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <img src={Services}/>
        </button>
        <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <img src={Fav}/>
        </button>
        <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <img src={Bell}/>
        </button>
        <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <img src={User}/>
        </button>
    </div>
</div>

    </div>
</>
  )
}
export default Home