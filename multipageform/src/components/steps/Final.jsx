
const Final = () => {
    return (
        <div className="flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-lg ">
            {/* Success Message */}
            <div className="bg-green-100 text-green-600 rounded-full w-32 h-32 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.707-7.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-1.5-1.5a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </div>
            
            <h2 className="text-3xl font-bold text-green-600 mb-2">Successfully</h2>
            <p className="text-gray-700 text-center">
                 We have Received Your Form Soon PETACT Team Will Response You On Your e Email Stay Tuned Thanks
            </p>
        </div>
    );
};

export default Final;