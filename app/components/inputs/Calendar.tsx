//In summary, the DatePicker component integrates the react-date-range library to display a date picker for selecting date ranges. The component accepts a value representing the currently selected date range, an onChange callback to handle changes to the date range, and an optional disabledDates array to specify dates that should be disabled in the picker. The component is customized to have a vertical layout, a specific color for the selected range, and other properties for better usability. This component provides a user-friendly way to select date ranges in a web application.

'use client';

// Importing necessary dependencies
import { DateRange, Range, RangeKeyDict } from 'react-date-range';

// Importing styles for the date picker
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

// Defining the props that the DatePicker component accepts
interface DatePickerProps {
  value: Range;  // The selected date range
  onChange: (value: RangeKeyDict) => void;  // Callback for handling date range changes
  disabledDates?: Date[];  // Dates to be disabled in the picker
}

// The actual DatePicker component
const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  disabledDates
}) => {
  return ( 
    <DateRange
      rangeColors={['#262626']}  // Custom color for the selected date range
      ranges={[value]}  // Passing the selected range to the component
      date={new Date()}  // The current date for initial display
      onChange={onChange}  // Handling changes to the selected date range
      direction="vertical"  // Displaying the date picker vertically
      showDateDisplay={false}  // Hiding the date display section
      minDate={new Date()}  // Setting the minimum selectable date
      disabledDates={disabledDates}  // Providing disabled dates, if any
    />
   );
}
 
export default DatePicker;
