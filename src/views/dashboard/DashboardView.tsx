import { Box, Center, Heading, Link, Text, VStack } from '@chakra-ui/layout';
import { Button, Card, CardFooter, CardHeader, Icon } from '@chakra-ui/react';
import { config } from 'config/common';
import { useGuildInfoQuery } from 'stores';
import { dashboard } from 'config/translations/dashboard';
import { FaRobot } from 'react-icons/fa';
import { IoOpen } from 'react-icons/io5';
import { useSelfUser } from 'stores';
import { useColors } from 'theme';
import { useMemo, useState } from 'react';
import { ExampleDashboardView } from './example';
import { GuildItem } from '../../layouts/sidebar/components/GuildItem';
import { useGuilds, useSelectedGuild, useSelfUserQuery } from 'stores';
import { LoadingPanel } from 'components/panel/LoadingPanel';
import { QueryStatus } from 'components/panel/QueryPanel'


export function DashboardView() {
  const { selected: selectedGroup, setSelected: onSelect } = useSelectedGuild();
  const [filter, setFilter] = useState('');
  const guilds = useGuilds();

  const filteredGuilds = useMemo(
    () =>
      guilds.data?.filter((guild) => {
        const contains = guild.name.toLowerCase().includes(filter.toLowerCase());

        return config.guild.filter(guild) && contains;
      }),
    [guilds.data, filter]
  );

  const t = dashboard.useTranslations();
  const { brand } = useColors();
  const user = useSelfUser();
  return (
    <Heading size={{ base: 'md', '3sm': 'lg' }}>
      {t.welcome}
      <Text as="span" color={brand}>
        {user.username}
      </Text>
      <Box
           display={'grid'}
           gridTemplateColumns={'1fr 1fr 1fr'}
           gap={'40px'}
           width={'100%'}
      >
      {filteredGuilds?.map((guild) => (
            <GuildItem
            key={guild.id}
            guild={guild}
            active={selectedGroup === guild.id}
            onSelect={() => onSelect(guild.id)}
          />
          ))}
      </Box>
    </Heading>
  );
}
