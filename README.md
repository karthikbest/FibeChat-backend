'use client';

import React from 'react';
import { Card, Grid, Text, Button } from '@radix-ui/themes';
import { Separator } from '@radix-ui/react-separator';
import './styles.css';

interface ProfileCardType {
  label: string;
  value: string | string[];
  description?: string;
  hasEdit?: boolean;
  moreInfo?: string;
  defaultText?: string;
}

const ProfileCard = ({
  label,
  value,
  description = '',
  hasEdit = false,
  moreInfo,
  defaultText = '',
}: ProfileCardType) => {
  const renderValue = () => {
    if (Array.isArray(value) && value.length > 0) {
      return (
        <ul className="productStrInnerText">
          {value.map((v, i) => (
            <li key={i}>{v}</li>
          ))}
        </ul>
      );
    }

    if (typeof value === 'string' && value.trim() !== '') {
      return <Text as="div" align="left">{value}</Text>;
    }

    return <Text as="div" align="left" className="myProfileInnerText2">{defaultText}</Text>;
  };

  return (
    <Card className="displayProfileFieldCard">
      <Grid columns="1" width="auto" className="displayProfileFieldContainer">
        <Text as="label" align="left" className="displayProfileFieldLabel">{label}</Text>
        <Text>{renderValue()}</Text>
        {moreInfo && (
          <Text className="myProfileInnerText2">{moreInfo}</Text>
        )}
      </Grid>

      {hasEdit && (
        <>
          <Separator.Root className="separatorRootTerms" decorative />
          <Grid>
            <Button className="myProfileEditAlign">Edit</Button>
          </Grid>
        </>
      )}
    </Card>
  );
};

export default ProfileCard;
