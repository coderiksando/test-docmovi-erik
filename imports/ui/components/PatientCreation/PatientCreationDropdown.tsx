import React from 'react';

interface PatientCreationDropdownProps {
    formInput: { label: string, name: string },
    dataList: Array<any>,
    setSelectedOption?: React.Dispatch<React.SetStateAction<string>>,
    onRegister: Function
}

export const PatientCreationDropdown = ({ formInput, dataList, setSelectedOption, onRegister }: PatientCreationDropdownProps) => {

    const { label, name } = formInput;
    const onChangeOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
        (setSelectedOption) ? setSelectedOption(event.target.value) : '';
    }
    return (
        <div className="col-span-6 sm:col-span-3">
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <select
                {...onRegister(name)}
                onChange={(event) => onChangeOption(event)}
                id={name}
                name={name}
                autoComplete="country-name"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
                {
                    dataList.map(
                        item => <option key={item}>{item}</option>
                    )
                }
            </select>
        </div>
    )
}
