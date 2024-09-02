import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useSearchParamsState = <T>(
    param: string,
    initialValue: T,
    parse: (value: string) => T
): [T, (value: T) => void] => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [state, setState] = useState(() => {
        const value = searchParams.get(param);
        return value ? parse(value) : initialValue;
    });

    useEffect(() => {
        searchParams.set(param, String(state));
        setSearchParams(searchParams);
    }, [state, param, searchParams]);

    return [state, setState];
};
