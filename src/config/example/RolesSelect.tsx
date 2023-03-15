import { Icon, Image } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useGuildRolesQuery } from 'stores';
import { Params } from 'views/feature/FeatureView';
import { SelectField } from 'components/forms/SelectField';
import { Text } from '@chakra-ui/react';
import { BsPersonFill } from 'react-icons/bs';
import { toRGB } from 'utils/common';
import { Role } from 'api/bot';

export function RolesSelect({
  value,
  onChange,
}: {
  value?: string;
  onChange: (role: string) => void;
}) {
  const { guild } = useParams<Params>();
  const rolesQuery = useGuildRolesQuery(guild);
  const isLoading = rolesQuery.isLoading;

  const selected = value != null ? rolesQuery.data?.find((role) => role.id === value) : null;
  const render = (role: Role) => {
    return {
      value: role.id,
      label: <Text color={role.color ? toRGB(role.color) : '#99aab5'}>{role.name}</Text>,
    };
  };

  return (
    <SelectField
      isDisabled={isLoading}
      isLoading={isLoading}
      placeholder="Select a role"
      value={selected != null && render(selected)}
      onChange={(e) => onChange(e.value)}
      options={rolesQuery.data?.map(render)}
    />
  );
}
