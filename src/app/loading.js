import '@/app/(page)/style/loading.css'

export default function Loading() {
    return (
        <div className='loader-section'>
            <div className="loader">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
            </div>
        </div>
    )
}
