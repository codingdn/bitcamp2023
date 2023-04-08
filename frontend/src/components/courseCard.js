import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function courseCard(code, name, desc) {
  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{code}</Typography>
        <h5>{name}</h5>
        <p>{desc}</p>
      </CardContent>
    </Card>
  )
}

export default courseCard