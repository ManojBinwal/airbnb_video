// In summary, the CountrySelect component wraps the Select component from the react-select library. It takes a value and an onChange function as props, which are used to manage the selected value and respond to value changes. The getAll function from the useCountries hook is used to populate the list of available options. The formatOptionLabel prop is used to customize the appearance of each option in the dropdown list, showing the country flag, label, and region. Custom styling is applied using classNames and a modified theme for the react-select component.

'use client';

// Importing necessary dependencies
import Select from 'react-select'
import useCountries from '@/app/hooks/useCountries';

// Defining the type for the value that the select input will handle
export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
}

// Defining the props that the CountrySelect component accepts
interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

// The actual CountrySelect component
const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange
}) => {
  // Using the useCountries hook to get the list of countries
  const { getAll } = useCountries();

  return ( 
    <div>
      {/* Using the Select component from react-select */}
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}  // Providing the list of country options
        value={value}       // The currently selected value
        onChange={(value) => onChange(value as CountrySelectValue)}  // Handling value changes
        formatOptionLabel={(option: any) => (
          // Custom formatting of the option label
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>
              {option.label},
              <span className="text-neutral-500 ml-1">
                {option.region}
              </span>
            </div>
          </div>
        )}
        // Customizing styles using classNames and theme
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg'
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6'
          }
        })}
      />
    </div>
   );
}
 
export default CountrySelect;
