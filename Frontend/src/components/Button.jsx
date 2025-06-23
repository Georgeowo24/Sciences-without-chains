import React from "react";

const BotonR = ({ text = 'Boton' , onClick}) =>{
    return (
        <div className="fixed top-4 right-4 z-50">
            <button
            onClick={onClick}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-2xl shadow-lg">
                {text}
            </button>
        </div>
    );
};

export default BotonR;