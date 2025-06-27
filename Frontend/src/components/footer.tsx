export default function Footer() {
    return (
        <footer className="border-t border-gray-200 py-4 mt-16">
            <div className="container mx-auto text-center">
            <p className="text-sm"> &copy; {new Date().getFullYear()} Science Without Chains. All rights reserved.</p>

            <p className="text-xs mt-2">Create by:</p>
            <div className="mt-1 flex justify-center space-x-10 text-xs">
                <ul className="text-xs list-none mt-1 text-left">
                    <li>Torres Romero Jorge</li>
                    <li>Chávez Santos José Roberto</li>
                </ul>
                <ul className="text-xs list-none mt-1 text-left">
                    <li>Morales Alvarado Carlos</li>
                    <li>Hernández Bonilla Cristian</li>                
                </ul>
            </div>
            </div>
        </footer>
    )
}