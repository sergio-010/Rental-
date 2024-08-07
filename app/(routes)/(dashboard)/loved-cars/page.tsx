import { auth } from '@clerk/nextjs/server';
import ListCars from '../dashboard/admin/cars-manager/components/ListCars/ListCars';
import ListLovedCars from './components/ListLovedCars/ListLovedCars';
import { redirect } from 'next/navigation';

export default function LovedCars() {
    const { userId } = auth()

    if (!userId) {
        return redirect("/")
    }
    return (
        <div>
            <h1 className='text-2xl '>Loved Cars</h1>
            <ListLovedCars />
        </div>
    )
}
