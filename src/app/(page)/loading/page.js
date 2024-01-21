import '@/app/(page)/style/loading.css'

export default function Loading() {
    return (
        <main>
            <div className="loader">
                <div className="loader_cube loader_cube--color"></div>
                <div className="loader_cube loader_cube--glowing"></div>
            </div>
        </main>

    )
}
