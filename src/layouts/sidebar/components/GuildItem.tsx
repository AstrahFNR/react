import { Card, CardBody, Text, Image, Box, Button } from '@chakra-ui/react';
import { Guild, iconUrl } from 'api/discord';
import { useColors } from 'theme';
import { useGuildInfoQuery } from 'stores';

export function GuildItem({
  guild,
  active,
  onSelect,
}: {
  guild: Guild;
  active: boolean;
  onSelect: () => void;
}) {
  const { brand, globalBg } = useColors();
  const query = useGuildInfoQuery(guild.id);

  console.log(guild)
  return (
    <Box
      maxWidth={'100%'}>
      <Card
        bg={'#1F2129'}
        overflow={'hidden'}
        justifyContent={'center'}
        marginTop={'20px'}
        height={'152px'}
        width={'auto'}
        color={active && 'white'}
        onClick={onSelect}
        cursor="pointer"
      >
        <CardBody
          position={'relative'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Box
            bg={`url(${guild.icon ? iconUrl(guild): 'https://archive.org/download/discordprofilepictures/discordgrey.png'}) center center / cover no-repeat`}
            position={'absolute'}
            zIndex={'1'}
            inset={'0px'}
            transform={'scale(1.4)'}
            filter={'blur(5px)'}
            opacity={'0.2'}
          >
          </Box>
          <Image
            position={'relative'}
            zIndex="2"
            border={'2px solid #fff'}
            width={'80px'}
            height={'80px'}
            borderRadius={'40px'}
            src={`${guild.icon ? iconUrl(guild): 'https://archive.org/download/discordprofilepictures/discordgrey.png'}`}
          ></Image>
        </CardBody>
      </Card>
      <Box
        marginTop={'20px'}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'flex-start'}
      >
        <Text
          fontWeight={'600'}
          fontSize={'16px'}
          lineHeight={'24px'}
          letterSpacing={'0.1px'}>
          {guild.name}
          <Text
            color={'#9195AB'}
            fontSize={'12px'}
            fontWeight={'500'}>
            {guild.owner ? 'Owner': 'Adminstrator'}
          </Text>
        </Text>
        {query.data != null ?
          <Button
            borderRadius={'0.375rem'}
            onClick={onSelect}
            bg={brand}
            color={'#fff'}
            _hover={{
              background: '#7e61f0',
            }}
          >
            Manage
          </Button>
          :
          <Button
            borderRadius={'0.375rem'}
            onClick={onSelect}
          >
            Setup
          </Button>}
      </Box>
    </Box>
  );
}
