const renderButton = (btnName, onClick) => {
    return (
        <>
        <button 
            onClick={onClick}
            name={btnName} 
            value={btnName} 
            type={`button`}
        >{btnName}</button>
        </>
    );
}

export { renderButton }