import { SimpleGrid } from '@chakra-ui/layout';
import { Icon, Image } from '@chakra-ui/react';
import { SmallColorPickerForm } from 'components/forms/ColorPicker';
import { FormControlCard } from 'components/forms/FormCard';
import { InputForm } from 'components/forms/InputForm';
import { MusicFeature } from 'config/custom-types';
import { UseFeatureValueResult } from 'config/utils';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGuildRolesQuery } from 'stores';
import { Params } from 'views/feature/FeatureView';
import { SelectField } from 'components/forms/SelectField';
import { BsPeopleFill } from 'react-icons/bs';
import { SmallDatePickerForm } from 'components/forms/DatePicker';
import { FilePickerForm } from 'components/forms/FilePicker';

export function MusicFeaturePanel({
  result: { value, update },
  data,
}: {
  result: UseFeatureValueResult<Partial<MusicFeature>>;
  data: MusicFeature;
}) {
  const { guild } = useParams<Params>();
  const query = useGuildRolesQuery(guild);
  const [count, setCount] = useState('0');
  const [color, setColor] = useState<string>();
  const [date, setDate] = useState(() => new Date(Date.now()));
  const [file, setFile] = useState<File[]>(null);

  const combined = { ...data, ...value };

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap={3}>
      <InputForm
        label="Message"
        description="Hello world!!!"
        value={combined.message}
        onChange={(v) => update({ message: v })}
        placeholder="Your message here..."
        required
      />
      <InputForm
        label="Count"
        placeholder="Put a number"
        value={count}
        onChange={(v) => setCount(v)}
        input={{
          type: 'number',
        }}
      />
      <SmallColorPickerForm label="Role Color" value={color} onChange={(v) => setColor(v)} />
      <FormControlCard label="Roles" description="Select a role">
        <SelectField
          placeholder="Select a role"
          options={query.data?.map((role) => ({
            label: role.name,
            value: role.id,
            icon:
              role.icon?.iconUrl != null ? (
                <Image src={role.icon?.iconUrl} bg={toRGB(role.color)} w="25px" h="25px" />
              ) : (
                <Icon as={BsPeopleFill} color={toRGB(role.color)} w="20px" h="20px" />
              ),
          }))}
        />
      </FormControlCard>
      <SmallDatePickerForm label="Date" value={date} onChange={(value: Date) => setDate(value)} />
      <FilePickerForm
        value={file}
        onChange={(v) => setFile(v)}
        label="Your File"
        helperText="Support Gif, Jpg, Png and Svg files"
        accept={{
          'image/png': ['.png'],
          'image/jpg': ['.jpg'],
          'image/svg': ['.svg'],
          'image/gif': ['.gif'],
        }}
        picker={{
          maxFiles: 2,
        }}
      />
      <FilePickerForm
        value={file}
        onChange={(v) => setFile(v)}
        label="Your File"
        picker={{
          multiple: false,
        }}
      />
    </SimpleGrid>
  );
}

function toRGB(num: number) {
  num >>>= 0;
  let b = num & 0xff,
    g = (num & 0xff00) >>> 8,
    r = (num & 0xff0000) >>> 16;
  return 'rgb(' + [r, g, b].join(',') + ')';
}