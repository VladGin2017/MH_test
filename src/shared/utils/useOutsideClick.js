import { useEffect } from "react";

export const useOutsideClick = (ref, handler, opened) => {
    useEffect(() => {
        if(!opened) return;

        const handleClick = (e) =>{
            if(!ref.current || ref.current.contains(e.target)) return;
            handler();
        }

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        }

    }, [ref, handler, opened])

}