import React from 'react';

export const TagsSelector: React.FC<{
    value: string[];
    setValue: React.Dispatch<React.SetStateAction<string[]>>;
}> = ({ value, setValue }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tags = e.target.value.split(',').map(tag => tag.trim());
        setValue(tags);
    };

    return (
        <div>
            <label>Tags:</label>
            <input
                type="text"
                value={value.join(',')}
                onChange={handleChange}
                placeholder="Enter tags, separated by commas"
            />
        </div>
    );
};

