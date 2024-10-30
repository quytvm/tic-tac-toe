import React from "react";

const RenderSquare = ({index,handleClick,board}) => {
    return (
        <button className="square" onClick={() => handleClick(index)}>
            {board[index]}
        </button>
    );
};

export default RenderSquare;