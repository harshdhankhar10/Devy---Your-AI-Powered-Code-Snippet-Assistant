import React from 'react'
import { useParams } from 'next/navigation'

const page = async () => {
    const { id } = useParams()
    console.log(id)
    return (
        <div>page</div>
    )
}

export default page