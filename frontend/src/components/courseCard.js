import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

function courseCard(code, name, desc) {
  return (
    <Card sx={{ minWidth: 275 }} style={{width: 200}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{code}</Typography>
        <h3>{name}</h3>
        <p>{desc}</p>
      </CardContent>
    </Card>
  )
}

export default courseCard