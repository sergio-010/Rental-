import { getAllCars } from '@/actions'
import Navbar from '@/components/shared/NavBar/Navbar'
import React from 'react'
import HeaderCars from './components/HeaderCars/HeaderCars'
import FiltersAndListCars from './components/FilterAndListCars/FiltersAndListCars'

export default async function CarsPage() {
    const { data, error } = await getAllCars({ isPublish: true })

    if (data === null || error) {
        return <div>{error}</div>
    }

    return (
        <div>
            <Navbar />
            <div className='p-6 mx-auto max-w-7xl'>
                <HeaderCars />
                <div>
                    <FiltersAndListCars cars={data} />
                </div>



            </div>
        </div>
    )
}
