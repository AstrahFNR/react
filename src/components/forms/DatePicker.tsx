import { Calendar, CalendarProps } from 'react-calendar';
import { FormComponentProps, FormControlCard } from './FormCard';
import 'react-calendar/dist/Calendar.css';
import './DatePicker.css';
import Icon from '@chakra-ui/icon';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Text } from '@chakra-ui/layout';
import {
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';

export type DatePickerProps = CalendarProps;

export function DatePicker(props: DatePickerProps) {
  return (
    <Calendar
      view={'month'}
      tileContent={<Text color="brand.500" />}
      prevLabel={<Icon as={MdChevronLeft} w="24px" h="24px" mt="4px" />}
      nextLabel={<Icon as={MdChevronRight} w="24px" h="24px" mt="4px" />}
      {...props}
    />
  );
}

export function DatePickerForm({
  picker,
  value,
  onChange,
  ...props
}: FormComponentProps<{
  value?: CalendarProps['value'];
  onChange?: CalendarProps['onChange'];
  picker?: DatePickerProps;
}>) {
  return (
    <FormControlCard {...props}>
      <DatePicker value={value} onChange={onChange} {...picker} />
    </FormControlCard>
  );
}

export function SmallDatePickerForm({
  picker,
  value,
  onChange,
  ...props
}: FormComponentProps<{
  value?: CalendarProps['value'];
  onChange?: CalendarProps['onChange'];
  picker?: DatePickerProps;
}>) {
  return (
    <FormControlCard {...props}>
      <Popover>
        <PopoverTrigger>
          <InputGroup>
            <Input
              value={(value ?? picker.value).toLocaleString(undefined, {
                dateStyle: 'short',
              })}
              variant="main"
              readOnly
            />
            <InputRightElement>
              <CalendarIcon />
            </InputRightElement>
          </InputGroup>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverBody>
            <DatePicker value={value} onChange={onChange} {...picker} />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </FormControlCard>
  );
}