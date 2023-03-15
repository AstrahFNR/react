// chakra imports
import {
  Avatar,
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  IconButton,
  Spacer,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
//   Custom components
import { getActiveSidebarItem, SidebarItemInfo } from 'utils/routeUtils';
import { useGuilds, useSelectedGuild, useSelfUserQuery } from 'stores';
import { SearchBar } from 'components/forms/SearchBar';
import { useMemo, useState } from 'react';
import { config } from 'config/common';
import { FiSettings as SettingsIcon } from 'react-icons/fi';
import { avatarUrl } from 'api/discord';
import { useLocation, useNavigate } from 'react-router-dom';
import { GuildItem } from './GuildItem';
import { SidebarItem } from './SidebarItem';

export function SidebarContent({ items }: { items: SidebarItemInfo[] }) {
  const { selected: selectedGroup, setSelected: onSelect } = useSelectedGuild();

  // SIDEBAR
  return (
    <>
      <Flex alignItems="center" flexDirection="column" bg="brand.400">
        <VStack align="center" my="32px" color="white">
          <Heading>{config.name}</Heading>
        </VStack>
      </Flex>
      <Stack direction="column" mt="18px" mb="auto">
        <Flex direction="column" px="10px" gap={1}>
          <Items items={items} />
        </Flex>
        <Box px="10px">
        </Box>
      </Stack>
    </>
  );
}

export function BottomCard() {
  const navigate = useNavigate();
  const user = useSelfUserQuery().data;
  if (user == null) return <></>;

  return (
    <Card zIndex='2' pos="sticky" left={0} bottom={0} w="full" py={2}>
      <CardBody as={HStack}>
        <Avatar src={avatarUrl(user)} name={user.username} size="sm" />
        <Text fontWeight="600">{user.username}</Text>
        <Spacer />
        <IconButton
          icon={<SettingsIcon />}
          aria-label="settings"
          onClick={() => navigate('/user/profile')}
        />
      </CardBody>
    </Card>
  );
}

function Items({ items }: { items: SidebarItemInfo[] }) {
  const location = useLocation();
  const active = getActiveSidebarItem(items, location);

  return (
    <>
      {items
        .filter((item) => !item.hidden)
        .map((route: SidebarItemInfo, index: number) => (
          <SidebarItem key={index} item={route} active={active === route} />
        ))}
    </>
  );
}
